import IconComponent from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { FaCcMastercard } from "react-icons/fa6";
import { LiaCcVisa } from "react-icons/lia";

export const Payment = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Configuration - Integrate payment</title>
      </Helmet>

      <div>
        <Title
          level={3}
          fontSize={"text-lg text-indigo-700"}
          fontWeightStrong={500}
          titleMarginBottom={20}
        >
          Integrate payment
        </Title>

        <blockquote
          className={
            "border border-indigo-600 p-4 rounded-2xl text-lg text-[#000000D9] mb-5"
          }
        >
          Click on the button below that matches your payment gateway provider,
          to integrate the payment gateway with the software. This information
          can only be entered by the owner or authorized user whose phone number
          is listed below. To change the number on file, contact our support
          team or your account manager, by emailing
          support.drivingschool@gmail.com
        </blockquote>

        <Paragraph fontSize={"text-lg"}>
          Registered Authentication Cell Phone: (XXX) XXX-2454
        </Paragraph>

        <div className="flex items-center gap-7">
          <IconComponent
            className={"cursor-default"}
            icon={<LiaCcVisa />}
            iconWidth={"text-[100px]"}
          />
          <IconComponent
            className={"cursor-default"}
            icon={<FaCcMastercard />}
            iconWidth={"text-[75px]"}  
          />
        </div>
      </div>
    </Fragment>
  );
};
