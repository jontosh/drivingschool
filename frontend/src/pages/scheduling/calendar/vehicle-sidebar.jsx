import { Calendar } from "@natscale/react-calendar";
import { useCallback, useState } from "react";
import "@natscale/react-calendar/dist/main.css";

export const VehicleSidebar = ({ ...props }) => {
  const [value, setValue] = useState(new Date());

  const onChange = useCallback(
    (val) => {
      setValue(val);
    },
    [setValue],
  );

  return <Calendar value={value} onChange={onChange} size={370} />;
};
