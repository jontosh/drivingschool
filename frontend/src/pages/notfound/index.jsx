import ButtonComponent from "@/components/button/index.jsx";
import Image from "@/components/image/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import NotFoundImage from "../../assets/others/404-image.svg";
import { FaArrowLeftLong } from "react-icons/fa6";
import NotfoundStyle from "./notfound.module.scss";

const Notfound = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (["/", "/student/", "/instructor/", "/admin/"].includes(pathname)) {
      navigate("/register/sign-in", { replace: true });
    }
  }, [pathname, navigate]);

  return (
    <Fragment>
      <Helmet>
        <title>Not Found 404</title>
      </Helmet>
      <section className={`h-screen`}>
        <Image
          src={NotFoundImage}
          alt="Not Found 404"
          srcSet={NotFoundImage}
          className={"w-[714px] mx-auto"}
        />

        <div className="w-[500px] mx-auto text-center space-y-5">
          <span className="border border-[#8C94A0] text-[#8C94A0] px-3.5 py-1.5 rounded-lg">
            404 error
          </span>

          <Title level={1} fontSize={"text-6xl"}>
            Page Not Found
          </Title>

          <Paragraph fontSize={"text-xl text-[#8C94A0]"}>
            Sorry , the page you are looking for doesn’t exist, Here some
            helpful links:
          </Paragraph>

          <div className="flex items-center space-x-5 justify-center pb-10">
            <ButtonComponent
              defaultColor={colorsObject.black}
              defaultHoverColor={colorsObject.black}
              defaultBorderColor={"#E7EAEE"}
              defaultHoverBorderColor={"#E7EAEE"}
              borderRadius={10}
              paddingInline={43}
              controlHeight={60}
              onClick={() => navigate(-1)}
              className={"flex items-center gap-2"}
            >
              <FaArrowLeftLong />
              Go Back
            </ButtonComponent>

            <ButtonComponent
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.black}
              defaultBorderColor={"#E7EAEE"}
              defaultHoverBorderColor={"#E7EAEE"}
              borderRadius={10}
              paddingInline={43}
              controlHeight={60}
              onClick={() => navigate("/")}
              className={NotfoundStyle["Notfound__button"]}
            >
              Go Home
            </ButtonComponent>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Notfound;
