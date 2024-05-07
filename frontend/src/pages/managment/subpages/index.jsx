import File from "@/pages/managment/file/index.jsx";
import Service from "@/pages/managment/service/index.jsx";
import Staff from "@/pages/managment/staff/index.jsx";
import { default as Managment } from "./../management-spa.jsx";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const ManagmentSpa = ({ className, children, page, ...props }) => {
  const navigate = useNavigate();

  switch (page?.title) {
    case "service": {
      return (
        <Fragment>
          <Service subpage={page.subpage} />
        </Fragment>
      );
    }
    case "file": {
      return (
        <Fragment>
          <File />
        </Fragment>
      );
    }
    case "staff": {
      return (
        <Fragment>
          <Staff />
        </Fragment>
      );
    }
    case "single-page": {
      return (
        <Fragment>
          <Managment page={page} />
        </Fragment>
      );
    }

    default: {
      console.log("/management/service/product");
    }
  }
};

export default ManagmentSpa;
