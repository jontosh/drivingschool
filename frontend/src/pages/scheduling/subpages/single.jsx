import { SingleTableCalendar } from "@/pages/scheduling/calendar/single-table-calendar.jsx";
import { Fragment, useContext, useState } from "react";
import DashboardStyle from "../../dashboard/dashboard.module.scss";
import TeacherAvatar from "../../../assets/user/teacher.jpeg";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ButtonComponent from "@/components/button";
import SingleStyle from "../scheduling.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import Modal from "@/components/modal/index.jsx";
import { CustomCheckBox, CustomInput, CustomSelect } from "@/components/form";
import ColorsContext from "@/context/colors.jsx";

export const Single = () => {
  const [IsPrintOpen, setIsPrintOpen] = useState(false);
  const [IsExportOpen, setIsExportOpen] = useState(false);
  const [IsInstructorOpen, setIsInstructorOpen] = useState(false);
  const { colorsObject } = useContext(ColorsContext);

  const handlePrintModal = () => setIsPrintOpen((prev) => !prev);
  const handleExportModal = () => setIsExportOpen((prev) => !prev);
  const handleInstructortModal = () => setIsInstructorOpen((prev) => !prev);
  return (
    <Fragment>
      <div className={"bg-white rounded-xl overflow-hidden"}>
        <div
          className={`${DashboardStyle["Dashboard__teachers"]} ${SingleStyle["Single__shadow"]} p-5 w-full`}
        >
          <div className="flex items-center pt-1 pb-10">
            <Title
              fontSize={"text-base"}
              fontWeightStrong={500}
              className={"w-24"}
            >
              Teachers
            </Title>
            <label className={`relative`}>
              <input
                // value={values.search}
                type={"text"}
                name={"search"}
                // onChange={handleChange}
                // onBlur={handleBlur}
                placeholder={"Find teacher"}
                className={`${DashboardStyle["Dashboard__form-input"]} rounded-lg inline-block outline-0 px-12 py-2.5 bg-white border-2`}
              />

              <span
                className={`absolute w-4 h-4 left-4 ${DashboardStyle["Dashboard__form-search"]}`}
              >
                <AiOutlineSearch />
              </span>
            </label>
          </div>
          {/* <DashboardTeachers /> */}
          <div
            className={`${DashboardStyle["Dashboard__teachers-list"]} px-6 grid grid-cols-9 gap-x-14 pb-10`}
          >
            {/*Teacher Avatar Start*/}
            <div
              className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
              onClick={handleInstructortModal}
            >
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} border-2 border-[#FECB21] mb-5 h-20 overflow-hidden rounded-full`}
              >
                <Image
                  src={TeacherAvatar}
                  srcSet={TeacherAvatar}
                  alt={"Teacher Avatar"}
                />
              </div>
              <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                Instructor 1
              </Title>
            </div>
            {/*Teacher Avatar end*/}

            {/*Teacher Avatar Start*/}
            <div
              className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
              onClick={handleInstructortModal}
            >
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
              >
                <Image
                  src={TeacherAvatar}
                  srcSet={TeacherAvatar}
                  alt={"Teacher Avatar"}
                />
              </div>
              <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                Instructor 1
              </Title>
            </div>
            {/*Teacher Avatar end*/}

            {/*Teacher Avatar Start*/}
            <div
              className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
              onClick={handleInstructortModal}
            >
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
              >
                <Image
                  src={TeacherAvatar}
                  srcSet={TeacherAvatar}
                  alt={"Teacher Avatar"}
                />
              </div>
              <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                Instructor 1
              </Title>
            </div>
            {/*Teacher Avatar end*/}

            {/*Teacher Avatar Start*/}
            <div
              className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
              onClick={handleInstructortModal}
            >
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
              >
                <Image
                  src={TeacherAvatar}
                  srcSet={TeacherAvatar}
                  alt={"Teacher Avatar"}
                />
              </div>
              <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                Instructor 1
              </Title>
            </div>
            {/*Teacher Avatar end*/}

            {/*Teacher Avatar Start*/}
            <div
              className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
              onClick={handleInstructortModal}
            >
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
              >
                <Image
                  src={TeacherAvatar}
                  srcSet={TeacherAvatar}
                  alt={"Teacher Avatar"}
                />
              </div>
              <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                Instructor 1
              </Title>
            </div>
            {/*Teacher Avatar end*/}

            {/*Teacher Avatar Start*/}
            <div
              className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
              onClick={handleInstructortModal}
            >
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
              >
                <Image
                  src={TeacherAvatar}
                  srcSet={TeacherAvatar}
                  alt={"Teacher Avatar"}
                />
              </div>
              <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                Instructor 1
              </Title>
            </div>
            {/*Teacher Avatar end*/}

            {/*Teacher Avatar Start*/}
            <div
              className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
              onClick={handleInstructortModal}
            >
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
              >
                <Image
                  src={TeacherAvatar}
                  srcSet={TeacherAvatar}
                  alt={"Teacher Avatar"}
                />
              </div>
              <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                Instructor 1
              </Title>
            </div>
            {/*Teacher Avatar end*/}

            {/*Teacher Avatar Start*/}
            <div
              className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
              onClick={handleInstructortModal}
            >
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
              >
                <Image
                  src={TeacherAvatar}
                  srcSet={TeacherAvatar}
                  alt={"Teacher Avatar"}
                />
              </div>
              <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                Instructor 1
              </Title>
            </div>
            {/*Teacher Avatar end*/}

            {/*Teacher Avatar Start*/}
            <div
              className={`${DashboardStyle["Dashboard__teachers-list__item"]} w-20 cursor-pointer`}
              onClick={handleInstructortModal}
            >
              <div
                className={`${DashboardStyle["Dashboard__teachers-list__item-imageholder"]} mb-5 h-20 overflow-hidden rounded-full`}
              >
                <Image
                  src={TeacherAvatar}
                  srcSet={TeacherAvatar}
                  alt={"Teacher Avatar"}
                />
              </div>
              <Title fontSize={"text-base"} level={5} fontWeightStrong={500}>
                Instructor 1
              </Title>
            </div>
            {/*Teacher Avatar end*/}
          </div>
        </div>
        <div className="flex pt-5">
          <div className="p-5">
            <div className="flex flex-col gap-6 w-64">
              <span className="font-medium text-lg">Locations</span>
              <ButtonComponent
                controlHeight={40}
                borderRadius={10}
                defaultBg="transparent"
                defaultBorderColor="#5F66E9"
                defaultColor="#000000"
                defaultHoverColor="#000000"
                className={"w-full font-medium"}
              >
                Mason
              </ButtonComponent>
              <ButtonComponent
                controlHeight={40}
                borderRadius={10}
                defaultBg="transparent"
                defaultBorderColor="#5F66E9"
                defaultColor="#000000"
                defaultHoverColor="#000000"
                className={"w-full font-medium"}
              >
                Ohio
              </ButtonComponent>
              <ButtonComponent
                controlHeight={40}
                borderRadius={10}
                defaultBg="transparent"
                defaultBorderColor="#5F66E9"
                defaultColor="#000000"
                defaultHoverColor="#000000"
                className={"w-full font-medium"}
              >
                New York
              </ButtonComponent>
            </div>
            <div className="flex flex-col gap-6 w-64 pt-6">
              <span className="font-medium text-lg">Menu</span>
              <ButtonComponent
                controlHeight={40}
                borderRadius={10}
                defaultBg="#24C18F"
                defaultHoverBg="#24C18F"
                defaultColor="#FFFFFF"
                defaultHoverColor="#FFFFFF"
                className={"w-full font-medium"}
                onClick={handlePrintModal}
              >
                Print
              </ButtonComponent>
              <ButtonComponent
                controlHeight={40}
                borderRadius={10}
                defaultBg="#24C18F"
                defaultHoverBg="#24C18F"
                defaultColor="#FFFFFF"
                defaultHoverColor="#FFFFFF"
                className={"w-full font-medium"}
                onClick={handleExportModal}
              >
                Export
              </ButtonComponent>
              <ButtonComponent
                controlHeight={40}
                borderRadius={10}
                defaultBg="#24C18F"
                defaultHoverBg="#24C18F"
                defaultColor="#FFFFFF"
                defaultHoverColor="#FFFFFF"
                className={"w-full font-medium"}
              >
                Create appointment
              </ButtonComponent>
            </div>
            <div className="flex flex-col gap-6 w-64 pt-6">
              <span className="font-medium text-lg">Menu</span>
              <ButtonComponent
                controlHeight={40}
                borderRadius={10}
                defaultBg="#24C18F"
                defaultHoverBg="#24C18F"
                defaultColor="#FFFFFF"
                defaultHoverColor="#FFFFFF"
                className={"w-full font-medium"}
              >
                Add slot 1 h
              </ButtonComponent>
              <ButtonComponent
                controlHeight={40}
                borderRadius={10}
                defaultBg="#24C18F"
                defaultHoverBg="#24C18F"
                defaultColor="#FFFFFF"
                defaultHoverColor="#FFFFFF"
                className={"w-full font-medium"}
              >
                Add slot 2h
              </ButtonComponent>
              <ButtonComponent
                controlHeight={40}
                borderRadius={10}
                defaultBg="#24C18F"
                defaultHoverBg="#24C18F"
                defaultColor="#FFFFFF"
                defaultHoverColor="#FFFFFF"
                className={"w-full font-medium"}
              >
                Turn off
              </ButtonComponent>
              <ButtonComponent
                controlHeight={40}
                borderRadius={10}
                defaultBg="#24C18F"
                defaultHoverBg="#24C18F"
                defaultColor="#FFFFFF"
                defaultHoverColor="#FFFFFF"
                className={"w-full font-medium"}
              >
                Trash
              </ButtonComponent>
            </div>
          </div>
          <div className={"flex-shrink-0 flex-grow"}>
            <SingleTableCalendar />
          </div>
        </div>
      </div>
      {IsPrintOpen && (
        <Modal setIsOpen={setIsPrintOpen}>
          <div className={`${SingleStyle["Single__modal"]} bg-white py-9 px-12 w-full rounded-2xl overflow-scroll m-2.5`}>
            <Title
              level={2}
              fontSize={"text-indigo-600 text-4xl"}
              fontWeightStrong={600}
              titleMarginBottom={30}
            >
              Print Scheduling
            </Title>
            <form className="flex flex-col gap-7">
              <CustomCheckBox className={"text-base font-semibold"}>
                Month
              </CustomCheckBox>
              <CustomCheckBox className={"text-base font-semibold"}>
                Week
              </CustomCheckBox>
              <div className="flex gap-5 justify-center">
                <ButtonComponent
                  controlHeight={40}
                  borderRadius={10}
                  defaultBg="#24C18F"
                  defaultHoverBg="#24C18F"
                  defaultColor="#FFFFFF"
                  defaultHoverColor="#FFFFFF"
                  className={"font-medium"}
                  style={{ width: 234 }}
                >
                  Print
                </ButtonComponent>
                <ButtonComponent
                  controlHeight={40}
                  borderRadius={10}
                  defaultBg="transparent"
                  defaultBorderColor="#5F66E9"
                  defaultColor="#000000"
                  defaultHoverColor="#000000"
                  className={"font-medium"}
                  style={{ width: 234 }}
                  onClick={handlePrintModal}
                >
                  Close
                </ButtonComponent>
              </div>
            </form>
          </div>
        </Modal>
      )}
      {IsExportOpen && (
        <Modal setIsOpen={setIsExportOpen}>
          <div className={`${SingleStyle["Single__modal"]} bg-white py-10 px-12 w-full rounded-2xl overflow-scroll m-2.5`}>
            <Title
              level={2}
              fontSize={"text-indigo-600 text-4xl"}
              fontWeightStrong={600}
              titleMarginBottom={30}
            >
              Print Scheduling
            </Title>
            <form className="flex flex-col gap-7">
              <label className="w-44 grid grid-cols-2 gap-y-7 justify-center">
                <CustomCheckBox
                  className={"text-base font-semibold"}
                >
                  PSD
                </CustomCheckBox>
                <CustomCheckBox className={"text-base font-semibold"}>
                  JPG
                </CustomCheckBox>
                <CustomCheckBox
                  className={"text-base font-semibold"}
                >
                  txt
                </CustomCheckBox>
                <CustomCheckBox className={"text-base font-semibold"}>
                  Word
                </CustomCheckBox>
              </label>
              <div className="flex gap-5 justify-center">
                <ButtonComponent
                  controlHeight={40}
                  borderRadius={10}
                  defaultBg="#24C18F"
                  defaultHoverBg="#24C18F"
                  defaultColor="#FFFFFF"
                  defaultHoverColor="#FFFFFF"
                  className={"font-medium"}
                  style={{ width: 234 }}
                >
                  Print
                </ButtonComponent>
                <ButtonComponent
                  controlHeight={40}
                  borderRadius={10}
                  defaultBg="transparent"
                  defaultBorderColor="#5F66E9"
                  defaultColor="#000000"
                  defaultHoverColor="#000000"
                  className={"font-medium"}
                  style={{ width: 234 }}
                  onClick={handleExportModal}
                >
                  Close
                </ButtonComponent>
              </div>
            </form>
          </div>
        </Modal>
      )}
      {IsInstructorOpen && (
        <Modal setIsOpen={IsInstructorOpen}>
          <div className={`${SingleStyle["Single__modal-instructor"]} bg-white py-2.5 px-7 w-full rounded-2xl overflow-scroll m-2.5`}>
            <span className="font-medium text-base">Instuctor name: Karina Park</span>
            <form className="flex flex-col gap-7 pt-10">
              <CustomInput
                spanText={"Student name"}
                spanClassName={"w-40 font-medium text-base"}
                placeholder={"Find Student"}
                classNames={"flex flex-row-reverse gap-2.5 items-center h-[50px]"}
                className={"shadow-xl"}
              />

              <label className="flex items-center gap-5">
                <span className="font-medium text-base">Date</span>
                <CustomInput
                  spanText={"Start date"}
                  placeholder={"MM/DD/YYYY"}
                  classNames={"h-10 shadow-xl h-[50px]"}
                />
                <CustomInput
                  spanText={"End date"}
                  placeholder={"MM/DD/YYYY"}
                  classNames={"h-10 shadow-xl h-[50px]"}
                />
              </label>

              <label className="flex items-center gap-5 pt-3">
                <span className="font-medium text-base">Pick up location</span>
                <CustomSelect
                  colorBorder={colorsObject.primary}
                  className={"shadow-xl w-[94px] h-[50px]"}
                  placeholder={"Home"}
                  options={[
                    {
                      value: 1,
                      label: 1,
                    },
                  ]}
                />
              </label>

              <textarea
                className="border border-blue-500 outline-none w-full p-3"
                placeholder="Notes..."
                style={{
                  borderRadius: 10,
                  height: 123
                }}
              ></textarea>

              <div className="flex gap-5 justify-center">
                <ButtonComponent
                  controlHeight={40}
                  borderRadius={10}
                  defaultBg="#24C18F"
                  defaultHoverBg="#3CE3AE"
                  defaultColor="#FFFFFF"
                  className={"font-medium"}
                  style={{ width: 125 }}
                >
                  save
                </ButtonComponent>
                <ButtonComponent
                  controlHeight={40}
                  borderRadius={10}
                  defaultBg="transparent"
                  defaultBorderColor="#5F66E9"
                  defaultColor="#000000"
                  defaultHoverColor="#000000"
                  className={"font-medium"}
                  style={{ width: 125 }}
                  onClick={handleInstructortModal}
                >
                  Delete
                </ButtonComponent>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};
