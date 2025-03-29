// src/context/CopyContext.tsx
import { createContext, useContext, useState } from 'react';

const CopyContext = createContext<{
  copiedCommandId: string | null;
  setCopiedCommandId: (id: string | null) => void;
}>({
  copiedCommandId: null,
  setCopiedCommandId: () => {},
});

export const useCopyContext = () => useContext(CopyContext);

export const CopyProvider = ({ children }: { children: React.ReactNode }) => {
  const [copiedCommandId, setCopiedCommandId] = useState<string | null>(null);
  return (
    <CopyContext.Provider value={{ copiedCommandId, setCopiedCommandId }}>
      {children}
    </CopyContext.Provider>
  );
};