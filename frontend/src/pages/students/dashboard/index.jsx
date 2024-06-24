import LinksIcon from "@/assets/icons/links.svg";
import Image from "@/components/image/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import { DrivingItem } from "@/pages/scheduling/items/items.jsx";
import { Upload } from "@/pages/students/dashboard/items/upload.jsx";
import { Statistic } from "antd";
import { Fragment } from "react";
import CountUp from "react-countup";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <Fragment>
      <Helmet>
        <title>Student - Dashboard</title>
      </Helmet>
      <section className={"px-11 space-y-5 max-w-full w-full"}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
          className={"pl-7"}
        >
          Home
        </Title>

        <div className="bg-white p-5 rounded-xl space-y-5">
          <div className="bg-[#FFB82F80] p-10 rounded-xl">
            <Title>Notifications</Title>
            <Paragraph>Welcome to your student portal!</Paragraph>
          </div>

          <div className="flex items-center justify-between">
            <Title>Upcoming schedule</Title>
            <Link to={"/"}>View all &#62;</Link>
          </div>

          <div className="grid grid-cols-4 gap-5 max-[1400px]:grid-cols-3 max-[1200px]:grid-cols-2 max-[960px]:grid-cols-1">
            <DrivingItem />
            <DrivingItem />
            <DrivingItem />
            <DrivingItem />
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="border p-5 rounded">
              <Statistic
                title="Earning"
                value={8453.0}
                prefix={"$"}
                formatter={formatter}
                valueStyle={{ fontWeight: 600 }}
              />

              <div>@todo</div>
            </div>

            <div className="border p-5 rounded ">
              <Title>EZ DRIVE ONLINE COURSE</Title>
              <Paragraph>
                Please contact our customer service if you want to purchase an
                online course.
              </Paragraph>
              <Link to={"/"}>LEARN MORE</Link>
            </div>

            <div className="border p-5 rounded">
              <Title>EZ DRIVE ONLINE COURSE</Title>
              <Paragraph>Student Contract</Paragraph>
              <div className="">@todo</div>
            </div>

            <div className="space-y-5 border border-[#CED8E5] p-5 rounded-xl">
              <div className="flex justify-between items-center gap-4">
                <Title level={4} fontSize={"text-xl"}>
                  Quick links
                </Title>

                <Image className={"w-6"} src={LinksIcon} srcSet={LinksIcon} />
              </div>

              <div className={"space-y-5"}>
                <Link
                  to={"/"}
                  className={
                    "w-full rounded-lg text-center bg-sky-500 py-2 text-white hover:bg-sky-400"
                  }
                >
                  Take attendance
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="space-y-5 border rounded-xl p-5">
              <Title>UPLOAD FILES</Title>
              <Upload />
            </div>
            <div className="space-y-5 border rounded-xl p-5">
              <Title>REQUIRED PAPERWORK</Title>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;
