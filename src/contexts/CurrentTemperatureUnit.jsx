import { createContext, useState } from "react";
export const CurrentTemperatureUnitContext = createContext();
export const CurrentTemperatureUnitProvider = ({ children }) => {
  const [unit, setUnit] = useState("F");
  return (
    <CurrentTemperatureUnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </CurrentTemperatureUnitContext.Provider>
  );
};