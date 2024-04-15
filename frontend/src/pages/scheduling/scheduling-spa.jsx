import { Corporate } from "@/pages/scheduling/subpages/corporate.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

export const SchedulingSpa = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  switch (title?.toLowerCase()) {
    case "corporate": {
      return (
        <Fragment>
          <Helmet>
            <title>Scheduling - Corporate time off</title>
          </Helmet>
          <Corporate />
        </Fragment>
      );
    }
    default:
      navigate(-1);
  }
};
