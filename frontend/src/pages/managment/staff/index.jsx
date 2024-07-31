import ButtonComponent from "@/components/button/index.jsx";
import { CustomInput, CustomSelect } from "@/components/form/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { StaffModule } from "@/modules/staff.jsx";
import ServiceStyle from "@/pages/managment/management.module.scss";
import { StatusSelect } from "@/pages/managment/service/index.jsx";
import { Form, Pagination } from "antd";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { AiOutlineSearch } from "react-icons/ai";

const Staff = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data, columns } = StaffModule();
  const [currentPagination, setCurrentPagination] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [form] = Form.useForm();

  const handleChangePagination = (page) => setCurrentPagination(page);
  const handleStatus = (value) => setStatus(value);
  const handleSearch = (e) => setSearch(e.target.value.toLowerCase());
  const onFinish = (values) => setSearch(values.search || "");

  const { Data } = useFilterStatus({ data, search, status });

  return (
    <Fragment>
      <Helmet>
        <title>Service management</title>
      </Helmet>

      <section className={"space-y-5 max-w-full w-full"}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
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

        <div className="py-6 px-5 bg-white rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-5">
            <Form
              form={form}
              onFinish={onFinish}
              className="flex gap-x-5 items-center"
            >
              <Form.Item
                name="search"
                rules={[{ required: true, message: "Please input data" }]}
                className="mb-0 w-full"
              >
                <CustomInput
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search"
                  className="w-full sm:max-w-96 pl-10"
                  colorBorder={colorsObject.primary}
                >
                  <span className="absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2">
                    <AiOutlineSearch />
                  </span>
                </CustomInput>
              </Form.Item>

              <ButtonComponent
                defaultBg={colorsObject.success}
                defaultHoverBg={colorsObject.successHover}
                paddingInline={43}
                borderRadius={5}
                controlHeight={40}
                className="inline-flex items-center"
                href="/admin/modals/staff/add-staff"
              >
                Add new
              </ButtonComponent>

              <Form.Item className="mb-0">
                <CustomSelect
                  placeholder="Status"
                  options={StatusSelect}
                  style={{ width: 122 }}
                  className={`h-[40px] ${ServiceStyle["Service__select"]}`}
                  colorBorder={colorsObject.info}
                  selectorBg={colorsObject.info}
                  onChange={handleStatus}
                />
              </Form.Item>
            </Form>

            <Pagination
              total={10}
              pageSize={1}
              current={currentPagination}
              onChange={handleChangePagination}
            />
          </div>

          <TableComponent columns={columns} data={Data} />
        </div>
      </section>
    </Fragment>
  );
};

export default Staff;
