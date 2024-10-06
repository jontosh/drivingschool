import { useState } from "react";
import { format, addDays, subDays, startOfWeek } from "date-fns";
import classNames from "classnames";
import { Button, Tooltip } from "antd";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export const WeeklyCalendar = () => {
  const [currentDay, setCurrentDay] = useState(new Date());

  const startOfTheWeek = startOfWeek(currentDay, { weekStartsOn: 1 });
  // const endOfTheWeek = endOfWeek(currentDay, { weekStartsOn: 1 });

  const handleNextDay = () => {
    setCurrentDay(addDays(currentDay, 1));
  };

  const handlePrevDay = () => {
    setCurrentDay(subDays(currentDay, 1));
  };

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const day = addDays(startOfTheWeek, i);
    daysOfWeek.push(day);
  }

  const weekItem = daysOfWeek.map((day) => (
    <div
      key={day}
      className={classNames(
        "text-center rounded-lg cursor-pointer hover:text-[#5F66E9]",
        format(day, "yyyy-MM-dd") === format(currentDay, "yyyy-MM-dd") &&
        "text-[#5F66E9]",
      )}
    >
      <p className="text-lg">{format(day, "eeee")}</p>
      <p className="text-base">{format(day, "dd")}</p>
    </div>
  ));

  return (
    <div className={"space-y-5"}>
      <div className="flex items-center justify-between">
        <h3>{format(currentDay, "MMMM yyyy")}</h3>
        <div className="flex items-center gap-5">
          <Tooltip title="Next">
            <Button
              onClick={handlePrevDay}
              shape="circle"
              icon={<AiOutlineArrowLeft />}
            />
          </Tooltip>

          <Tooltip title="Next">
            <Button
              onClick={handleNextDay}
              shape="circle"
              icon={<AiOutlineArrowRight />}
            />
          </Tooltip>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-5">{weekItem}</div>
    </div>
  );
};
