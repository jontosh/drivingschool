import { BookMyLessons } from "@/pages/scheduling/items/book-my-lessons.jsx";
import { MySchedule } from "@/pages/scheduling/items/my-schedule.jsx";

const TabItem = () => {
  return [
    {
      key: "1",
      label: <span>My Schedule</span>,
      children: <MySchedule />,
    },
    {
      key: "2",
      label: <span>Book my lessons</span>,
      children: <BookMyLessons />,
    },
  ].map((item) => {
    return { ...item };
  });
};

export default TabItem;
