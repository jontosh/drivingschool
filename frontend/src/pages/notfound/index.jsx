import ButtonComponent from "@/components/button/index.jsx";
import Image from "@/components/image/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import NotFoundImage from "../../assets/others/404-image.svg";

const Notfound = () => {
  const { colorsObject } = useContext(ColorsContext);
  const navigate = useNavigate();

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
          <span className="border border-[#8C94A0] px-3.5 py-1.5 rounded-lg">
            404 error
          </span>

          <Title level={1} fontSize={"text-6xl"}>
            Page Not Found
          </Title>

          <Paragraph fontSize={"text-xl text-[#8C94A0]"}>
            Sorry , the page you are looking for doesn’t exist, Here some
            helpful links:
          </Paragraph>

          <div className="space-x-5">
            <ButtonComponent
              defaultColor={colorsObject.black}
              defaultHoverColor={colorsObject.black}
              defaultBorderColor={"#E7EAEE"}
              defaultHoverBorderColor={"#E7EAEE"}
              borderRadius={10}
              paddingInline={43}
              controlHeight={40}
              onClick={() => navigate(-1)}
            >
              Go Back
            </ButtonComponent>

            <ButtonComponent
              defaultColor={colorsObject.black}
              defaultHoverColor={colorsObject.black}
              defaultBorderColor={"#E7EAEE"}
              defaultHoverBorderColor={"#E7EAEE"}
              borderRadius={10}
              paddingInline={43}
              controlHeight={40}
              onClick={() => navigate("/")}
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
