import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import classNames from "classnames";
import { useMemo } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { MdClose, MdErrorOutline } from "react-icons/md";
import ModalStyle from "./modal.module.scss";
import { Modal as ModalComponent, Steps } from "antd";

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

export default Modal;
