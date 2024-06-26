import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Form } from "antd";
import { Fragment, useContext } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";

export const Appointments = ({ ...props }) => {
  const { colorsObject } = useContext(ColorsContext);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Appnt Data",
      dataIndex: "data",
      key: "data",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
      defaultSortOrder: "descend",
      sorter: (a, b) => a.data - b.data,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
      defaultSortOrder: "descend",
      sorter: (a, b) => a.time - b.time,
    },
    {
      title: "App Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
      defaultSortOrder: "descend",
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
      defaultSortOrder: "descend",
      sorter: (a, b) => a.instructor - b.instructor,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
      defaultSortOrder: "descend",
      sorter: (a, b) => a.location - b.location,
    },
    {
      title: "Pickup Location",
      dataIndex: "pickup",
      key: "pickup",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
      defaultSortOrder: "descend",
      sorter: (a, b) => a.pickup - b.pickup,
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
      defaultSortOrder: "descend",
      sorter: (a, b) => a.product_name - b.product_name,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
      defaultSortOrder: "descend",
      sorter: (a, b) => a.position - b.position,
    },
  ];

  return (
    <div className={"space-y-8"}>
      <Title level={2} fontSize={"text-xl space-x-2"}>
        <IconComponent
          vertical={"items-center"}
          spaceIconX={2.5}
          icon={<FaCalendarAlt />}
          iconClass={"text-gray-400"}
        >
          APPOINTMENTS
        </IconComponent>
      </Title>

      <Form>
        <div className="grid grid-cols-2 gap-20 max-[1200px]:grid-cols-1 max-[1200px]:gap-5">
          <div className="gap-2.5 flex items-center">
            <Form.Item className={"flex-grow mb-0"}>
              <div className="flex items-center gap-3">
                <CustomSelect
                  className={"h-[50px] mb-0"}
                  options={[{ value: 1, label: 1 }]}
                  placeholder={"Select"}
                />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <ButtonComponent
              controlHeight={40}
              paddingInline={43}
              defaultBg={colorsObject.success}
              defaultHoverBg={colorsObject.successHover}
              borderRadius={5}
            >
              FILTER
            </ButtonComponent>
          </div>

          <div className="gap-2.5 flex items-center">
            <Form.Item className={"flex-grow mb-0"}>
              <div className="flex items-center gap-3">
                <CustomSelect
                  className={"h-[50px] mb-0"}
                  options={[{ value: 1, label: 1 }]}
                  placeholder={"Select"}
                />
                <span>
                  <FiHelpCircle className={"text-xl text-[#98A2B3]"} />
                </span>
              </div>
            </Form.Item>

            <ButtonComponent
              controlHeight={40}
              paddingInline={43}
              defaultBg={colorsObject.success}
              defaultHoverBg={colorsObject.successHover}
              borderRadius={5}
            >
              FILTER
            </ButtonComponent>
          </div>
        </div>
      </Form>

      <TableComponent
        columns={columns}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
    </div>
  );
};
