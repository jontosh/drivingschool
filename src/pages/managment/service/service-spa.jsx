import { Fragment } from "react";
import { useParams } from "react-router-dom";

const ServiceSpa = () => {
  const { title } = useParams();

  if (title === "product") {
    return (
      <Fragment>
        <title>Service - Product</title>
        <div>content</div>
      </Fragment>
    );
  }
};

export default ServiceSpa;
