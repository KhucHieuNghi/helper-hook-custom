import { useState } from "react";

export const useStateCallback = (initialState, callback = () => {}) => {
  const [state, set] = useState(initialState);
  const ref = useRef(false);
  const refCallback = useRef(callback);
  const setState = (value, fn) => {
    set(value)
    if (fn && typeof fn === 'function') {
      refCallback.current = fn;
    } else {
      refCallback.current = () => {}
    }
  }
  useEffect(
    () => {
      if (ref.current === false) {
        ref.current = true;
      } else {
        refCallback.current(state);
      }
    },
    [state],
  );
  return [state, setState];
}


const useStateWithCallback = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const setValueAndCallback = (newValue, callback) => {
        setValue(prevValue => {
            if (callback) {
                callback(prevValue, newValue);
            }
            return newValue;
        });
    };

    return [value, setValueAndCallback];
}

export { useStateWithCallback};
