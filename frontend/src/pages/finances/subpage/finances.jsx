import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { IncameModule } from "@/modules/finances.jsx";
import { Expenses } from "@/pages/finances/items/expenses.jsx";
import { InvoiceYear } from "@/pages/finances/items/invoice-year.jsx";
import { PlChart } from "@/pages/finances/items/pl-chart.jsx";
import { Table } from "antd";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";

export const Finances = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { columns, data } = IncameModule();
  return (
    <Fragment>
      <Helmet>
        <title>Finance - Finances</title>
      </Helmet>

      <div className={"grid grid-cols-3 gap-4"}>
        <div>
          <div className="bg-white p-5 shadow-xl rounded-xl">
            <div className="flex items-center justify-between">
              <Title level={4} fontSize={"text-base"} fontWeightStrong={600}>
                Invoice
              </Title>
              <CustomSelect
                placeholder={"Today"}
                options={[
                  {
                    value: "Today",
                    label: "Today",
                  },
                ]}
                className={"w-[150px] h-[50px]"}
              />
            </div>

            <div>@todo</div>
          </div>
        </div>
        <div>
          <div className="bg-white p-5 shadow-xl rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <Title level={4} fontSize={"text-base"} fontWeightStrong={600}>
                Expenses
              </Title>
              <CustomSelect
                placeholder={"Year"}
                options={[
                  {
                    value: "Last year",
                    label: "Last year",
                  },
                ]}
                className={"w-[150px] h-[50px]"}
              />
            </div>

            <div>
              <Expenses />
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white p-5 shadow-xl rounded-xl space-y-4">
            <Title level={4} fontSize={"text-base"} fontWeightStrong={600}>
              Quick Menu
            </Title>

            <ButtonComponent
              className={"w-full"}
              defaultHoverBg={"#3366FF"}
              defaultBg={"#3366FF"}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              borderRadius={10}
            >
              Add expense
            </ButtonComponent>

            <ButtonComponent
              className={"w-full"}
              defaultHoverBg={"#3366FF"}
              defaultBg={"#3366FF"}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              borderRadius={10}
            >
              Add Recurring
            </ButtonComponent>

            <ButtonComponent
              className={"w-full"}
              defaultHoverBg={"#3366FF"}
              defaultBg={"#3366FF"}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              borderRadius={10}
            >
              Balance sheet
            </ButtonComponent>

            <ButtonComponent
              className={"w-full"}
              defaultHoverBg={"#3366FF"}
              defaultBg={"#3366FF"}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              borderRadius={10}
            >
              Income Statement
            </ButtonComponent>

            <ButtonComponent
              className={"w-full"}
              defaultHoverBg={"#3366FF"}
              defaultBg={"#3366FF"}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              borderRadius={10}
            >
              Manage Recurring
            </ButtonComponent>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-5">
        <div className={"flex-grow shadow-xl"}>
          <div className="bg-white py-7 pl-7 pr-4 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <Title level={4} fontSize={"text-base"} fontWeightStrong={600}>
                Invoice
              </Title>
              <CustomSelect
                placeholder={"Year"}
                options={[
                  {
                    value: "Last year",
                    label: "Last year",
                  },
                ]}
                className={"w-[150px] h-[50px]"}
              />
            </div>

            <div>
              <InvoiceYear />
            </div>
          </div>
        </div>
        <div>
          <div className="w-64 bg-white p-7 rounded-xl shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <Title level={4} fontSize={"text-base"} fontWeightStrong={600}>
                P/L
              </Title>
              <CustomSelect
                placeholder={"Day"}
                options={[
                  {
                    value: "Today",
                    label: "Today",
                  },
                ]}
                className={"w-[150px] h-[50px]"}
              />
            </div>

            <div className="flex pb-5 border-b border-b-[#E6E9F4]">
              <div className="w-[100px] flex-shrink-0 space-y-5">
                <div className={"space-y-5"}>
                  <div className="w-36">
                    <Paragraph fontSize={"text-xl font-bold"}>
                      $17,000
                    </Paragraph>
                    <Paragraph
                      className={"text-[#5A607F]"}
                      fontSize={"text-sm"}
                    >
                      Incame
                    </Paragraph>
                  </div>

                  <div className="w-36">
                    <Paragraph fontSize={"text-xl font-bold"}>
                      $12,546
                    </Paragraph>
                    <Paragraph
                      className={"text-[#5A607F]"}
                      fontSize={"text-sm"}
                    >
                      Lost
                    </Paragraph>
                  </div>
                </div>
              </div>
              <div className={"flex-grow"}>
                <PlChart />
              </div>
            </div>

            <div className="pt-4">
              <div className={"space-y-5"}>
                <Paragraph className={"text-[#5A607F]"} fontSize={"text-sm"}>
                  Profit
                </Paragraph>

                <grid className="grid grid-cols-2 gap-2">
                  <div className="bg-[#24C18F] h-8 rounded-xl"></div>

                  <Paragraph
                    className={"text-end"}
                    fontSize={"text-xl font-bold"}
                  >
                    $17,000
                  </Paragraph>
                </grid>
              </div>
            </div>

            <div className="pt-4">
              <div className={"space-y-5"}>
                <Paragraph className={"text-[#5A607F]"} fontSize={"text-sm"}>
                  Lost
                </Paragraph>

                <grid className="grid grid-cols-2 gap-2">
                  <div className={`bg-[#FF333F] h-8 rounded-xl`}></div>

                  <Paragraph
                    className={"text-end"}
                    fontSize={"text-xl font-bold"}
                  >
                    $12,546
                  </Paragraph>
                </grid>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <div className="bg-white shadow-xl py-5 rounded-xl space-y-4">
            <Paragraph className={"px-5"} fontSize={"text-xl font-bold"}>
              Incame
            </Paragraph>
            <Table columns={columns} dataSource={data} pagination={false} />
            <div className="text-end px-5">
              <ButtonComponent
                defaultBg={"#24C18F"}
                defaultHoverBg={"#24C18F"}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                controlHeight={40}
                paddingInline={35}
                borderRadius={5}
              >
                See all
              </ButtonComponent>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white shadow-xl py-5 rounded-xl space-y-4">
            <Paragraph className={"px-5"} fontSize={"text-xl font-bold"}>
              Expenses
            </Paragraph>
            <Table columns={columns} dataSource={data} pagination={false} />
            <div className="text-end px-5">
              <ButtonComponent
                defaultBg={"#24C18F"}
                defaultHoverBg={"#24C18F"}
                defaultColor={colorsObject.main}
                defaultHoverColor={colorsObject.main}
                controlHeight={40}
                paddingInline={35}
                borderRadius={5}
              >
                See all
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
