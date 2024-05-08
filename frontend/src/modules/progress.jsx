import ColorsContext from "@/context/colors.jsx";
import { useContext } from "react";

export const CheckProgress = (status = "") => {
  const { colorsObject } = useContext(ColorsContext);
  switch (status.toLowerCase()) {
    case "active":
      return { bg: colorsObject.success, hover: colorsObject.successHover };
    case "process":
      return { bg: colorsObject.orange, hover: colorsObject.orange };
    case "close":
      return { bg: colorsObject.danger, hover: colorsObject.dangerHover };
    default:
      return { bg: colorsObject.bg, hover: colorsObject.bg };
  }
};
