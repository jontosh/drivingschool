import TableComponent from "@/components/table/index.jsx";
import Title from "@/components/title/index.jsx";
import { AccountActivitiesModule } from "@/modules/student-account.jsx";
import { Pagination } from "antd";
import { useState } from "react";

export const StudentLog = () => {
  const [CurrentPagination, setCurrentPagination] = useState(1);

  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  const { data, columns } = AccountActivitiesModule();

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

      <div className="flex max-[610px]:flex-col max-[610px]:space-y-3 justify-between border-b border-b-gray-400 pb-4 -mx-5 px-5">
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
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  );
};
