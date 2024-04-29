import ButtonComponent from "@/components/button/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Pagination, Table } from "antd";
import { useContext, useState } from "react";

export const StudentLog = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [CurrentPagination, setCurrentPagination] = useState(1);

  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };
  const columns = [
    {
      title: "Date/Time",
      dataIndex: "date",
      key: "date",
      render: (date) => <Paragraph fontSize={"text-base"}>{date}</Paragraph>,
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      align: "center",
      render: (activity) => (
        <Paragraph className={"text-center"} fontSize={"text-base"}>
          {activity}
        </Paragraph>
      ),
    },
    {
      title: "Browser",
      dataIndex: "browser",
      key: "browser",
      align: "center",
      render: (browser) => (
        <Paragraph className={"text-center"} fontSize={"text-base"}>
          {browser}
        </Paragraph>
      ),
    },
    {
      title: "From IP",
      dataIndex: "IP",
      key: "IP",
      align: "center",
      render: (IP) => (
        <Paragraph className={"text-center"} fontSize={"text-base"}>
          {IP}
        </Paragraph>
      ),
    },
  ];

  const data = [
    {
      date: "Mar 14, 2024 @ 1:29 pm EST",
      activity: "Student LogOut",
      browser: "Chrome",
      IP: "109.207.249.165:38314",
    },
    {
      date: "Mar 14, 2024 @ 1:29 pm EST",
      activity: "Student LogOut",
      browser: "Chrome",
      IP: "109.207.249.165:38314",
    },
  ];
  return (
    <div>
      <Title
        titleMarginBottom={26}
        level={2}
        fontWeightStrong={500}
        fontSize={"text-indigo-700 text-2xl"}
      >
        Account Activities
      </Title>

      <div className="flex justify-between border-b border-b-gray-400 pb-4 -mx-5 px-5">
        <Title
          level={4}
          fontSize={"text-base text-indigo-700 "}
          fontWeightStrong={500}
        >
          Student center activity
        </Title>

        <Pagination
          total={10}
          pageSize={1}
          current={CurrentPagination}
          onChange={handleChangePagination}
        />
      </div>
      <div className={"-mx-5 pt-5"}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};
