import { useState, createContext, useContext } from 'react';
import { PartsCookie } from '../types/parts';
import { setCookies } from 'cookies-next';
export type PartsContextType = {
  parts: PartsCookie;
  setParts: (parts: PartsCookie) => void;
};

const Context = createContext<PartsContextType | null>(null);

export function PartsProvider({ children, initialParts }: { children: React.ReactNode; initialParts: PartsCookie }) {
  const [parts, setPartsState] = useState(initialParts);
  const setParts = (parts: PartsCookie) => {
    setPartsState(parts);
    setCookies('parts', parts, { maxAge: 60 * 60 * 24 * 30 });
  };
  return <Context.Provider value={{ parts, setParts }}>{children}</Context.Provider>;
}

export function usePartsContext() {
  return useContext(Context);
}
