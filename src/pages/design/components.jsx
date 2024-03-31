import ButtonComponent, { IconComponent } from "@/components/button/index.jsx";
import { CustomInput, CustomCheckBox, CustomSelect } from "@/components/form/index.jsx";
import { Icons } from "@/components/icons/index.jsx";
import Title, { Paragraph, Text } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Checkbox, Pagination, Typography } from "antd";
import { Fragment, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import {
  AiOutlineApartment,
  AiOutlineAppstore,
  AiOutlineCloudUpload,
  AiOutlineEye,
  AiOutlineHistory,
  AiOutlineInfoCircle,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineReconciliation,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineShoppingCart,
  AiOutlineSolution,
  AiOutlineTeam,
  AiOutlineTool,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import { IoCarOutline } from "react-icons/io5";
import { LuBellRing, LuFileInput } from "react-icons/lu";
import { PiCalendarDuotone, PiCopyLight, PiMoney } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscGraph } from "react-icons/vsc";
import { WiTime5 } from "react-icons/wi";
import DesignStyle from "./design.module.scss";

const options = [
  { value: '', label: '' },
  { value: '', label: '' },
  { value: '', label: '' },
  { value: '', label: '' },
  { value: '', label: '' },
  { value: '', label: '' }
]

const Components = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [Current, setCurrent] = useState(1);
  const handleChangePagination = (page) => {
    setCurrent(page);
  };

  return (
    <Fragment>
      <Helmet>
        <title>UI KIT Components</title>
      </Helmet>
      <Typography.Title>Buttons</Typography.Title>
      <div className="flex gap-1 flex-wrap mb-3">
        <ButtonComponent
          defaultHoverBg={colorsObject.primary}
          defaultBg={colorsObject.primary}
          paddingInline={47}
        >
          Button color Primary {colorsObject.primary}
        </ButtonComponent>

        <ButtonComponent
          defaultHoverBg={"#24C18F"}
          defaultBg={"#24C18F"}
          paddingInline={47}
        >
          Button
        </ButtonComponent>

        <ButtonComponent
          defaultHoverBg={colorsObject.danger}
          defaultBg={colorsObject.danger}
          paddingInline={47}
        >
          Button color danger {colorsObject.danger}
        </ButtonComponent>

        <ButtonComponent
          defaultHoverBg={colorsObject.orange}
          defaultBg={colorsObject.orange}
          paddingInline={47}
        >
          Button color Orange {colorsObject.orange}
        </ButtonComponent>

        <ButtonComponent
          defaultHoverBg={colorsObject.info}
          defaultBg={colorsObject.info}
          paddingInline={47}
        >
          Button color Info {colorsObject.info}
        </ButtonComponent>

        <ButtonComponent
          defaultHoverBg={colorsObject.secondary}
          defaultBg={colorsObject.secondary}
          paddingInline={47}
        >
          Button color secondary {colorsObject.secondary}
        </ButtonComponent>

        <ButtonComponent
          defaultHoverBg={colorsObject.main}
          defaultBg={colorsObject.main}
          defaultBorderColor={colorsObject.primary}
          defaultColor={colorsObject.primary}
          defaultHoverColor={colorsObject.primary}
          paddingInline={47}
        >
          Button color secondary {colorsObject.secondary}
        </ButtonComponent>

        <ButtonComponent
          defaultColor={"#3366FF"}
          defaultHoverColor={"#3366FF"}
          paddingInline={47}
          defaultBorderColor={"#5F66E9"}
          defaultHoverBorderColor={"#5F66E9"}
        >
          Button reset
        </ButtonComponent>
      </div>

      <Typography.Title>Icons</Typography.Title>

      <div className={`flex gap-2 flex-wrap mb-3`}>
        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineAppstore />}
        >
          AiOutlineAppstore
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineUserAdd />}
        >
          AiOutlineUserAdd
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineSearch />}
        >
          AiOutlineSearch
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineTeam />}
        >
          AiOutlineTeam
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineSolution />}
        >
          AiOutlineSolution
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineMail />}
        >
          AiOutlineMail
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineReconciliation />}
        >
          AiOutlineReconciliation
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineApartment />}
        >
          AiOutlineApartment
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineSetting />}
        >
          AiOutlineSetting
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineTool />}
        >
          AiOutlineTool
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineEye />}
        >
          AiOutlineEye
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4 ${DesignStyle["Icon-wrapper"]}`}
          icon={<Icons type={"write-f"} className={DesignStyle["Icon"]} />}
        >
          AiOutlineEye
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineCloudUpload />}
        >
          AiOutlineCloudUpload
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<BsPhone />}
        >
          BsPhone
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<WiTime5 />}
        >
          WiTime5
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlinePhone />}
        >
          AiOutlinePhone
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineHistory />}
        >
          AiOutlineHistory
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineInfoCircle />}
        >
          AiOutlineInfoCircle
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<AiOutlineShoppingCart />}
        >
          AiOutlineShoppingCart
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<PiMoney />}
        >
          PiMoney
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<IoCarOutline />}
        >
          IoCarOutline
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<FiFileText />}
        >
          FiFileText
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<VscGraph />}
        >
          VscGraph
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<LuBellRing />}
        >
          LuBellRing
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<LuFileInput />}
        >
          LuFileInput
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<PiCalendarDuotone />}
        >
          PiCalendarDuotone
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<RiDeleteBin6Line />}
        >
          RiDeleteBin6Line
        </IconComponent>

        <IconComponent
          defaultHoverColor={colorsObject.primary}
          className={`space-x-4`}
          icon={<PiCopyLight />}
        >
          PiCopyLight
        </IconComponent>
      </div>

      <Typography.Title>Pagination</Typography.Title>

      <div className="mb-3">
        <Pagination
          total={50}
          pageSize={2}
          current={Current}
          onChange={handleChangePagination}
        />
      </div>

      <Typography.Title>Typography</Typography.Title>

      <div className="mb-3 space-y-2">
        <Title level={1} fontWeightStrong={400} fontSize={"text-3xl"}>
          Title level - 1 text-3xl
        </Title>
        <Title level={2} fontWeightStrong={400} fontSize={"text-2xl"}>
          Title level - 2 text-2xl
        </Title>
        <Title level={3} fontWeightStrong={400} fontSize={"text-xl"}>
          Title level - 3 text-xl
        </Title>
        <Title level={4} fontWeightStrong={400} fontSize={"text-lg"}>
          Title level - 4 text-lg
        </Title>
        <Title level={5} fontWeightStrong={400} fontSize={"text-base"}>
          Title level - 5 text-base
        </Title>

        <Paragraph fontSize={"text-sm"}>Paragraph - text-sm</Paragraph>
        <Paragraph fontSize={"text-xs"}>Paragraph - text-xs</Paragraph>

        <Text>Text</Text>
      </div>

      <Typography.Title>CheckBox</Typography.Title>

      <div className="flex gap-2 mb-3">
        <Checkbox.Group>
          <Checkbox value={"checkbox"}>Checkbox</Checkbox>
        </Checkbox.Group>

        <CustomCheckBox>Custom CheckBox</CustomCheckBox>
      </div>
      <div className={" flex flex-col gap-3 mb-3"}>
        <Typography.Title>
          Input
        </Typography.Title>
        <div className={"flex gap-2 items-center"}>
          <CustomInput
            size={"medium"}
            className={"w-96"}
          />
          <Title level={2}>
            Default
          </Title>
        </div>
        <div className={"flex gap-2 items-center"}>
          <CustomInput
            size={"medium"}
            className={"w-96"}
          />
          <Title level={2}>
            Hover
          </Title>
        </div>
        <div className={"flex gap-2 items-center"}>
          <CustomInput
            size={"medium"}
            placeholder={"Something..."}
            className={"w-96"}
          />
          <Title level={2}>
            Active
          </Title>
        </div>
        <div className={"flex gap-2 items-center"}>
          <CustomInput
            size={"medium"}
            status={"error"}
            className={"w-96"}
            spanText={"Error input is wrong"}
          />
          <Title level={2}>
            Error
          </Title>
        </div>
      </div>
      <div className={"flex flex-col gap-3 mb-3"}>
        <Typography.Title>
          Select
        </Typography.Title>
        <div>
          <CustomSelect
            options={options}
            placeholder={"Select"}
            className={"w-96 bor"}
          />
        </div>
      </div>
      <div className={"mb-3 flex flex-col gap-4"}>
        <Typography.Title>
          Buttons
        </Typography.Title>
        <div className={"flex items-center gap-4"}>
          <ButtonComponent
              defaultBg={"#1890FF"}
              defaultHoverBg={"#1890FF"}
              paddingInline={30}
              controlHeight={39}
          >
            Edit Appointments
          </ButtonComponent>
          <Title level={2}>
            Default
          </Title>
          <ButtonComponent
              defaultBg={"#24C18F"}
              defaultHoverBg={"#24C18F"}
              paddingInline={30}
              controlHeight={39}
          >
            Export
          </ButtonComponent>
          <ButtonComponent
              defaultBg={"#FF333F"}
              defaultHoverBg={"#FF333F"}
              paddingInline={30}
              controlHeight={39}
          >
            Edit Appointments
          </ButtonComponent>
        </div>
        <div className={"flex items-center gap-4"}>
          <ButtonComponent
              defaultBg={"#4BA9FF"}
              defaultHoverBg={"#4BA9FF"}
              paddingInline={30}
              controlHeight={39}
          >
            Edit Appointments
          </ButtonComponent>
          <Title level={2}>
            Hover
          </Title>
          <ButtonComponent
              defaultBg={"#3CE3AE"}
              defaultHoverBg={"#3CE3AE"}
              paddingInline={30}
              controlHeight={39}
          >
            Export
          </ButtonComponent>
          <ButtonComponent
              defaultBg={"#FF7179"}
              defaultHoverBg={"#FF7179"}
              paddingInline={30}
              controlHeight={39}
          >
            Delete appointments
          </ButtonComponent>
        </div>
        <div className={"flex items-center gap-4"}>
          <ButtonComponent
              defaultBg={"#1890FF"}
              defaultHoverBg={"#1890FF"}
              paddingInline={30}
              controlHeight={39}
          >
            Edit Appointments
          </ButtonComponent>
          <Title level={2}>
            Active
          </Title>
          <ButtonComponent
              defaultBg={"#24C18F"}
              defaultHoverBg={"#24C18F"}
              paddingInline={30}
              controlHeight={39}
          >
            Export
          </ButtonComponent>
          <ButtonComponent
              defaultBg={"#FF333F"}
              defaultHoverBg={"#FF333F"}
              paddingInline={30}
              controlHeight={39}
          >
            Delete appointments
          </ButtonComponent>
        </div>
        <div className={"flex items-center gap-4"}>
          <ButtonComponent
              disabled={"disabled"}
              defaultBg={"CFE8FF"}
              defaultColor={"#000000"}
              paddingInline={30}
              controlHeight={39}
          >
            Edit Appointments
          </ButtonComponent>
          <Title level={2}>
            Disable
          </Title>
          <ButtonComponent
              disabled={"disabled"}
              defaultBg={"#24C18F"}
              defaultHoverBg={"#24C18F"}
              paddingInline={30}
              controlHeight={39}
          >
            Export
          </ButtonComponent>
          <ButtonComponent
              disabled={"disabled"}
              defaultBg={"#FFB7BB"}
              paddingInline={30}
              controlHeight={39}
          >
            Delete appointments
          </ButtonComponent>
        </div>
        <div className={"flex gap-4 pt-5"}>
          <div className={"flex flex-col gap-3 text-center"}>
            <Title level={1}>
              Default
            </Title>
            <ButtonComponent
                controlHeight={39}
                defaultBg={"#00000040"}
                defaultHoverBg={"#00000040"}
                paddingInline={60}
            >
              Close
            </ButtonComponent>
            <ButtonComponent
                controlHeight={39}
                defaultBg={"#FFFFFF"}
                defaultHoverBg={"#FFFFFF"}
                defaultColor={"#5F66E9"}
                defaultHoverColor={"#5F66E9"}
                defaultBorderColor={"#5F66E9"}
                paddingInline={60}
            >
              Reset
            </ButtonComponent>
          </div>
          <div className={"flex flex-col gap-3 text-center"}>
            <Title level={1}>
              Hover
            </Title>
            <ButtonComponent
                controlHeight={39}
                defaultBg={"#5F5F5F40"}
                defaultHoverBg={"#5F5F5F40"}
                paddingInline={60}
            >
              Close
            </ButtonComponent>
            <ButtonComponent
                controlHeight={39}
                defaultBg={"#FFFFFF"}
                defaultHoverBg={"#FFFFFF"}
                defaultColor={"#000CEF"}
                defaultHoverColor={"#000CEF"}
                defaultBorderColor={"#000CEF"}
                paddingInline={60}
            >
              Reset
            </ButtonComponent>
          </div>
          <div className={"flex flex-col gap-3 text-center"}>
            <Title level={1}>
              Active
            </Title>
            <ButtonComponent
                controlHeight={39}
                defaultBg={"#BFBFBF"}
                defaultHoverBg={"#BFBFBF"}
                paddingInline={60}
            >
              Close
            </ButtonComponent>
            <ButtonComponent
                controlHeight={39}
                defaultBg={"#FFFFFF"}
                defaultHoverBg={"#FFFFFF"}
                defaultColor={"#5F66E9"}
                defaultHoverColor={"#5F66E9"}
                defaultBorderColor={"#5F66E9"}
                paddingInline={60}
            >
              Reset
            </ButtonComponent>
          </div>
          <div className={"flex flex-col gap-3 text-center"}>
            <Title level={1}>
              Disable
            </Title>
            <ButtonComponent
                disabled={"disabled"}
                controlHeight={39}
                defaultBg={"#5F5F5F40"}
                defaultHoverBg={"#5F5F5F40"}
                paddingInline={60}
            >
              Close
            </ButtonComponent>
            <ButtonComponent
                disabled={"disabled"}
                controlHeight={39}
                paddingInline={60}
            >
              Reset
            </ButtonComponent>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Components;
