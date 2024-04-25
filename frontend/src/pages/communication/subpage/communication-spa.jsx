import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

export const CommunicationSpa = () => {
  const { title } = useParams();

  switch (title?.toLowerCase()) {
    case "email-templates": {
      return (
        <Fragment>
          <Helmet>
            <title>Communication - Email Templates</title>
          </Helmet>
        </Fragment>
      );
    }
  }
};
