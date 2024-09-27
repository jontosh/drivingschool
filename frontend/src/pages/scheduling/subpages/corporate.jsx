import ButtonComponent from "@/components/button/index.jsx";
import {
  CustomInput,
} from "@/components/form/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { CorporateTimeOff } from "@/modules/corporate-time-off.jsx";
import { Form, Pagination, Table } from "antd";
import { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import CorporateStyle from "../scheduling.module.scss";

export const Corporate = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const { data, columns } = CorporateTimeOff();
  const [form] = Form.useForm();

  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  return (
    <div className={"bg-white p-5 rounded-2xl"}>
      <Title
        level={3}
        fontSize={"text-xl"}
        fontWeightStrong={500}
        titleMarginBottom={33}
      >
        Corporate time off
      </Title>

      <div className={"flex justify-between items-center"}>
        <Form form={form} className={"flex items-center gap-5"}>
          <Form.Item className={"relative shadow-xl mb-0"}>
            <CustomInput
              colorBorder={colorsObject.primary}
              placeholder={"Find student"}
              className={`w-96 pl-12 pr-4 py-2.5 text-sm inline-flex flex-row-reverse`}
              classNames={"h-[50px]"}
            />
            <span
              className={"absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "}
            >
              <AiOutlineSearch />
            </span>
          </Form.Item>

          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            borderRadius={5}
            paddingInline={43}
            paddingBlock={5.8}
            href={"/admin/modals/scheduling/corporate-time-off"}
          >
            Add new
          </ButtonComponent>
        </Form>

        <Pagination
          total={10}
          pageSize={1}
          current={CurrentPagination}
          onChange={handleChangePagination}
        />
      </div>

      <div className={"pt-5"}>
        <TableComponent data={data} columns={columns} />
      </div>
    </div>
  );
};
