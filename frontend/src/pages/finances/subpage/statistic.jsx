import { CustomSelect } from "@/components/form/index.jsx";
import Title, { Paragraph, Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { StatisticModule } from "@/modules/finances.jsx";
import { StatisticsOnline } from "@/pages/finances/items/statistics-online.jsx";
import { TopSellingChart } from "@/pages/finances/items/top-selling-chart.jsx";
import { Table } from "antd";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";

export const Statistic = () => {
  const { columns, data } = StatisticModule();
  const { colorsObject } = useContext(ColorsContext);

  return (
    <Fragment>
      <Helmet>
        <title>Finance - Statistic</title>
      </Helmet>
      <div className="grid grid-cols-4 gap-2.5">
        <div className="rounded-xl shadow-xl bg-white p-5 flex justify-between items-center">
          <Paragraph fontSize={"text-xl"} className={"font-semibold"}>
            Student active
          </Paragraph>
          <Paragraph
            className={"text-indigo-600 font-semibold"}
            fontSize={"text-xl"}
          >
            2283
          </Paragraph>
        </div>
        <div className="rounded-xl shadow-xl bg-white p-5 flex justify-between items-center">
          <Paragraph fontSize={"text-xl"} className={"font-semibold"}>
            Instructor
          </Paragraph>
          <Paragraph
            className={"text-indigo-600 font-semibold"}
            fontSize={"text-xl"}
          >
            2283
          </Paragraph>
        </div>
        <div className="rounded-xl shadow-xl bg-white p-5 flex justify-between items-center">
          <Paragraph fontSize={"text-xl"} className={"font-semibold"}>
            Vehicles
          </Paragraph>
          <Paragraph
            className={"text-indigo-600 font-semibold"}
            fontSize={"text-xl"}
          >
            2283
          </Paragraph>
        </div>
        <div className="rounded-xl shadow-xl bg-white p-5 flex justify-between items-center">
          <Paragraph fontSize={"text-xl"} className={"font-semibold"}>
            Location
          </Paragraph>
          <Paragraph
            className={"text-indigo-600 font-semibold"}
            fontSize={"text-xl"}
          >
            2283
          </Paragraph>
        </div>
      </div>

      <div>
        <div className="flex justify-between gap-2.5">
          <div className="bg-white py-5 rounded-xl shadow-xl max-w-[550px] w-full">
            <Title
              className={"px-5 "}
              level={4}
              fontSize={"text-base text-indigo-600"}
              fontWeightStrong={600}
              titleMarginBottom={25}
            >
              Top selling product
            </Title>

            <Table columns={columns} dataSource={data} pagination={false} />
          </div>

          <div className="bg-white py-5 rounded-xl shadow-xl max-w-[330px] w-full">
            <Title
              className={"px-5 "}
              level={4}
              fontSize={"text-base text-indigo-600"}
              fontWeightStrong={600}
              titleMarginBottom={25}
            >
              Top selling product
            </Title>

            <div>
              <TopSellingChart />
            </div>
          </div>

          <div className="bg-white py-5 rounded-xl shadow-xl max-w-[550px] w-full">
            <Title
              className={"px-5 "}
              level={4}
              fontSize={"text-base text-indigo-600"}
              fontWeightStrong={600}
              titleMarginBottom={25}
            >
              All statistic
            </Title>
            <div className="flex justify-evenly">
              <div className="text-center space-y-1.5">
                <Paragraph
                  className={"text-indigo-600"}
                  fontSize={"text-base font-bold"}
                >
                  1625
                </Paragraph>
                <Paragraph fontSize={"text-base font-bold"}>Teachers</Paragraph>
                <Paragraph
                  fontSize={"text-sm font-bold"}
                  className={"text-[#24C18F]"}
                >
                  Online
                </Paragraph>
              </div>

              <div className="text-center space-y-1.5">
                <Paragraph
                  className={"text-indigo-600"}
                  fontSize={"text-base font-bold"}
                >
                  1625
                </Paragraph>
                <Paragraph fontSize={"text-base font-bold"}>Students</Paragraph>
                <Paragraph
                  fontSize={"text-sm font-bold"}
                  className={"text-[#24C18F]"}
                >
                  Online
                </Paragraph>
              </div>
              <div className="text-center space-y-1.5">
                <Paragraph
                  className={"text-indigo-600"}
                  fontSize={"text-base font-bold"}
                >
                  1625
                </Paragraph>
                <Paragraph fontSize={"text-base font-bold"}>
                  Web Users
                </Paragraph>
                <Paragraph
                  fontSize={"text-sm font-bold"}
                  className={"text-[#24C18F]"}
                >
                  Online
                </Paragraph>
              </div>
            </div>
            <div className="text-center pt-5 space-y-5">
              <Paragraph fontSize={"text-base font-semibold"}>
                Registration on site
              </Paragraph>
              <ul className="list-none space-y-5">
                <li className={"space-x-5"}>
                  <Text fontSize={"text-base"}>Teachers</Text>
                  <Text fontSize={"text-base"} className={"text-indigo-600"}>
                    4134154631 times
                  </Text>
                </li>
                <li className={"space-x-5"}>
                  <Text fontSize={"text-base"}>Students</Text>
                  <Text fontSize={"text-base"} className={"text-indigo-600"}>
                    4134154631 times
                  </Text>
                </li>
                <li className={"space-x-5"}>
                  <Text fontSize={"text-base"}>Users</Text>
                  <Text fontSize={"text-base"} className={"text-indigo-600"}>
                    4134154631 times
                  </Text>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={"flex-grow shadow-xl"}>
        <div className="bg-white py-7 pl-7 pr-4 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <Title level={4} fontSize={"text-base"} fontWeightStrong={600}>
              Online
            </Title>
            <CustomSelect
              placeholder={"Year"}
              options={[
                {
                  value: "Last year",
                  label: "Last year",
                },
              ]}
              colorBorder={colorsObject.primary}
              className={"w-[150px] h-[50px]"}
            />
          </div>

          <div>
            <StatisticsOnline />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
