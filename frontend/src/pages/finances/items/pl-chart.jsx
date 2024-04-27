import { Paragraph } from "@/components/title/index.jsx";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const PlChart = () => {
  return (
    <div className={"space-y-5 text-center"}>
      <CircularProgressbar text={"$4,545"} />
      <Paragraph fontSize={"text-base"}>Profit</Paragraph>
    </div>
  );
};
