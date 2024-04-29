import ButtonComponent from "@/components/button/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { StudentResourceParent } from "@/pages/communication/subpage/student-resource-parent.jsx";
import { StudentResourcesInCar } from "@/pages/communication/subpage/student-resources-in-car.jsx";
import { StudentResourcesRoadTest } from "@/pages/communication/subpage/student-resources-road-test.jsx";
import { StudentResourcesClass } from "@/pages/communication/subpage/student-resourse-class.jsx";
import ServiceStyle from "@/pages/managment/management.module.scss";
import { Fragment, useContext } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const CheckPage = ({ page }) => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();

  switch (page) {
    case "class": {
      return (
        <Fragment>
          <div className={"py-5"}>
            <StudentResourcesClass />
          </div>

          <div className="text-end">
            <ButtonComponent
              defaultBg={"#24C18F"}
              defaultHoverBg={"#24C18F"}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              borderRadius={5}
              paddingInline={39}
              controlHeight={30}
              className={"shadow-[#00000040]"}
            >
              Save
            </ButtonComponent>
          </div>
        </Fragment>
      );
    }
    case "in-car": {
      return (
        <Fragment>
          <div className={"py-5"}>
            <StudentResourcesInCar />
          </div>

          <div className="text-end">
            <ButtonComponent
              defaultBg={"#24C18F"}
              defaultHoverBg={"#24C18F"}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              borderRadius={5}
              paddingInline={39}
              controlHeight={30}
              className={"shadow-[#00000040]"}
            >
              Save
            </ButtonComponent>
          </div>
        </Fragment>
      );
    }
    case "road-test": {
      return (
        <Fragment>
          <div className={"py-5"}>
            <StudentResourcesRoadTest />
          </div>

          <div className="text-end">
            <ButtonComponent
              defaultBg={"#24C18F"}
              defaultHoverBg={"#24C18F"}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              borderRadius={5}
              paddingInline={39}
              controlHeight={30}
              className={"shadow-[#00000040]"}
            >
              Save
            </ButtonComponent>
          </div>
        </Fragment>
      );
    }
    case "parents": {
      return (
        <Fragment>
          <div className={"py-5"}>
            <StudentResourceParent />
          </div>

          <div className="text-end">
            <ButtonComponent
              defaultBg={"#24C18F"}
              defaultHoverBg={"#24C18F"}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              borderRadius={5}
              paddingInline={39}
              controlHeight={30}
              className={"shadow-[#00000040]"}
            >
              Save
            </ButtonComponent>
          </div>
        </Fragment>
      );
    }
    default: {
      navigate("/communication/student-resources/class");
    }
  }
};

export const StudenResources = () => {
  const { subpage } = useParams();

  const setActiveNav = ({ isActive }) =>
    isActive
      ? `${ServiceStyle["Tab__link-active"]} text-lg py-5`
      : "hover:text-indigo-500 text-lg text-gray-700 py-5";

  return (
    <div className={"pb-5"}>
      <div className={"space-x-6 px-5 -mx-5 border-b border-b-gray-400"}>
        <NavLink
          to={"/communication/student-resources/class"}
          className={setActiveNav}
        >
          Class
        </NavLink>

        <NavLink
          to={"/communication/student-resources/in-car"}
          className={setActiveNav}
        >
          In-car
        </NavLink>

        <NavLink
          to={"/communication/student-resources/road-test"}
          className={setActiveNav}
        >
          Road test
        </NavLink>

        <NavLink
          to={"/communication/student-resources/parents"}
          className={setActiveNav}
        >
          Parents
        </NavLink>
      </div>

      <CheckPage page={subpage} />
    </div>
  );
};
