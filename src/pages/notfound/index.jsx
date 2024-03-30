import ButtonComponent from "@/components/button/index.jsx";
import Image from "@/components/image/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import NotFoundStyle from "./notfound.module.scss";
import Image404 from "../../assets/others/NotFound.png";
import { useNavigate } from "react-router-dom";

const Notfound = ({}) => {
  const Navigate = useNavigate();
  const { colorsObject } = useContext(ColorsContext);
  const handleBack = () => Navigate(-1);

  return (
    <Fragment>
      <Helmet>
        <title>Not Found 404</title>
      </Helmet>
      <section
        className={`h-screen flex items-center justify-center ${NotFoundStyle["Notfound"]}`}
      >
        <div className={`${NotFoundStyle["Notfound__content"]}`}>
          <div className={`${NotFoundStyle["Notfound__imageholder"]} mb-9`}>
            <Image src={Image404} srcSet={Image404} alt={"Not Found Page"} />
          </div>

          <Title
            className={"text-center"}
            level={2}
            fontSize={"text-3xl"}
            fontWeightStrong={600}
            titleMarginBottom={32}
          >
            Page not found
          </Title>

          <div className="text-center">
            <ButtonComponent
              defaultHoverBg={colorsObject.info}
              defaultBg={colorsObject.info}
              onClick={handleBack}
              paddingInline={30}
              paddingBlock={10}
              controlHeight={45}
            >
              Go Back
            </ButtonComponent>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Notfound;
