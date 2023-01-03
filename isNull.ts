// isNullish
// Pseudo code (assuming optional chaining does not exist 😉)
const test = (obj: MyObject | undefined | null) => {
    if (obj === undefined || obj === null) {
        return;
    }

    obj.fn();
}

export const isNullish = <T>(argument: T | undefined | null): argument is undefined | null =>
   argument === null || argument === undefined;
  
  const test = (obj: MyObject | undefined | null) => {
    // 1. Avoid code duplication
    if (isNullish(obj)) {
        return;
    }

    // 2. TypeScript checks it is defined
    obj.fn();
}
  
// nonNullish

 export const nonNullish = <T>(argument: T | undefined | null): argument is NonNullable<T> =>
   !isNullish(argument);
  
 const test = (obj: MyObject | undefined | null) => {
    //1. Avoid code duplication
    if (nonNullish(obj)) {
        // 2. TypeScript checks it is defined
        obj.fn();
    }
}
  
// assertNonNullish
  
  export class NullishError extends Error {}

export const assertNonNullish: <T>(
   value: T,
   message?: string
) => asserts value is NonNullable<T> = <T>(value: T, message?: string): void => {
   if (isNullish(value)) {
      throw new NullishError(message);
   }
};
  
const test = (obj: MyObject | undefined | null) => {
  // 1. Avoid code duplication
  // 2. TypeScript understands it might throw an error
  assertNonNullish(obj);

  // 3. TypeScript checks it is defined
  obj.fn();
}
