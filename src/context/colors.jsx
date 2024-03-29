import { createContext } from "react";

const ColorsContext = createContext();

export const ColorsProvider = ({ children }) => {
  const colorsObject = {
    main: "#fff",
    black: "#000",
    bg: "#F1F5F9",
    primary: "#5F66E9",
    secondary: "rgba(0,0,0, 0.45)",
    danger: "#FF333F",
    info: "#1890FF",
    orange: "#FF8933",
  };
  const ColorsValues = { colorsObject };
  return (
    <ColorsContext.Provider value={ColorsValues}>
      {children}
    </ColorsContext.Provider>
  );
};

export default ColorsContext;
