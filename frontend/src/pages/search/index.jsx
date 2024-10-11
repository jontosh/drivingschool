import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { SearchModule } from "@/modules/search.jsx";
import { Alert, DatePicker, Form, Input, Radio, Select } from "antd";
import { Fragment, useCallback, useContext, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { AiOutlineSearch } from "react-icons/ai";
import { SlCloudDownload } from "react-icons/sl";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { ActiveData, useFilterStatus } from "@/hooks/filter.jsx";
import TableComponent from "@/components/table/index.jsx";

const Search = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [Visible, setVisible] = useState(false);
  const [VisibleTable, setVisibleTable] = useState(false);
  const [Results, setResults] = useState([]);
  const [form] = Form.useForm();
  const [Search, setSearch] = useState("");
  const { columns } = SearchModule();

  const { data: Instructors } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { data: Locations } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const { data: Schools } = useRequestGetQuery({
    path: "/account_management/schools/",
  });
  const { data: Classes } = useRequestGetQuery({
    path: "/account_management/class/",
  });
  const { data: Students } = useRequestGetQuery({
    path: "/student_account/student/",
  });

  const instructorsOptions = useMemo(
    () =>
      ActiveData(Instructors)?.map((instructor) => ({
        value: instructor?.id,
        label: `${instructor?.first_name} ${instructor?.last_name}`,
      })),
    [Instructors],
  );
  const locationsOptions = useMemo(
    () =>
      ActiveData(Locations)?.map((location) => ({
        value: location?.id,
        label: location?.name,
      })),
    [Locations],
  );
  const schoolsOptions = useMemo(
    () =>
      ActiveData(Schools)?.map((school) => ({
        value: school?.id,
        label: school?.name,
      })),
    [Schools],
  );
  const classesOptions = useMemo(
    () =>
      ActiveData(Classes)?.map((item) => ({
        value: item?.id,
        label: `${item?.details} | ${item?.note}`,
      })),
    [Classes],
  );

  const onFinish = useCallback(
    async (values) => {
      const results = Students?.filter((student) =>
        Object.values(student).some((value) =>
          value
            ?.toString()
            ?.toLowerCase()
            ?.includes(
              Object.values(values)
                .filter(Boolean)
                .reduce((_, acc) => acc?.toString()?.toLowerCase(), 0),
            ),
        ),
      )?.map((student) => ({
        name: `${student?.first_name} ${student?.last_name}`,
        city: student?.city,
        information_type: student?.information_type,
        status: student?.status,
        dl_permit: student?.dl_permit,
        school: student?.high_school,
      }));

      setResults(() => results || []);

      if (results?.length !== 0) {
        setVisible(false);
        setVisibleTable(true);
      } else {
        setVisible(true);
        setVisibleTable(false);
      }
    },
    [Students],
  );

  const { Data } = useFilterStatus({ data: Results, search: Search });

  const onReset = () => {
    form.resetFields();
    setVisible(false);
    setVisibleTable(false);
    setSearch("");
    setResults([]);
  };

  const onClose = () => {
    form.resetFields();
    setVisibleTable(false);
    setVisible(false);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Advanced search</title>
      </Helmet>

      <section className={"px-3 sm:px-11 space-y-5 max-w-full w-full"}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={25}
        >
          Advanced search
        </Title>

        <Form
          form={form}
          onFinish={onFinish}
          className="bg-white p-5 rounded-xl"
          layout="vertical"
        >
          {Visible && (
            <Alert
              showIcon
              message="Error"
              description="Error account cant be find please try again"
              type="error"
              closable
              className={"mb-5"}
              onClose={onClose}
            />
          )}

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-5">
              <Form.Item label="Account status" name={"status"}>
                <Select
                  placeholder={"Select"}
                  options={[
                    {
                      value: "ACTIVE",
                      label: "ACTIVE",
                    },
                    {
                      value: "INACTIVE",
                      label: "INACTIVE",
                    },
                    {
                      value: "DELETED",
                      label: "DELETED",
                    },
                  ]}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="First name" name={"first_name"}>
                <Input placeholder={"First name"} className={"h-[50px]"} />
              </Form.Item>

              <Form.Item label="Last name" name={"last_name"}>
                <Input placeholder={"Last name"} className={"h-[50px]"} />
              </Form.Item>

              <Form.Item label="Zip code" name={"zip"}>
                <Input placeholder={"Zip code"} className={"h-[50px]"} />
              </Form.Item>

              <Form.Item label="Phone" name={"phone"}>
                <Input placeholder={"Phone"} className={"h-[50px]"} />
              </Form.Item>

              <Form.Item label="Student City" name={"city"}>
                <Input placeholder={"Student City"} className={"h-[50px]"} />
              </Form.Item>

              <Form.Item label="Year opened">
                <DatePicker
                  picker={"year"}
                  placeholder={"Year opened"}
                  className={"w-full h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="Student address" name={"address"}>
                <Input placeholder={"Student address"} className={"h-[50px]"} />
              </Form.Item>

              <Form.Item label="Permit number" name={"pr_number"}>
                <Input placeholder={"Permit number"} className={"h-[50px]"} />
              </Form.Item>
            </div>

            <div className="space-y-5">
              <Form.Item label="Associated staff">
                <Select
                  placeholder={"Select"}
                  options={instructorsOptions}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="Account created">
                <DatePicker className="w-full h-[50px]" />
              </Form.Item>

              <Form.Item label="Student Type" name={"information_type"}>
                <Radio.Group>
                  <Radio value={"Adult"}>Adult</Radio>
                  <Radio value={"Teen"}>Teen</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Location" name={"location"}>
                <Select
                  placeholder={"Select"}
                  options={locationsOptions}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="High school" name={"school"}>
                <Select
                  placeholder={"Select"}
                  options={schoolsOptions}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="CR No" name={"cr"}>
                <Select
                  placeholder={"Select"}
                  options={classesOptions}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="Parent name" name={"parent_name"}>
                <Input placeholder={"Parent name"} className={"h-[50px]"} />
              </Form.Item>

              <Form.Item label="Email ID" name={"email"}>
                <Input placeholder={"Email ID"} className={"h-[50px]"} />
              </Form.Item>

              <Form.Item label="Phone search" name={"parent_phone"}>
                <Input placeholder={"Phone search"} className={"h-[50px]"} />
              </Form.Item>
            </div>
          </div>

          <div className="flex max-[480px]:flex-col justify-center gap-5 pt-5">
            <ButtonComponent
              defaultBg={"#24C18F"}
              defaultHoverBg={"#24C18F"}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              borderRadius={5}
              paddingInline={62}
              controlHeight={40}
              fontSize={16}
              className={"font-medium"}
              type={"submit"}
            >
              Filter
            </ButtonComponent>

            <ButtonComponent
              defaultBg={colorsObject.main}
              defaultHoverBg={colorsObject.main}
              defaultColor={colorsObject.primary}
              defaultHoverColor={colorsObject.primary}
              borderRadius={5}
              paddingInline={62}
              controlHeight={40}
              fontSize={16}
              className={"font-medium"}
              defaultBorderColor={colorsObject.primary}
              defaultHoverBorderColor={colorsObject.primary}
              type={"reset"}
              onClick={onReset}
            >
              Reset
            </ButtonComponent>
          </div>
        </Form>

        {VisibleTable && (
          <div className={"bg-white p-5 rounded-xl space-y-5"}>
            <Title fontSize={"text-2xl text-indigo-600"} fontWeightStrong={500}>
              Result: {Data.length}
            </Title>

            <div className="flex items-center justify-between">
              <Input
                className={"h-[50px] w-2/3 md:w-1/3"}
                placeholder={"Search"}
                prefix={<AiOutlineSearch className={"text-xl"} />}
                allowClear
                enterButton="Search"
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="flex items-center flex-shrink-0 gap-4">
                <IconComponent
                  icon={<SlCloudDownload />}
                  iconWidth={"border border-indigo-700 rounded p-1 shadow-lg"}
                />
              </div>
            </div>
            <div className={"-mx-5"}>
              <TableComponent columns={columns} data={Data} pagination scroll={{ x: 800 }} />
            </div>
          </div>
        )}
      </section>
    </Fragment>
  );
};

export default Search;
