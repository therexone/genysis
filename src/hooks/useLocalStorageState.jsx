import { useState } from "react";

const useLocalStorageState = (key, defaultValue = "") => {
  const [state, internalSetState] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) return JSON.parse(value);
    } catch (e) {
      console.error(e);
    }

    return defaultValue;
  });

  const setLocalStorageState = (value) => {
    internalSetState(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [state, setLocalStorageState];
};

export default useLocalStorageState;
