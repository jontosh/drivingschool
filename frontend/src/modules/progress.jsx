import ColorsContext from "@/context/colors.jsx";
import { useContext } from "react";

export const CheckProgress = (status = "") => {
  const { colorsObject } = useContext(ColorsContext);
  switch (status.toLowerCase()) {
    case "active":
      return { bg: colorsObject.success, hover: colorsObject.successHover };
    case "inactive":
      return { bg: "#D5A300", hover: "#F3C11B" };
    case "process":
      return { bg: colorsObject.orange, hover: colorsObject.orange };
    case "close":
      return { bg: colorsObject.danger, hover: colorsObject.dangerHover };
    case "deleted":
      return { bg: colorsObject.danger, hover: colorsObject.dangerHover };
    case "pending":
      return { bg: "#AD6005", hover: "#CB7E23" };
    default:
      return { bg: colorsObject.bg, hover: colorsObject.bg };
  }
};
