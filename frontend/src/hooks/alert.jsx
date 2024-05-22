import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import Modal from "@/components/modal/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";

export const AlertSuccess = () => {
  const [IsOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen((prev) => !prev);

  return (
    <Fragment>
      {IsOpen && (
        <Modal setIsOpen={setIsOpen}>
          <div className="bg-white max-w-[490px] w-full px-10 py-8 text-center">
            <div className="relative mb-6">
              <span className="block w-14 p-1.5 bg-[#24C18F] mx-auto text-white rounded-lg">
                <CiCircleCheck className={"text-3xl"} />
              </span>

              <IconComponent
                onClick={handleClose}
                icon={<MdClose />}
                className={
                  "absolute -top-3 -right-3 rounded-full p-2 bg-[#E5E5E5] inline-flex items-center"
                }
              />
            </div>

            <Title
              fontSize={"text-3xl"}
              titleMarginBottom={8}
              fontWeightStrong={600}
            >
              Successfully !
            </Title>

            <Paragraph
              fontWeightStrong={400}
              fontSize={"text-xs text-[#54595E99]"}
            >
              Malesuada tellus tincidunt fringilla enim, id mauris. Id etiam
              nibh suscipit aliquam dolor. Nunc sit nunc aliquet justo, facilisi
              leo. Nulla a eget tincidunt integer orci.
            </Paragraph>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export const AlertError = () => {
  const [IsOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen((prev) => !prev);

  return (
    <Fragment>
      {IsOpen && (
        <Modal setIsOpen={setIsOpen}>
          <div className="bg-white max-w-[490px] w-full px-10 py-8 text-center">
            <div className="relative mb-6">
              <span className="block w-14 p-1.5 bg-[#FF333F] mx-auto text-white rounded-lg">
                <MdErrorOutline className={"text-3xl"} />
              </span>

              <IconComponent
                onClick={handleClose}
                icon={<MdClose />}
                className={
                  "absolute -top-3 -right-3 rounded-full p-2 bg-[#E5E5E5] inline-flex items-center"
                }
              />
            </div>

            <Title
              fontSize={"text-3xl"}
              titleMarginBottom={8}
              fontWeightStrong={600}
            >
              Error !
            </Title>

            <Paragraph
              fontWeightStrong={400}
              fontSize={"text-xs text-[#54595E99]"}
            >
              Malesuada tellus tincidunt fringilla enim, id mauris. Id etiam
              nibh suscipit aliquam dolor. Nunc sit nunc aliquet justo, facilisi
              leo. Nulla a eget tincidunt integer orci.
            </Paragraph>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};
export const AlertDelete = () => {
  const [IsOpen, setIsOpen] = useState(true);
  const [Confirm, setConfirm] = useState(false);
  const { colorsObject } = useContext(ColorsContext);
  const handleClose = () => setIsOpen((prev) => !prev);

  return (
    <Fragment>
      {IsOpen && (
        <Modal setIsOpen={setIsOpen}>
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

              <IconComponent
                onClick={handleClose}
                icon={<MdClose />}
                className={
                  "absolute -top-3 -right-3 rounded-full p-2 bg-[#E5E5E5] inline-flex items-center"
                }
              />
            </div>

            <div className="space-x-4">
              <ButtonComponent
                defaultHoverColor={colorsObject.dangerHover}
                defaultColor={colorsObject.danger}
                defaultHoverBorderColor={colorsObject.dangerHover}
                defaultBorderColor={colorsObject.danger}
                borderRadius={5}
                paddingInline={43}
                onClick={() => setConfirm(false)}
              >
                No, cancel
              </ButtonComponent>
              <ButtonComponent
                defaultBg={colorsObject.success}
                defaultHoverBg={colorsObject.successHover}
                borderRadius={5}
                paddingInline={43}
                onClick={() => setConfirm(true)}
              >
                Yes, confirm
              </ButtonComponent>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};
