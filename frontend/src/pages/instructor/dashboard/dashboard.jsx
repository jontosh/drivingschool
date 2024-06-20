import LinksIcon from "@/assets/icons/links.svg";
import ButtonComponent from '@/components/button/index.jsx'
import { CustomInput, CustomSelect } from '@/components/form/index.jsx'
import Image from "@/components/image/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from '@/context/colors.jsx'
import { Upload } from '@/pages/instructor/dashboard/items/upload.jsx'
import { DrivingItem } from "@/pages/scheduling/items/items.jsx";
import { Form } from 'antd'
import classNames from "classnames";
import { Fragment, useContext } from 'react'
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import IconComponent from "@/components/icons";
import { FiChevronRight } from "react-icons/fi";

const Dashboard = ({ className, children, ...props }) => {
  const [form] = Form.useForm();
  const { colorsObject } = useContext(ColorsContext)

  // func
  const onFinish = async values => {
    console.log(values)
  }

  const onReset = () => {
    form.resetFields();
  }
  return (
    <Fragment>
      <Helmet>
        <title> Instructor - Dashboard</title>
      </Helmet>
      <section
        className={classNames(className, "px-11 space-y-5 max-w-full w-full")}
        {...props}
      >
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
          className={"pl-7"}
        >
          Home
        </Title>

        <div className="bg-white rounded-xl px-7 py-5 space-y-5">
          <div className="grid grid-cols-4 gap-5">
            <DrivingItem />
            <DrivingItem />
            <DrivingItem />
            <DrivingItem />
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className={"space-y-8"}>
              <div className='space-y-5 border border-[#CED8E5] p-5 rounded-xl'>
                <div className="flex justify-between items-center gap-4">
                  <Title level={4} fontSize={"text-xl"}>
                    Quick links
                  </Title>

                  <Image className={"w-6"} src={LinksIcon} srcSet={LinksIcon} />
                </div>

                <div className={"space-y-5"}>
                  <Link
                    to={"/#"}
                    className={
                      "w-full rounded-lg text-center bg-sky-500 py-2 text-white hover:bg-sky-400"
                    }
                  >
                    Take attendance
                  </Link>
                </div>
              </div>

              <div className={"space-y-5 border border-[#CED8E5] p-5 rounded-xl"}>
                <Title level={4} fontSize={"text-xl"}>
                  STUDENT DETAILS
                </Title>

                <Form form={form} onFinish={onFinish} layout="vertical">
                  <Form.Item name={"search"} label={"Student Name :"}>
                    <CustomInput placeholder={"Search"} classNames={"w-full"} />
                  </Form.Item>

                  <div className={"flex space-x-2.5"}>
                    <ButtonComponent
                      type={"submit"}
                      defaultColor={colorsObject.main}
                      defaultBg={colorsObject.success}
                      defaultHoverBg={colorsObject.successHover}
                      borderRadius={8}
                      className={"w-full"}
                    >
                      Show Details
                    </ButtonComponent>
                    <ButtonComponent
                      type={"submit"}
                      defaultColor={colorsObject.main}
                      defaultBg={colorsObject.secondary}
                      defaultHoverBg={colorsObject.secondaryHover}
                      borderRadius={8}
                      onClick={onReset}
                      className={"w-full"}
                    >
                      Reset
                    </ButtonComponent>
                  </div>
                </Form>
              </div>

              <div className='space-y-5 border border-[#CED8E5] p-5 rounded-xl'>
                <Title level={4} fontSize={"text-xl"} className={"border-b border-b-[#CED8E5]"}>
                  ASSIGNED STUDENTS
                </Title>

                <ul className={"space-y-5"}>
                  <li className="text-xs">KANTETI, ROHAN VARMA</li>
                  <li className="text-xs">KANTETI, ROHAN VARMA</li>
                  <li className="text-xs">KANTETI, ROHAN VARMA</li>
                  <li className="text-xs">KANTETI, ROHAN VARMA</li>
                  <li className="text-xs">KANTETI, ROHAN VARMA</li>
                </ul>
              </div>
            </div>

            <div>
              <div className='space-y-5 border border-[#CED8E5] p-5 rounded-xl'>
                <Title level={4} fontSize={"text-xl"} className={"border-b border-[#CED8E5] pb-2.5"}>
                  UPLOAD FILES
                </Title>

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
            </div>

            <div className="space-y-5 border border-[#CED8E5] p-5 rounded-xl">
              <div className="flex justify-between items-center">
                <div className={"flex items-center space-x-1"}>
                  <IconComponent
                    icon={<IoIosWarning />}
                    className={"text-[#F2994A] pt-1"}
                    iconWidth={"text-[25px]"}
                  />
                  <Title level={4} fontSize={"text-xl text-[#F2994A]"}>
                    Need attention
                  </Title>
                </div>

                <Link to={"/"} className="flex gap-1 items-center text-[#1890FF]">
                  View all
                  <FiChevronRight className="w-5" />
                </Link>
              </div>

              <div className="border border-[#F2994A] p-2.5 rounded-lg">
                <div className="flex justify-between items-center border-b border-[#CED8E5] pb-3">
                  <Title>DRIVING ACTION </Title>

                  <CustomSelect
                    placeholder={"Action"}
                    options={[
                      {
                        value: "smth",
                        label: "smth"
                      }
                    ]}
                    className={"h=[14px]"}
                    selectorBg="#FFEBDB"
                    colorTextPlaceholder={"#F2994A"}
                    colorBorder="#FFEBDB"
                  />
                </div>

                <span className="text-xs pt-3">KANTETI, ROHAN VARMA</span>
                <span className="text-xs text-[#24C18F]">SAT, MAY 11, 10:45 AM - 12:45 PM</span>

                <span className="text-xs text-[#FF000099] pt-5">PASSED 1 days 21 hours 43 minutes ago</span>
              </div>

              <div className="border border-[#F2994A] p-2.5 rounded-lg">
                <div className="flex justify-between items-center border-b border-[#CED8E5] pb-3">
                  <Title>DRIVING ACTION </Title>

                  <CustomSelect
                    placeholder={"Action"}
                    options={[
                      {
                        value: "smth",
                        label: "smth"
                      }
                    ]}
                    className={"h=[14px]"}
                    selectorBg="#FFEBDB"
                    colorTextPlaceholder={"#F2994A"}
                    colorBorder="#FFEBDB"
                  />
                </div>

                <span className="text-xs pt-3">KANTETI, ROHAN VARMA</span>
                <span className="text-xs text-[#24C18F]">SAT, MAY 11, 10:45 AM - 12:45 PM</span>

                <span className="text-xs text-[#FF000099] pt-5">PASSED 1 days 21 hours 43 minutes ago</span>
              </div>

              <div className="border border-[#F2994A] p-2.5 rounded-lg">
                <div className="flex justify-between items-center border-b border-[#CED8E5] pb-3">
                  <Title>DRIVING ACTION </Title>

                  <CustomSelect
                    placeholder={"Action"}
                    options={[
                      {
                        value: "smth",
                        label: "smth"
                      }
                    ]}
                    className={"h=[14px]"}
                    selectorBg="#FFEBDB"
                    colorTextPlaceholder={"#F2994A"}
                    colorBorder="#FFEBDB"
                  />
                </div>

                <span className="text-xs pt-3">KANTETI, ROHAN VARMA</span>
                <span className="text-xs text-[#24C18F]">SAT, MAY 11, 10:45 AM - 12:45 PM</span>

                <span className="text-xs text-[#FF000099] pt-5">PASSED 1 days 21 hours 43 minutes ago</span>
              </div>

              <div className="border border-[#F2994A] p-2.5 rounded-lg">
                <div className="flex justify-between items-center border-b border-[#CED8E5] pb-3">
                  <Title>DRIVING ACTION </Title>

                  <CustomSelect
                    placeholder={"Action"}
                    options={[
                      {
                        value: "smth",
                        label: "smth"
                      }
                    ]}
                    className={"h=[14px]"}
                    selectorBg="#FFEBDB"
                    colorTextPlaceholder={"#F2994A"}
                    colorBorder="#FFEBDB"
                  />
                </div>

                <span className="text-xs pt-3">KANTETI, ROHAN VARMA</span>
                <span className="text-xs text-[#24C18F]">SAT, MAY 11, 10:45 AM - 12:45 PM</span>

                <span className="text-xs text-[#FF000099] pt-5">PASSED 1 days 21 hours 43 minutes ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;
