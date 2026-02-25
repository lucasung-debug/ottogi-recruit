import { useState, useCallback } from "react";

const STORAGE_VERSION = 1;

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return initialValue;
      const parsed = JSON.parse(item);
      if (parsed.version !== STORAGE_VERSION) return initialValue;
      return parsed.data;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      const valueToStore = typeof value === "function" ? value(storedValue) : value;
      setStoredValue(valueToStore);
      try {
        localStorage.setItem(
          key,
          JSON.stringify({
            version: STORAGE_VERSION,
            updatedAt: new Date().toISOString(),
            data: valueToStore,
          })
        );
      } catch {
        // localStorage full or unavailable
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}
