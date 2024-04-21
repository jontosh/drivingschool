import { SingleTableCalendar } from "@/pages/scheduling/calendar/single-table-calendar.jsx";
import { Fragment } from "react";
import DashboardStyle from "../../dashboard/dashboard.module.scss";
import TeacherAvatar from "../../../assets/user/teacher.jpeg";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ButtonComponent from "@/components/button";
import SingleStyle from "../scheduling.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

export const Single = () => {
  return (
    <Fragment>
      <div className={"bg-white rounded-xl overflow-hidden"}>
        <div
          className={`${DashboardStyle["Dashboard__teachers"]} ${SingleStyle["Signle__shadow"]} p-5 w-full`}
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
    </Fragment>
  );
};
