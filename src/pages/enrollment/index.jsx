import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import { Icons } from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { InfoForm } from "@/pages/enrollment/info-form.jsx";
import { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import EnrollmentStyle from "./enrollment.module.scss";
import IconComponent from "@/components/icons";
import { FaX } from "react-icons/fa6";
import { LuX } from "react-icons/lu";

const PackageSelectionArray = [
    {
      id: 1,
      label: "8h in car instruction",
      hours: 74,
      price: 169,
      value: 1,
    },
    {
      id: 2,
      label: "10h in car instruction",
      hours: 74,
      price: 209,
      value: 2,
    },
    {
      id: 3,
      label: "3h in car instruction",
      hours: 15,
      price: 103,
      value: 3,
    },
  ],
  ClassSelectionArray = [
    {
      id: 1,
      label: "8h in car instruction",
      value: 1,
      price: 169,
    },
    {
      id: 2,
      label: "10h in car instruction",
      value: 2,
      price: 209,
    },
    {
      id: 3,
      label: "3h in car instruction",
      value: 3,
      price: 103,
    },
  ];

const Enrollment = () => {
  const { colorsObject } = useContext(ColorsContext),
    defaultValue = "Package selection",
    [Package, setPackage] = useState(defaultValue),
    [Classes, setClasses] = useState(defaultValue),
    [InfoType, setInfoType] = useState(defaultValue),
    [SelectedPackages, setSelectedPackages] = useState([]),
    [SelectedClass, setSelectedClass] = useState([]),
    InfoTypeOptions = [
      {
        value: "Teen",
      },
      {
        value: "Adult",
      },
      {
        value: "Knowledge test",
      },
      {
        value: "Road test",
      },
    ];

  useEffect(() => {
    PackageSelectionArray.map((item) => {
      if (Package === item.value) {
        setSelectedPackages([...SelectedPackages, item]);
      }
    });
  }, [Package]);

  let totalPrice = 0;

  const packageItem = SelectedPackages.filter(
    (item, index) => SelectedPackages.indexOf(item) === index,
  ).map(({ price, hours, label }, index) => {
    totalPrice += price;
    index += 1;
    return (
      <Fragment key={index}>
        {/*Item Start*/}
        <div className="flex justify-between">
          <div className="flex gap-x-2.5 items-center">
            <Paragraph fontSize={"text-base"} fontWeightStrong={400}>
              {index}
            </Paragraph>
            <Paragraph fontSize={"text-xs"} fontWeightStrong={400}>
              {label}
            </Paragraph>
            <Paragraph
              fontSize={"text-xs text-gray-600"}
              fontWeightStrong={400}
            >
              {hours}h
            </Paragraph>
          </div>

          <div className="flex items-center gap-2 5">
            <Paragraph fontSize={"text-base"} fontWeightStrong={400}>
              ${price}
            </Paragraph>

            <button className="w-5">
              <Icons type={"cross"} />
            </button>
          </div>
        </div>
        {/*Item Start*/}
      </Fragment>
    );
  });

  useEffect(() => {
    ClassSelectionArray.map((item) => {
      if (item.value === Classes) {
        setSelectedClass([item]);
      }
    });
  }, [Classes]);

  let totalClassPrice = 0;
  const classItem = SelectedClass?.map(({ label, price }, index) => {
    index += 1;
    totalClassPrice += price;
    return (
      <div
        className="border-2 rounded-3xl border-indigo-500 flex items-center"
        key={index}
      >
        <Paragraph
          className={"border-r-2 border-r-indigo-500"}
          fontSize={"text-base p-4 "}
          fontWeightStrong={400}
        >
          {index}
        </Paragraph>
        <Paragraph fontSize={"text-base p-4"} fontWeightStrong={400}>
          {label}
        </Paragraph>
      </div>
    );
  });

  return (
    <Fragment>
      <Helmet>
        <title>New student enrollment</title>
      </Helmet>

      <section
        className={`px-11 space-y-5 max-w-full w-full ${EnrollmentStyle["Enrollment"]}`}
      >
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          New Student Enrollment
        </Title>

        <div className={EnrollmentStyle["Enrollment__selections"]}>
          <div>
            <div className={`bg-white p-5 rounded-3xl shadow-lg`}>
              <Title
                fontSize={"text-xl"}
                fontWeightStrong={500}
                titleMarginBottom={5}
                level={2}
              >
                Package selection
              </Title>
              <Paragraph fontSize={"text-xs text-zinc-500 mb-2.5"}>
                Select the package to enroll students
              </Paragraph>

              <CustomSelect
                value={Package}
                onChange={(value) => setPackage(value)}
                options={PackageSelectionArray}
                style={{ width: "100%" }}
                className={"mb-2.5"}
                optionFontSize={14}
                optionSelectedFontWeight={400}
                fontSize={16}
                colorBorder={colorsObject.primary}
              />

              {SelectedPackages?.length > 0 ? (
                <Fragment>
                  <div className="flex justify-between mb-2.5">
                    <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                      You choosen:
                    </Paragraph>
                    <Paragraph fontSize={"text-xs text-gray-600"}>
                      Sub total ${totalPrice} Tax: $0 Coupon: $338
                    </Paragraph>
                  </div>
                </Fragment>
              ) : null}

              {SelectedPackages?.length > 0 ? (
                <div className={`flex flex-col gap-y-3.5 pl-4 mb-5`}>
                  {packageItem}
                </div>
              ) : null}

              {SelectedPackages?.length > 0 ? (
                <div className="flex justify-between">
                  <div className={"space-x-2.5"}>
                    <ButtonComponent
                      defaultBg={colorsObject.info}
                      defaultHoverBg={colorsObject.info}
                      paddingInline={28}
                      controlHeight={40}
                    >
                      Coupon
                    </ButtonComponent>

                  </div>

                  <Paragraph fontSize={"text-xl"} fontWeightStrong={400}>
                    ${totalPrice}
                  </Paragraph>
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <div className={`bg-white p-5 rounded-3xl shadow-lg`}>
              <Title
                fontSize={"text-xl"}
                fontWeightStrong={500}
                titleMarginBottom={5}
              >
                Class selection
              </Title>
              <Paragraph fontSize={"text-xs text-zinc-500 mb-2.5"}>
                Select the package to enroll students
              </Paragraph>

              <CustomSelect
                value={Classes}
                onChange={(value) => setClasses(value)}
                options={ClassSelectionArray}
                style={{ width: "100%" }}
                className={"mb-2.5"}
                colorBorder={colorsObject.primary}
              />

              {SelectedClass?.length > 0 ? (
                <div className={"mb-5 space-y-2.5"}>{classItem}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="shadow-lg p-5 bg-white rounded-3xl">
          <Title
            fontSize={"text-xl"}
            fontWeightStrong={500}
            titleMarginBottom={5}
          >
            Student information type
          </Title>

          <Paragraph fontSize={"text-xs text-zinc-500 mb-2.5"}>
            Select the package to enroll students
          </Paragraph>

          <CustomSelect
            value={InfoType}
            onChange={(value) => setInfoType(value)}
            options={InfoTypeOptions}
            style={{ width: "100%", maxWidth: "570px" }}
            className={"mb-2.5"}
            colorBorder={colorsObject.primary}
            disabled={defaultValue === Package}
          />

          {defaultValue !== InfoType && <InfoForm />}
        </div>
      </section>
    </Fragment>
  );
};

export default Enrollment;
