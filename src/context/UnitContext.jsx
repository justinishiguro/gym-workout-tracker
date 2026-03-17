import { createContext, useContext, useState } from 'react';

const UNIT_KEY = 'weightUnit';

const UnitContext = createContext(null);

export function UnitProvider({ children }) {
  const [unit, setUnit] = useState(() => localStorage.getItem(UNIT_KEY) || 'kg');

  function toggleUnit() {
    const next = unit === 'kg' ? 'lbs' : 'kg';
    localStorage.setItem(UNIT_KEY, next);
    setUnit(next);
  }

  return (
    <UnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnit() {
  return useContext(UnitContext);
}

// Always store in kg. These helpers convert for display/input.
export function toKg(value, unit) {
  const n = Number(value);
  if (!n) return 0;
  return unit === 'lbs' ? n * 0.453592 : n;
}

export function fromKg(kg, unit) {
  const n = Number(kg);
  if (!n) return 0;
  const val = unit === 'lbs' ? n * 2.20462 : n;
  // Round to 1 decimal, drop trailing zero
  return Math.round(val * 10) / 10;
}
