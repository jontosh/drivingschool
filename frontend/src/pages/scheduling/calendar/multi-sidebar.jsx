import { Calendar } from "@natscale/react-calendar";
import { useCallback, useEffect, useState } from "react";
import "@natscale/react-calendar/dist/main.css";

export const MultiSidebar = ({ getDate, defaultDate }) => {
  const [value, setValue] = useState(defaultDate);

  useEffect(() => {
    setValue(defaultDate);
  }, [defaultDate]);

  const onChange = useCallback(
    (val) => {
      setValue(val);
      getDate(val);
    },
    [setValue],
  );

  return <Calendar value={value} onChange={onChange} size={370} />;
};
