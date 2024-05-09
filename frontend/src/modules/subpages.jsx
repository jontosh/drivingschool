import ButtonComponent from "@/components/button/index.jsx";
import IconComponent, { Icons } from "@/components/icons/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DiscountsModule } from "@/modules/discount.jsx";
import { FeesModule } from "@/modules/fees.jsx";
import {
  HearModule,
  HighSchoolModule,
  LocationModule,
  VehiclesModule,
} from "@/modules/management.jsx";
import { PackagesModule } from "@/modules/packages.jsx";
import { ProductModule } from "@/modules/product.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import { ExamModule } from "@/modules/quiz-exam.jsx";
import { Hear } from "@/pages/managment/management-spa/hear.jsx";
import { HighSchool } from "@/pages/managment/management-spa/high-school.jsx";
import { Location } from "@/pages/managment/management-spa/location.jsx";
import { Vehicles } from "@/pages/managment/management-spa/vehicles.jsx";
import { Exam } from "@/pages/managment/service/exam.jsx";
import { Fees } from "@/pages/managment/service/fees.jsx";
import { Miscellaneous } from "@/pages/managment/service/miscellaneous.jsx";
import { Packages } from "@/pages/managment/service/packages.jsx";
import { Product } from "@/pages/managment/service/product.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

export const Subpages = ({ page }) => {
  switch (page) {
    case "product": {
      const { columns, data } = ProductModule();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Product</title>
          </Helmet>
          <Product data={data} columns={columns} />
        </Fragment>
      );
    }
    case "fees": {
      const { columns, data } = FeesModule();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Frees</title>
          </Helmet>
          <Fees data={data} columns={columns} />
        </Fragment>
      );
    }
    case "discounts": {
      const { columns, data } = DiscountsModule();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Discounts</title>
          </Helmet>
          <Fees data={data} columns={columns} />
        </Fragment>
      );
    }
    case "miscellaneous": {
      const { columns, data } = FeesModule();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Miscellaneous</title>
          </Helmet>
          <Miscellaneous data={data} columns={columns} />
        </Fragment>
      );
    }
    case "quiz-exam": {
      const { columns } = ExamModule();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Quiz Exam</title>
          </Helmet>
          <Exam columns={columns} />
        </Fragment>
      );
    }
    case "quiz-report": {
      return (
        <Fragment>
          <Helmet>
            <title>Service - Quiz Exam</title>
          </Helmet>
          <div className={"px-5"}>content</div>
        </Fragment>
      );
    }
    case "packages": {
      const { columns, data } = PackagesModule();
      return (
        <Fragment>
          <Helmet>
            <title>Service - Quiz Exam</title>
          </Helmet>
          <Packages columns={columns} data={data} />
        </Fragment>
      );
    }
    case "location": {
      const { columns, data } = LocationModule();
      return (
        <Fragment>
          <Helmet>
            <title>Account management - Location</title>
          </Helmet>
          <Location columns={columns} data={data} />
        </Fragment>
      );
    }
    case "high school": {
      const { columns, data } = HighSchoolModule();
      return (
        <Fragment>
          <Helmet>
            <title>Account management - High School</title>
          </Helmet>
          <HighSchool columns={columns} data={data} />
        </Fragment>
      );
    }
    case "how did you hear": {
      const { columns, data } = HearModule();
      return (
        <Fragment>
          <Helmet>
            <title>Account management - How did you hear</title>
          </Helmet>
          <Hear columns={columns} data={data} />
        </Fragment>
      );
    }
    case "vehicles": {
      const { columns, data } = VehiclesModule();
      return (
        <Fragment>
          <Helmet>
            <title>Account management - Vehicles</title>
          </Helmet>
          <Vehicles columns={columns} data={data} />
        </Fragment>
      );
    }
    default:
      throw new Error();
  }
};
