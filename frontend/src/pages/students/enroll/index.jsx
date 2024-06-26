import TableComponent from "@/components/table/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const StudentEnroll = ({ className, children, ...props }) => {
  const columns = [
    {
      title: "Package Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Paragraph fontSize={"text-lg"} fontWeightStrong={400}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (text) => (
        <Paragraph
          className={"border rounded-full"}
          fontSize={"text-lg"}
          fontWeightStrong={400}
        >
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (text) => (
        <Paragraph
          className={"border rounded-full"}
          fontSize={"text-lg"}
          fontWeightStrong={400}
        >
          {text}
        </Paragraph>
      ),
    },
  ];

  return (
    <Fragment>
      <Helmet>
        <title>Student - Enrollment</title>
      </Helmet>

      <section className={"px-11 space-y-5 max-w-full w-full"} {...props}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
          className={"pl-7"}
        >
          Enroll
        </Title>

        <div className="bg-white p-5 rounded-xl gap-5 grid grid-cols-2">
          <div>
            <div className=" border-b py-2.5 border-b-[#CED8E5] flex justify-between bg-[#FFB82F80]">
              <Title
                className={"px-5"}
                level={2}
                fontSize={"text-xl space-x-2"}
              >
                Selection
              </Title>
            </div>

            <TableComponent columns={columns} pagination={true} />
          </div>

          <div>
            <div className=" border-b py-2.5 border-b-[#CED8E5] flex justify-between bg-[#FFB82F80]">
              <Title
                className={"px-5"}
                level={2}
                fontSize={"text-xl space-x-2"}
              >
                Purchase Recap
              </Title>
            </div>

            <TableComponent pagination={true} />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default StudentEnroll;
