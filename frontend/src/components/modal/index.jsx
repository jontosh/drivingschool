import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { ExclamationCircleFilled } from "@ant-design/icons";
import classNames from "classnames";
import { useContext, useMemo } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { MdClose, MdErrorOutline } from "react-icons/md";
import ModalStyle from "./modal.module.scss";
import { Form, Modal as ModalComponent, Steps } from "antd";

const Modal = ({ className, setIsOpen, children }) => {
  className = classNames(className, ModalStyle["Modal"]);
  const handleClick = (e) => {
    if (e.target.dataset.modal) {
      setIsOpen(false);
    }
  };

  return (
    <div
      data-modal={true}
      onClick={handleClick}
      className={`fixed flex items-center justify-center flex-col top-0 left-0 z-20 w-full h-full ${className}`}
    >
      {children}
    </div>
  );
};

export const ModalSuccess = ({ title, open, onEvent, footer }) => {
  return (
    <ModalComponent
      title={title}
      centered
      open={open}
      onOk={onEvent}
      onCancel={onEvent}
      footer={footer}
    >
      <div className="bg-white max-w-[490px] w-full px-10 py-8 text-center">
        <div className="relative mb-6">
          <span className="block w-14 p-1.5 bg-[#24C18F] mx-auto text-white rounded-lg">
            <CiCircleCheck className={"text-3xl"} />
          </span>
        </div>

        <Title
          fontSize={"text-3xl"}
          titleMarginBottom={8}
          fontWeightStrong={600}
        >
          Successfully !
        </Title>

        <Paragraph fontWeightStrong={400} fontSize={"text-xs text-[#54595E99]"}>
          Malesuada tellus tincidunt fringilla enim, id mauris. Id etiam nibh
          suscipit aliquam dolor. Nunc sit nunc aliquet justo, facilisi leo.
          Nulla a eget tincidunt integer orci.
        </Paragraph>
      </div>
    </ModalComponent>
  );
};

export const ModalError = ({ title, open, onEvent, footer, data = {} }) => {
  const items = useMemo(() => {
    return Object.values(data).map((item) => ({ title: item[0] }));
  }, [data]);

  return (
    <ModalComponent
      title={title}
      centered
      open={open}
      onOk={onEvent}
      onCancel={onEvent}
      footer={footer}
    >
      <div className="bg-white max-w-[490px] w-full px-10 py-8 text-center">
        <div className="relative mb-6">
          <span className="block w-14 p-1.5 bg-[#FF333F] mx-auto text-white rounded-lg">
            <MdErrorOutline className="text-3xl" />
          </span>
        </div>

        <Title fontSize="text-3xl" titleMarginBottom={8} fontWeightStrong={600}>
          Error!
        </Title>

        <Steps progressDot direction="vertical" items={items} />
      </div>
    </ModalComponent>
  );
};

export const ModalConfirm = ({ title, onOk, onCancel, footer, open }) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <ModalComponent
      title={title}
      centered
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
    >
      <div className="bg-white max-w-[490px] w-full px-10 py-8 text-center">
        <div className="relative mb-6">
          <Title
            fontSize={"text-3xl"}
            titleMarginBottom={8}
            fontWeightStrong={600}
          >
            Are you sure?
          </Title>

          <Paragraph
            fontWeightStrong={400}
            fontSize={"text-xs text-[#54595E99]"}
          >
            You won't be able to revert this!
          </Paragraph>
        </div>

        <div className="space-x-4">
          <ButtonComponent
            defaultHoverColor={colorsObject.dangerHover}
            defaultColor={colorsObject.danger}
            defaultHoverBorderColor={colorsObject.dangerHover}
            defaultBorderColor={colorsObject.danger}
            borderRadius={5}
            paddingInline={43}
            onClick={onCancel}
          >
            No, cancel
          </ButtonComponent>
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            borderRadius={5}
            paddingInline={43}
            onClick={onOk}
          >
            Yes, confirm
          </ButtonComponent>
        </div>
      </div>
    </ModalComponent>
  );
};

export const ModalEdit = ({
  title,
  onOk,
  onCancel,
  footer,
  children,
  form,
  onFinish,
  open,
}) => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <ModalComponent
      title={title}
      centered
      open={open}
      onCancel={onCancel}
      footer={footer}
      className={"space-y-5"}
    >
      <Title fontSize={"text-3xl"} titleMarginBottom={8} fontWeightStrong={600}>
        Edit
      </Title>

      <Form
        form={form}
        onFinish={onFinish}
        className={"space-y-5"}
        layout={"vertical"}
      >
        {children}

        <div className="space-x-4">
          <ButtonComponent
            defaultBg={colorsObject.success}
            defaultHoverBg={colorsObject.successHover}
            borderRadius={5}
            paddingInline={43}
            onClick={onOk}
            type={"submit"}
          >
            SAVE
          </ButtonComponent>

          <ButtonComponent
            defaultHoverColor={colorsObject.dangerHover}
            defaultColor={colorsObject.danger}
            defaultHoverBorderColor={colorsObject.dangerHover}
            defaultBorderColor={colorsObject.danger}
            borderRadius={5}
            paddingInline={43}
            onClick={onCancel}
          >
            CLOSE
          </ButtonComponent>
        </div>
      </Form>
    </ModalComponent>
  );
};

export default Modal;
