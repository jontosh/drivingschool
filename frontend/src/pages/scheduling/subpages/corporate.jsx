import ButtonComponent from "@/components/button/index.jsx";
import { CustomCheckBox, CustomInput, CustomSelect } from "@/components/form/index.jsx";
import Modal from "@/components/modal";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Pagination, Table } from "antd";
import { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import CorporateStyle from "../scheduling.module.scss"

export const Corporate = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [CurrentPagination, setCurrentPagination] = useState(1);
  const [IsOpen, setIsOpen] = useState(false)

  const handleChangePagination = (page) => {
    setCurrentPagination(page);
  };

  const handleOpenModal = () => setIsOpen((prev) => !prev)

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {name}
        </Paragraph>
      ),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      align: "center",
      render: (year) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {year}
        </Paragraph>
      ),
    },
    {
      title: "Start date/End date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {date}
        </Paragraph>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      align: "center",
      render: (time) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {time}
        </Paragraph>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {type}
        </Paragraph>
      ),
    },
    {
      title: "Apply to",
      dataIndex: "apply",
      key: "apply",
      align: "center",
      render: (apply) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {apply}
        </Paragraph>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <ButtonComponent
          defaultHoverBg={status ? "#24C18F" : colorsObject.danger}
          defaultBg={status ? "#24C18F" : colorsObject.danger}
          defaultHoverColor={colorsObject.main}
          defaultColor={colorsObject.main}
          controlHeight={30}
          borderRadius={5}
          style={{ width: 94 }}
        >
          {status ? "Active" : "Not active"}
        </ButtonComponent>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: () => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          Dance
        </Paragraph>
      ),
    },
  ];

  const data = [
    {
      name: "Magnificent",
      year: 2024,
      date: "03/24  04/24",
      time: "15:00",
      type: "Party",
      apply: "Aminov.M",
      status: true,
    },
    {
      name: "Magnificent",
      year: 2024,
      date: "03/24  04/24",
      time: "15:00",
      type: "Party",
      apply: "Aminov.M",
      status: false,
    },
  ];
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
        <form className={"flex gap-5"}>
          <label className={"relative shadow-xl"}>
            <CustomInput
              colorBorder={colorsObject.primary}
              placeholder={"Find student"}
              className={`w-96 pl-12 pr-4 py-2.5 text-sm inline-flex flex-row-reverse`}
            />
            <span
              className={"absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "}
            >
              <AiOutlineSearch />
            </span>
          </label>

          <ButtonComponent
            defaultBg="#24C18F"
            defaultHoverBg="#24C18F"
            borderRadius={5}
            style={{
              width: 142
            }}
            className={"h-10"}
            onClick={handleOpenModal}
          >
            Add new
          </ButtonComponent>
        </form>

        <Pagination
          total={10}
          pageSize={1}
          current={CurrentPagination}
          onChange={handleChangePagination}
        />
      </div>

      <div className={"pt-5"}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>

      {IsOpen && (
        <Modal setIsOpen={setIsOpen}>
          <div className={`${CorporateStyle["Corporate__modal"]} bg-white py-7 px-7 w-full rounded-2xl overflow-scroll m-2.5`}>
            <Title
              level={2}
              fontSize={"text-indigo-600 text-4xl"}
              fontWeightStrong={600}
              titleMarginBottom={30}
            >
              Corporate time off
            </Title>
            <form>
              <CustomSelect
                placeholder={"Insert us standart holiday"}
                className={"shadow-xl w-96"}
                style={{
                  height: 40
                }}
                options={[
                  {
                    value: 1,
                    label: 1,
                  }
                ]}
              />
              <div className="grid grid-cols-2 pt-8 space-x-16">
                <div className="flex flex-col gap-y-5">
                  <CustomInput
                    spanText={"Name"}
                    spanClassName={"w-40 font-medium text-base"}
                    classNames={"flex flex-row-reverse gap-5 items-center h-10"}
                    className={"shadow-xl"}
                    placeholder={"Name"}
                  />

                  <label className="flex items-center gap-5">
                    <span className="w-40 font-medium text-base">Status</span>
                    <CustomSelect
                      placeholder={"Select status"}
                      className={"w-full shadow-xl"}
                      style={{
                        height: 40
                      }}
                      options={[
                        {
                          value: 1,
                          label: 1,
                        }
                      ]}
                    />
                  </label>

                  <CustomInput
                    spanText={"Code"}
                    spanClassName={"w-40 font-medium text-base"}
                    classNames={"flex flex-row-reverse gap-5 items-center h-10"}
                    className={"shadow-xl"}
                    placeholder={"Code"}
                  />

                  <label className="flex items-center gap-5">
                    <span className="w-40 font-medium text-base">Type</span>
                    <CustomSelect
                      placeholder={"Select status"}
                      className={"w-full shadow-xl"}
                      style={{
                        height: 40
                      }}
                      options={[
                        {
                          value: 1,
                          label: 1,
                        }
                      ]}
                    />
                  </label>

                  <CustomInput
                    spanText={"Affected Date(s)"}
                    spanClassName={"w-40 font-medium text-base"}
                    classNames={"flex flex-row-reverse gap-5 items-center h-10"}
                    className={"shadow-xl"}
                    placeholder={"Affected dates"}
                  />
                </div>

                <div className="flex flex-col gap-y-5">
                  <label className="flex gap-16 items-center">
                    <span className="font-medium text-base">All day</span>

                    <div className="flex gap-5">
                      <CustomCheckBox>
                        Yes
                      </CustomCheckBox>

                      <CustomCheckBox>
                        No
                      </CustomCheckBox>
                    </div>
                  </label>

                  <label className="flex gap-16 items-center">
                    <span className="w-44 font-medium text-base">Automatically Assign to New Staff</span>

                    <div className="flex gap-5">
                      <CustomCheckBox>
                        Yes
                      </CustomCheckBox>

                      <CustomCheckBox>
                        No
                      </CustomCheckBox>
                    </div>
                  </label>

                  <label className="flex gap-16 items-center">
                    <span className="w-44 font-medium text-base">Apply to All Teaching Staff</span>

                    <div className="flex gap-5">
                      <CustomCheckBox>
                        Yes
                      </CustomCheckBox>

                      <CustomCheckBox>
                        No
                      </CustomCheckBox>
                    </div>
                  </label>

                  <CustomInput
                    spanText={"Note"}
                    spanClassName={"w-40 font-medium text-base"}
                    classNames={"flex flex-row-reverse gap-5 items-center h-10"}
                    className={"shadow-xl"}
                    placeholder={"Note"}
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-center pt-8">
                <ButtonComponent
                  controlHeight={40}
                  borderRadius={5}
                  defaultBg="#24C18F"
                  defaultHoverBg="#24C18F"
                  defaultColor="#FFFFFF"
                  defaultHoverColor="#FFFFFF"
                  className={"font-medium"}
                  style={{ width: 234 }}
                >
                  Save
                </ButtonComponent>
                <ButtonComponent
                  controlHeight={40}
                  borderRadius={5}
                  defaultBg="transparent"
                  defaultBorderColor="#5F66E9"
                  defaultColor="#000000"
                  defaultHoverColor="#000000"
                  className={"font-medium"}
                  style={{ width: 234 }}
                  onClick={handleOpenModal}
                >
                  Close
                </ButtonComponent>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};
