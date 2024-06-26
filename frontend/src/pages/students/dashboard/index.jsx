import LinksIcon from "@/assets/icons/links.svg";
import IconComponent from "@/components/icons";
import Image from "@/components/image/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import { DrivingItem } from "@/pages/scheduling/items/items.jsx";
import { Upload } from "@/pages/students/dashboard/items/upload.jsx";
import { ConfigProvider, Statistic } from "antd";
import { Fragment, useContext } from "react";
import CountUp from "react-countup";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { GiWallet } from "react-icons/gi";
import ButtonComponent from "@/components/button";
import ColorsContext from "@/context/colors.jsx";
import { BiDollar } from "react-icons/bi";
import { FaDownload, FaFilePdf } from "react-icons/fa6";
import { IoPrint } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";

const Dashboard = () => {
  const { colorsObject } = useContext(ColorsContext);

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
            <Link to={"/"} className="text-[#1890FF]">View all &#62;</Link>
          </div>

          <div className="grid grid-cols-4 gap-5 max-[1400px]:grid-cols-3 max-[1200px]:grid-cols-2 max-[960px]:grid-cols-1">
            <DrivingItem />
            <DrivingItem />
            <DrivingItem />
            <DrivingItem />
          </div>

          <div className="grid grid-cols-3 gap-2.5 max-[1250px]:grid-cols-2 max-[1000px]:grid-cols-1">
            <div className="flex flex-col justify-between border p-5 rounded-xl">
              <ConfigProvider
                theme={{
                  token: {
                    colorTextDescription: "#000",
                    fontSize: 18,
                  },
                }}
              >
                <Statistic
                  title="Account Balance"
                  value={8453.0}
                  prefix={"$"}
                  formatter={formatter}
                  valueStyle={{ fontWeight: 600, fontSize: 35 }}
                />
              </ConfigProvider>

              <div className="flex items-center justify-between">
                <IconComponent
                  icon={<GiWallet />}
                  iconWidth={"text-[66px]"}
                />

                <div className="flex items-center space-x-2">
                  <Link
                    className="py-2 px-4 border rounded-xl"
                  >PAY NOW</Link>

                  <IconComponent
                    icon={<BiDollar />}
                    iconWidth={"text-xl"}
                    className={"bg-black text-white rounded-xl w-[35px] h-[35px] mb-1"}
                    iconClass={"pt-1.5"}
                  />
                </div>
              </div>
            </div>

            <div className="border p-5 rounded-xl space-y-5">
              <Title fontSize={"text-lg"}>EZ DRIVE ONLINE COURSE</Title>
              <Paragraph fontSize={"text-base"}>
                Please contact our customer service if you want to purchase an
                online course.
              </Paragraph>
              <Link
                to={"/"}
                className="py-2 px-4 border rounded-xl"
              >LEARN MORE</Link>
            </div>

            <div className="max-w-60 flex flex-col justify-between border p-5 rounded-xl max-xl:gap-5">
              <Title fontSize={"text-lg"}>MY FILES</Title>
              <div className="flex items-center justify-between ">
                <IconComponent
                  icon={<FaFilePdf />}
                  className={"bg-black text-white w-10 h-10 rounded-xl"}
                  iconClass={"pt-1.5"}
                  iconWidth={"text-xl"}
                />

                <Paragraph fontSize={"text-xs font-semibold"}>Student Contract</Paragraph>
              </div>
              <div className="flex justify-between items-center">
                <IconComponent
                  icon={<IoPrint />}
                  className={"bg-[#ECECEC] w-10 h-10 rounded-xl"}
                  iconWidth={"text-2xl"}
                  iconClass={"pt-1.5"}
                />
                <IconComponent
                  icon={<IoMdEye />}
                  className={"bg-[#ECECEC] w-10 h-10 rounded-xl"}
                  iconWidth={"text-2xl"}
                  iconClass={"pt-1.5"}
                />
                <IconComponent
                  icon={<FaDownload />}
                  className={"bg-[#ECECEC] w-10 h-10 rounded-xl"}
                  iconWidth={"text-xl"}
                  iconClass={"pt-1.5"}
                />
              </div>
            </div>

            <div className="space-y-5 border border-[#CED8E5] p-5 rounded-xl">
              <div className="flex justify-between items-center gap-4">
                <Title level={4} fontSize={"text-xl"}>
                  Quick links
                </Title>

                <Image className={"w-6"} src={LinksIcon} srcSet={LinksIcon} />
              </div>

              <div className={"grid grid-cols-2 gap-5"}>
                <Link
                  to={"/"}
                  className={
                    "w-full rounded-lg text-center bg-[#5459EA] py-2 text-white hover:bg-[#5F66E9CC]"
                  }
                >
                  My Profile
                </Link>
                <Link
                  to={"/"}
                  className={
                    "w-full rounded-lg text-center bg-[#5459EA] py-2 text-white hover:bg-[#5F66E9CC]"
                  }
                >
                  Contact us
                </Link>
                <Link
                  to={"/"}
                  className={
                    "w-full rounded-lg text-center bg-[#5459EA] py-2 text-white hover:bg-[#5F66E9CC]"
                  }
                >
                  Appointments
                </Link>
                <Link
                  to={"/"}
                  className={
                    "w-full rounded-lg text-center bg-[#5459EA] py-2 text-white hover:bg-[#5F66E9CC]"
                  }
                >
                  Book lessons
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-between border border-[#CED8E5] p-5 rounded-xl">
              <Title fontSize={"text-base font-semibold"}>SIGN DOCUMENTS</Title>
              <Paragraph fontSize={"text-sm font-semibold"}>Teens 8hr in car instruction</Paragraph>

              <div className="flex justify-between items-center">
                <div className="space-x-3">
                  <IconComponent
                    icon={<IoPrint />}
                    className={"bg-[#ECECEC] w-10 h-10 rounded-xl"}
                    iconWidth={"text-2xl"}
                    iconClass={"pt-1.5"}
                  />
                  <IconComponent
                    icon={<IoMdEye />}
                    className={"bg-[#ECECEC] w-10 h-10 rounded-xl"}
                    iconWidth={"text-2xl"}
                    iconClass={"pt-1.5"}
                  />
                </div>

                <Link
                  to={"/"}
                  className="bg-[#24C18F] py-2.5 px-5 rounded-xl"
                >SIGN</Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 max-[1000px]:grid-cols-1">
            <div className="space-y-5 border rounded-xl p-5">
              <Title fontSize={"text-xl font-semibold"} className={"border-b border-[#CED8E5] pb-5"}>UPLOAD FILES</Title>

              <Paragraph colorText="#9D9D9D" className={"border-b boder-[#9D9D9D] pb-5"}>
                Click “CHOOSE FILE” below to select an image or to take a picture from your mobile device to upload to the school (jpg, png, or pdf ONLY).
              </Paragraph>

              <Paragraph colorText="#9D9D9D">
                After selecting the file, choose the correct category for your image or form from the dropdown menu.
                <br /><br />
                Click Upload.
                <br /><br />
                (Only jpg, png, and pdf file formats are allowed)
              </Paragraph>

              <Upload />

              <div className="space-x-2.5 text-end border-t border-[#CED8E5] pt-5">
                <ButtonComponent
                  defaultBg={colorsObject.main}
                  defaultColor={colorsObject.black}
                  defaultHoverColor={colorsObject.black}
                  defaultBorderColor="#CBCBCB"
                  borderRadius={8}
                  paddingInline={20}
                >
                  Cancel
                </ButtonComponent>

                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.infoHover}
                  defaultColor={colorsObject.main}
                  defaultBorderColor="#CBCBCB"
                  borderRadius={8}
                  paddingInline={20}
                >
                  Continue
                </ButtonComponent>
              </div>
            </div>

            <div className="space-y-5 border rounded-xl p-5">
              <Title fontSize={"text-xl font-semibold"} className={"border-b border-[#E3E3E3] pb-5"}>REQUIRED PAPERWORK</Title>

              <Paragraph colorText="#9D9D9D" className={"border-b border-[#E3E3E3] pb-5"}>
                Click “CHOOSE FILE” below to select an image or to take a picture from your mobile device to upload to the school (jpg, png, or pdf ONLY).
              </Paragraph>

              <Paragraph colorText="#9D9D9D" className={"border-b border-[#E3E3E3] pb-5"}>
                After selecting the file, choose the correct category for your image or form from the dropdown menu.
                <br /><br />
                Click Upload.
                <br /><br />
                (Only jpg, png, and pdf file formats are allowed)
              </Paragraph>

              <div className="flex justify-between items-center border-b border-[#E3E3E3] pb-5">
                <Paragraph>Copy of Permit</Paragraph>

                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.infoHover}
                  paddingInline={20}
                  borderRadius={10}
                >UPLOAD</ButtonComponent>
              </div>

              <div className="flex justify-between items-center">
                <Paragraph>Copy of Permit</Paragraph>

                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.infoHover}
                  paddingInline={20}
                  borderRadius={10}
                >UPLOAD</ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;