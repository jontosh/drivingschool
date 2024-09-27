import { createContext } from "react";

const ColorsContext = createContext();

export const ColorsProvider = ({ children }) => {
  const colors = {
    main: "#fff",
    black: "#000",
    bg: "#F1F5F9",
    primary: "#5F66E9",
    primaryHover: "#5F66E9CC",
    secondary: "rgba(0,0,0, 0.25)",
    danger: "#FF333F",
    info: "#1890FF",
    orange: "#FF8933",
    infoHover: "#4BA9FF",
    infoDisabled: "#CFE8FF",
    dangerHover: "#FF7179",
    dangerDisabled: "#FFB7BB",
    success: "#24C18F",
    successHover: "#3CE3AE",
    successDisabled: "#72FFD2",
    secondaryHover: "#5F5F5F40",
    secondaryDisabled: "#E4E4E4",
  };

  return (
    <ColorsContext.Provider value={{ colorsObject: colors }}>
      {children}
    </ColorsContext.Provider>
  );
};

export default ColorsContext;
