import ButtonComponent, { IconComponent } from "@/components/button/index.jsx";
import { CustomCheckBox } from "@/components/form/index.jsx";
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
    </Fragment>
  );
};

export default Components;
