import React, { createContext, useState, ReactNode, useContext } from "react";

interface ToggleContextType {
  toggleState: boolean;
  setToggleState: (state: boolean) => void;
}

const ToggleContext = createContext<ToggleContextType>({
  toggleState: false,
  setToggleState: () => {},
});

export const ToggleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toggleState, setToggleState] = useState<boolean>(false);

  return (
    <ToggleContext.Provider value={{ toggleState, setToggleState }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error("useToggle must be used within a ToggleProvider");
  }
  return context;
};
