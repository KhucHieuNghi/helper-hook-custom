import { useStepper } from './use-stepper';
import type { ReactNode } from 'react';
export type { Step, UseStepperActions, UseStepperReturn, UseStepperPayload };

interface EmailStepProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

 
/** Interface that describes a single step. */
interface Step {
  /** Unique step key. */
  key: string;
  /** Render function - takes any number of arguments. */
  Component: (...args: any[]) => ReactNode;
}

/** Definition of the arguments that the hook will take. */
type UseStepperPayload<S extends Step, R extends readonly Step[]> = [
    S['key'], // It will be literal (not string) but exact value - '1', '2', ...etc.
    R // Type of passed steps array.
  ];

  interface UseStepperActions<S extends Step> {
    /**
     * A function that checks whether the step key is equal
     * to the specified key - if so, it assigns the appropriate
     * type (type-guard).
     */
    is: <S extends Step, K extends S['key']>(
      step: S,
      key: K
    ) => step is Extract<
      S,
      {
        key: K;
      }
    >;
    /** Goes to first step. */
    first: () => void;
    /** Goes to last step. */
    last: () => void;
    /** Sets previous step. */
    previous: () => void;
    /** Sets next step. */
    next: () => void;
    /** Sets the step by a specific key. */
    set: <K extends S['key']>(key: K) => void;
  }

  /** This must be returned by the hook. */
type UseStepperReturn<S extends Step> = [S, UseStepperActions<S>];
 
const EmailStep = ({ onChange }: EmailStepProps) => (
  <div>
    Type your email: <input onChange={onChange} />
  </div>
);
 
// Every step must have different key.
const steps = [
  { key: 'email', Component: EmailStep },
  {
    key: 'confirm',
    Component: ({ onClick }: { onClick: () => void }) => (
      <div>
        <button onClick={onClick}>Confirm</button>
      </div>
    ),
  },
  {
    key: 'error',
    Component: ({ onClick }: { onClick: () => void }) => (
      <button onClick={onClick}>Retry</button>
    ),
  },
  { key: 'exception', Component: () => null },
] as const;
 
// This will give us type-safety.
type Steps = typeof steps;
type Union = Steps[number];
 
const RegisterForm = () => {
  const [Step, { is, next, previous, set }] = useStepper<Union, Steps>(
    'email',
    steps
  );
 
  // Checks the equality of keys and renders the component.
  if (is(Step, 'email')) return <Step.Component onChange={previous} />;
 
  if (is(Step, 'error'))
    return <Step.Component onClick={() => set('confirm')} />;
 
  if (is(Step, 'confirm')) return <Step.Component onClick={next} />;
 
  if (is(Step, 'exception')) return <Step.Component />;
 
  // If this code will execute it means - we did something wrong - it
  // shouldn't happen!
  throw Error(
    'You did something wrong - there may be additional unsupported step!'
  );
};

// TDD
import { renderHook } from '@testing-library/react';
import { useStepper } from './use-stepper';
import { act } from '@testing-library/react-hooks';
 
describe('Step can be changed when', () => {
  // This is how we will define the list of steps.
  const steps = [
    { key: '1', label: 'My label', Component: (props: { id: string }) => null },
    { key: '2', Component: (props: { number: string }) => <div>Text</div> },
    { key: '3', Component: () => null },
  ] as const; // This creates a readonly tuple.
  
  type Steps = typeof steps; // Alias type of steps.
  type UnionOfSteps = Steps[number]; // Union of objects from steps tuple.
})

describe('Step can be changed when', () => {
    // 🆙 Code from previous snippet. 🆙
    
    // 🟥 Currently it fails - useStepper is not implemented yet.
    it('starts with given step', () => {
      const { result } = renderHook(() =>
        useStepper<UnionOfSteps, Steps>('1', steps)
      );
   
      expect(result.current[0]).toEqual(steps[0]);
    });
    
    // 🟥 Currently it fails - useStepper is not implemented yet.
    it('allows to set specific step', () => {
      const { result } = renderHook(() =>
        useStepper<UnionOfSteps, Steps>('1', steps)
      );
   
      act(() => {
        result.current[1].set('2');
      });
   
      expect(result.current[0]).toEqual(steps[1]);
    });
    
     // 🔽 Other tests below - check the file at the end. 🔽
  })

import { useMemo, useState } from 'react';
import type { Step, UseStepperPayload, UseStepperReturn } from './defs';
 
const cannotFindStepError = 'Cannot find step';
 
const useStepper = <S extends Step, R extends readonly Step[]>(
  ...payload: UseStepperPayload<S, R>
): UseStepperReturn<S> => {
  const [initialKey, steps] = payload;
  const [key, setKey] = useState(initialKey);
  
  // Thanks to K extends S['key'] - only keys from steps
  // array can be used.
  const set = <K extends S['key']>(key: K): void => {
    setKey(key);
  };
  
  // We want to trigger find function only when 
  // steps or key will change.
  const step = useMemo(() => {
    const foundStep = steps.find((s) => s.key === key);
    
    if (!foundStep) {
      // This is situation when someone bypassed TypeScript
      // type-checking with any or other...
      throw new Error(cannotFindStepError);
    }
   
    // Here we make an assertion to tell -
    // "the found step have a type S".
    return foundStep as S;
  }, [key, steps]);
 
  return [step, { set }];

  const is = <S extends Step, K extends S['key']>(
    step: S, // Type of step - it will be union from array of steps.
    key: K // The exact key value - it will be literal.
  ): step is Extract<S, { key: K }> => step.key === key;
})

// You can use '==' instead of '==='.
if(step.key === '1') return ...

// A little bit shorter and more concise.
if(is(step, '1')) return ...