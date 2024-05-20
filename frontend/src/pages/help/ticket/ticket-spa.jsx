import Title, { Paragraph } from "@/components/title";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

export const TicketSpa = () => {
  const { title, id } = useParams();

  return (
    <Fragment>
      <Helmet>
        <title>News Details</title>
      </Helmet>
      <div className="px-11">
        <Title
          level={2}
          fontSize={"text-black text-2xl"}
          fontWeightStrong={500}
          titleMarginBottom={40}
        >
          News Details
        </Title>

        <div className="bg-white p-5 rounded-lg">
          <div className="flex justify-between items-center">
            <Title
              level={2}
              fontSize={"text-black text-2xl"}
              fontWeightStrong={700}
            >
              Application No. {id}
            </Title>

            <div className="flex items-center gap-5">
              <span className="text-xs text-gray-600">DATE</span>

              <Paragraph
                fontSize={18}
                fontWeightStrong={400}
                classNames={"flex gap-10"}
              >
                25.04.2024
              </Paragraph>
            </div>
          </div>

          <section className="flex flex-col gap-y-2.5 pt-5">
            <span className="text-xs text-gray-600">TITLE</span>

            <Title
              level={2}
              fontSize={"text-black text-lg"}
              fontWeightStrong={400}
            >
              {title}
            </Title>

            <span className="text-xs text-gray-600">DESCRIPTION</span>

            <Paragraph
              fontSize={14}
              fontWeightStrong={500}
              colorText="#84818A"
              className={"pb-5"}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br /><br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br /><br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br /><br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br /><br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Paragraph>
          </section>
        </div>
      </div>
    </Fragment>
  )
};

export default TicketSpa;
