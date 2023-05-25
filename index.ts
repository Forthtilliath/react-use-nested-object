import { useState } from "react";

export function useNestedObject<T extends Record<string, unknown>>(obj: T) {
  const [state, _setState] = useState(obj);

  const setState = <T extends unknown>(key: string, value: T) => {
    const getNewValue = (
      keys: string[],
      value: T,
      lastKey = ""
    ): typeof obj => {
      const [key, ...leftKeys] = keys;
      const currentState = lastKey === "" ? state : (state[lastKey] as any);

      const newState = {
        ...currentState,
        [key]: leftKeys.length ? getNewValue(leftKeys, value, key) : value,
      };

      return newState;
    };

    _setState(getNewValue(key.split("."), value));
  };

  return [state, setState] as const;
}
