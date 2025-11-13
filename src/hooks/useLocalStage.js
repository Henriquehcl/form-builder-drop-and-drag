//src/hooks/useLocalStage.js

import { useState, useEffect } from 'react';

/**
 * Hook personalizado para persistir dados no localStorage
 */
export const useLocalStorage = (key, initialValue) => {
  // Estado para armazenar nosso valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Buscar do localStorage
      const item = window.localStorage.getItem(key);
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Retornar uma versão wrapped do setter do useState que persiste o novo valor
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};