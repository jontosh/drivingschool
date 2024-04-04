import { Product } from "@/pages/managment/service/product.jsx";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

const ServiceSpa = () => {
  const { title } = useParams();

  if (title === "product") {
    return (
      <Fragment>
        <title>Service - Product</title>
        <Product />
      </Fragment>
    );
  }
};

export default ServiceSpa;
