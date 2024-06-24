import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { StaffModule } from "@/modules/staff.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import ServiceStyle from "@/pages/managment/management.module.scss";
import { StatusSelect } from "@/pages/managment/service/index.jsx";
import { Pagination } from "antd";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { AiOutlineSearch } from "react-icons/ai";

const Staff = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data, columns } = StaffModule();
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const [Status, setStatus] = useState("");
  const [Search, setSearch] = useState("");
  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };
  const handleStatus = (value) => setStatus(value);
  const handleSearch = (e) => setSearch(e.target.value?.toLowerCase());
  const { Data } = useFilterStatus({ data, search: Search, status: Status });

  return (
    <Fragment>
      <Helmet>
        <title>Service management</title>
      </Helmet>

      <Fragment>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          Account management
        </Title>

        <Title
          level={3}
          fontSize={"text-black text-3xl"}
          fontWeightStrong={600}
          titleMarginBottom={10}
        >
          Staff
        </Title>

        <div className={"py-6 px-5 bg-white rounded-2xl shadow-lg"}>
          <div className={"flex justify-between items-center mb-5"}>
            <form className={"flex gap-x-5 items-center"}>
              <label
                className={`relative h-[50px] rounded ${ManagementStyle["CheckModal__form-element__shadow"]}`}
              >
                <CustomInput
                  colorBorder={colorsObject.primary}
                  placeholder={"Search"}
                  classNames={"h-[50px]"}
                  className={`w-96 pl-12 pr-4 text-sm`}
                  value={Search}
                  onChange={handleSearch}
                />

                <span
                  className={"absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2"}
                >
                  <AiOutlineSearch />
                </span>
              </label>

              <ButtonComponent
                defaultBg={colorsObject.success}
                defaultHoverBg={colorsObject.successHover}
                paddingInline={26}
                borderRadius={5}
                className={"inline-flex items-center"}
                href={"/admin/modals/staff/add-staff"}
              >
                Add new
              </ButtonComponent>

              <CustomSelect
                placeholder={"Status"}
                options={StatusSelect}
                style={{
                  width: 122,
                }}
                className={`h-[40px] ${ServiceStyle["Service__select"]}`}
                colorBorder={"#1890FF"}
                selectorBg={"#1890FF"}
                onChange={handleStatus}
              />
            </form>

            <Pagination
              total={10}
              pageSize={1}
              current={CurrentPagination}
              onChange={handleChangePagination}
            />
          </div>

          <TableComponent columns={columns} data={Data} />
        </div>
      </Fragment>
    </Fragment>
  );
};

export default Staff;
