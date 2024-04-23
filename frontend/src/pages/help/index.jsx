import ButtonComponent from "@/components/button";
import IconComponent from "@/components/icons";
import Title, { Paragraph } from "@/components/title/index.jsx";
import { HistoryOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import ColorsContext from "@/context/colors.jsx";

const Help = () => {
  const { colorsObject } = useContext(ColorsContext);

  const columns = [
    {
      title: "N#",
      dataIndex: "N",
      key: "N",
      align: "center",
      render: (N) => (
        <Paragraph
          fontWeightStrong={400}
          fontSize={"text-lg"}
        >
          {N}
        </Paragraph>
      ),
    },
    {
      title: "Ticket id",
      dataIndex: "ticket",
      key: "ticket",
      align: "center",
      render: (ticket) => (
        <Paragraph
          fontWeightStrong={400}
          fontSize={"text-lg"}
        >
          {ticket}
        </Paragraph>
      ),
    },
    {
      title: "Ticket Title",
      dataIndex: "ticketTitle",
      key: "ticketTitle",
      align: "center",
      render: (ticketTitle) => (
        <Paragraph
          fontWeightStrong={400}
          fontSize={"text-lg"}
        >
          {ticketTitle}
        </Paragraph>
      ),
    },
    {
      title: "Ticket Name",
      dataIndex: "ticketName",
      key: "ticketName",
      align: "center",
      render: (ticketName) => (
        <Paragraph
          fontWeightStrong={400}
          fontSize={"text-lg"}
        >
          {ticketName}
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
      )
    },
    {
      title: "Last chage",
      dataIndex: "lastChage",
      key: "lastChage",
      align: "center",
      render: (lastChage) => (
        <Paragraph
          fontWeightStrong={400}
          fontSize={"text-lg"}
        >
          {lastChage}
        </Paragraph>
      ),
    },
  ]

  const data = [
    {
      N: "1",
      ticket: "133",
      ticketTitle: "Balance dissapear",
      ticketName: "Aminov Taminov",
      status: true,
      lastChage: "03/18/02:00"
    },
    {
      N: "1",
      ticket: "133",
      ticketTitle: "Balance dissapear",
      ticketName: "Aminov Taminov",
      status: false,
      lastChage: "03/18/02:00"
    },
    {
      N: "1",
      ticket: "133",
      ticketTitle: "Balance dissapear",
      ticketName: "Aminov Taminov",
      status: true,
      lastChage: "03/18/02:00"
    }
  ]

  return (
    <Fragment>
      <Helmet>
        <title>Help and Onboarding</title>
      </Helmet>
      <section className={"px-11 space-y-5 max-w-full w-full"}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
        >
          Help and Onboarding
        </Title>

        <div className="grid grid-cols-2 gap-9">
          <div className="flex flex-col gap-y-3 border border-indigo-600 rounded-xl bg-white py-4 px-5">
            <span className="font-medium text-xl">Customer Support</span>

            <IconComponent
              icon={<MailOutlined />}
              iconWidth={"text-3xl text-blue-600"}
              children={"Email: example@mail.com"}
              classNames={"flex items-center gap-2 font-medium text-lg"}
              className={"text-start"}
            />
            <IconComponent
              icon={<PhoneOutlined />}
              iconWidth={"text-3xl text-blue-600"}
              children={"Phone: 865-630-8021"}
              classNames={"flex items-center gap-2 font-medium text-lg"}
              className={"text-start"}
            />
            <IconComponent
              icon={<HistoryOutlined />}
              iconWidth={"text-3xl text-blue-600"}
              children={"Support hours:"}
              classNames={"flex items-center gap-2 font-medium text-lg"}
              className={"text-start"}
            />

            <label className="flex items-center gap-2">
              <span className="font-medium text-lg">Mon - Fri:</span>

              <span>8 AM - 6 PM</span>
            </label>

            <label className="flex items-center gap-3.5">
              <span className="font-medium text-lg">Sat:</span>

              <div className="flex gap-2.5 items-center">
                <ButtonComponent
                  className={"w-11"}
                  borderRadius={5}
                  defaultBorderColor="#5F66E9"
                  defaultColor="#000000"
                  defaultHoverColor="#000000"
                  fontSize={14}
                >
                  9 AM
                </ButtonComponent>
                <span>-</span>
                <ButtonComponent
                  className={"w-11"}
                  borderRadius={5}
                  defaultBorderColor="#5F66E9"
                  defaultColor="#000000"
                  defaultHoverColor="#000000"
                  fontSize={14}
                >
                  6 PM
                </ButtonComponent>
              </div>
            </label>

            <label className="flex items-center gap-2.5">
              <span className="font-medium text-lg">Sun:</span>

              <div className="flex gap-2.5 items-center">
                <ButtonComponent
                  className={"w-11"}
                  borderRadius={5}
                  defaultBorderColor="#5F66E9"
                  defaultColor="#000000"
                  defaultHoverColor="#000000"
                  fontSize={14}
                >
                  11 AM
                </ButtonComponent>
                <span>-</span>
                <ButtonComponent
                  className={"w-11"}
                  borderRadius={5}
                  defaultBorderColor="#5F66E9"
                  defaultColor="#000000"
                  defaultHoverColor="#000000"
                  fontSize={14}
                >
                  6 PM
                </ButtonComponent>
              </div>
            </label>
          </div>
          <div className="border border-indigo-600 rounded-xl bg-white py-4">
            <div className="flex justify-between items-center px-5 pb-4 border-b border-blue-600 w-full">
              <span className="font-medium text-xl">Latest news</span>

              <ButtonComponent
                className={"w-20"}
                borderRadius={5}
                defaultBorderColor="#5F66E9"
                defaultColor="#000000"
                defaultHoverColor="#000000"
                fontSize={14}
              >
                See all
              </ButtonComponent>
            </div>

            <div className="flex flex-col gap-y-10 px-5 pt-5">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-base font-semibold">Shock mister president became mister presidentia</span>
                  <span className="text-xs font-normal">Shock mister president became mister presidentia</span>
                </div>

                <span className="text-xs font-normal">03/18/2023.02:00</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-base font-semibold">Shock mister president became mister presidentia</span>
                  <span className="text-xs font-normal">Shock mister president became mister presidentia</span>
                </div>

                <span className="text-xs font-normal">03/18/2023.02:00</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-base font-semibold">Shock mister president became mister presidentia</span>
                  <span className="text-xs font-normal">Shock mister president became mister presidentia</span>
                </div>

                <span className="text-xs font-normal">03/18/2023.02:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-indigo-600 rounded-xl bg-white py-4 px-5">
          <div className="flex justify-between pb-5">
            <div>
              <Title
                level={2}
                fontSize={"text-indigo-600 text-xl"}
                fontWeightStrong={500}
              >
                My tickets <span className="text-black">2</span>
              </Title>
            </div>

            <div className="flex gap-5">
              <ButtonComponent
                defaultBg="#24C18F"
                defaultColor="#FFFFFF"
                defaultHoverBg="#24C18F"
                borderRadius={5}
                className={"h-10"}
                style={{
                  width: 142
                }}
              >
                All tickets
              </ButtonComponent>

              <ButtonComponent
                defaultBg="#24C18F"
                defaultColor="#FFFFFF"
                defaultHoverBg="#24C18F"
                borderRadius={5}
                className={"h-10"}
                style={{
                  width: 142
                }}
              >
                New ticket
              </ButtonComponent>
            </div>
          </div>

          <div className="-mx-5">
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Help;
