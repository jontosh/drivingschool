import Title from "@/components/title/index.jsx";
import {
  AddSchoolModalContent,
  AddServiceModalContent,
  AddStaffModalContent,
  DiscountModalContent,
  FeesModalContent,
  FileCategoryModalContent,
  HowHearModalContent,
  LocationModalContent,
  MiscellaneousModalContent,
  ProductModalContent,
  VehiclesModalContent,
} from "@/pages/managment/service/modal.jsx";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

export const CheckModal = () => {
  const navigate = useNavigate();
  const { page_modal } = useParams();

  switch (page_modal) {
    case "product": {
      return (
        <Fragment>
          <Helmet>
            <title>Modal - Product</title>
          </Helmet>

          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Product
          </Title>

          <div className="bg-white rounded-xl py-5 shadow-2xl">
            <ProductModalContent />
          </div>
        </Fragment>
      );
    }
    case "fees":
      return (
        <Fragment>
          <Helmet>
            <title>Modal - Frees</title>
          </Helmet>

          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Fee
          </Title>
          <div className="bg-white rounded-xl py-5 shadow-2xl">
            <FeesModalContent />
          </div>
        </Fragment>
      );
    case "discounts":
      return (
        <Fragment>
          <Helmet>
            <title>Modal - Discounts</title>
          </Helmet>

          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Discounts
          </Title>

          <div className="bg-white rounded-xl py-5 shadow-2xl">
            <DiscountModalContent />
          </div>
        </Fragment>
      );
    case "miscellaneous": {
      return (
        <Fragment>
          <Helmet>
            <title>Modal - Miscellaneous</title>
          </Helmet>

          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Miscellaneous
          </Title>

          <div className="bg-white rounded-xl py-5 shadow-2xl">
            <MiscellaneousModalContent />
          </div>
        </Fragment>
      );
    }
    case "quiz-exam": {
      return (
        <Fragment>
          <Helmet>
            <title>Modal - Quiz Report</title>
          </Helmet>

          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Quiz Report
          </Title>

          <div className="bg-white rounded-xl shadow-2xl p-5">@todo</div>
        </Fragment>
      );
    }
    case "packages": {
      return (
        <Fragment>
          <Helmet>
            <title>Modal - Services (Packages)</title>
          </Helmet>

          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Add Services (Packages)
          </Title>

          <div className="bg-white rounded-xl py-5 shadow-2xl">
            <AddServiceModalContent />
          </div>
        </Fragment>
      );
    }
    case "new-category": {
      return (
        <Fragment>
          <Helmet>
            <title>Modal - New Category</title>
          </Helmet>

          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Add new file category
          </Title>

          <div className="bg-white rounded-xl py-5 shadow-2xl">
            <FileCategoryModalContent />
          </div>
        </Fragment>
      );
    }
    case "add-staff": {
      return (
        <Fragment>
          <Helmet>
            <title>Modal - Add Staff</title>
          </Helmet>

          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Add Staff
          </Title>

          <div className="bg-white rounded-xl py-5 shadow-2xl">
            <AddStaffModalContent />
          </div>
        </Fragment>
      );
    }
    case "location": {
      return (
        <Fragment>
          <Helmet>
            <title>Modal - New Location</title>
          </Helmet>

          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            New Location
          </Title>

          <div className="bg-white rounded-xl py-5 shadow-2xl">
            <LocationModalContent />
          </div>
        </Fragment>
      );
    }
    case "high school": {
      return (
        <Fragment>
          <Helmet>
            <title>Modal - Add school</title>
          </Helmet>

          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Add school
          </Title>

          <div className="bg-white rounded-xl py-5 shadow-2xl">
            <AddSchoolModalContent />
          </div>
        </Fragment>
      );
    }
    case "how did you hear": {
      return (
        <Fragment>
          <Helmet>
            <title>Modal - Add How did you hear</title>
          </Helmet>

          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Add How did you hear
          </Title>

          <div className="bg-white rounded-xl py-5 shadow-2xl">
            <HowHearModalContent />
          </div>
        </Fragment>
      );
    }
    case "vehicles": {
      return (
        <Fragment>
          <Helmet>
            <title>Modal - Vehicles</title>
          </Helmet>

          <Title
            level={2}
            fontSize={"text-indigo-600 text-4xl"}
            fontWeightStrong={600}
            titleMarginBottom={20}
          >
            Vehicles
          </Title>

          <div className="bg-white rounded-xl py-5 shadow-2xl">
            <VehiclesModalContent />
          </div>
        </Fragment>
      );
    }
    default: {
      navigate("/modals/");
    }
  }
};
