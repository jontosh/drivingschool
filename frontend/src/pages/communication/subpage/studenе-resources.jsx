import ButtonComponent from "@/components/button/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { setActiveNav } from "@/modules/active-nav.jsx";
import { StudentResourceParent } from "@/pages/communication/subpage/student-resource-parent.jsx";
import { StudentResourcesInCar } from "@/pages/communication/subpage/student-resources-in-car.jsx";
import { StudentResourcesRoadTest } from "@/pages/communication/subpage/student-resources-road-test.jsx";
import { StudentResourcesClass } from "@/pages/communication/subpage/student-resourse-class.jsx";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useParams } from "react-router-dom";

const CheckPage = ({ page }) => {
  const { colorsObject } = useContext(ColorsContext);

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
      console.error(`Error! Unknown type ${page}`);
    }
  }
};

export const StudentResources = () => {
  const { subpage } = useParams();

  return (
    <Fragment>
      <Helmet>
        <title>Communication - Student Resources</title>
      </Helmet>

      <div className={"pb-5"}>
        <div className={"space-x-6 px-5 -mx-5 border-b border-b-gray-400"}>
          <NavLink
            to={"/admin/communication/student-resources/class"}
            className={setActiveNav}
          >
            Class
          </NavLink>

          <NavLink
            to={"/admin/communication/student-resources/in-car"}
            className={setActiveNav}
          >
            In-car
          </NavLink>

          <NavLink
            to={"/admin/communication/student-resources/road-test"}
            className={setActiveNav}
          >
            Road test
          </NavLink>

          <NavLink
            to={"/admin/communication/student-resources/parents"}
            className={setActiveNav}
          >
            Parents
          </NavLink>
        </div>

        <CheckPage page={subpage} />
      </div>
    </Fragment>
  );
};
