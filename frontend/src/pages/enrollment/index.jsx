import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import IconComponent, { Icons } from "@/components/icons/index.jsx";
import Modal from "@/components/modal/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { InfoForm } from "@/pages/enrollment/info-form.jsx";
import classNames from "classnames";
import { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoArrowForwardSharp } from "react-icons/io5";
import { MdOutlineContentCopy } from "react-icons/md";
import EnrollmentStyle from "./enrollment.module.scss";

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
  const { colorsObject } = useContext(ColorsContext);
  const defaultValue = "Package selection";
  const [Package, setPackage] = useState(defaultValue);
  const [Classes, setClasses] = useState(defaultValue);
  const [InfoType, setInfoType] = useState(defaultValue);
  const [SelectedPackages, setSelectedPackages] = useState([]);
  const [SelectedClass, setSelectedClass] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);

  const handleCuponModal = () => setIsOpen((prev) => !prev);

  const InfoTypeOptions = [
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
  ).map(({ price, hours, label, id }, index) => {
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

            <IconComponent
              className="w-5 inline-flex items-center"
              icon={<Icons type={"cross"} />}
              onClick={() => {
                setSelectedPackages((prev) =>
                  prev?.filter((item) => item.id !== id),
                );
              }}
            />
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
                      borderRadius={5}
                      onClick={handleCuponModal}
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

      {IsOpen && (
        <Modal setIsOpen={setIsOpen}>
          <div
            className={classNames(
              EnrollmentStyle["Modal__content"],
              "bg-white rounded-2xl p-5 w-full space-y-7",
            )}
          >
            <div>
              <Title
                level={3}
                fontWeightStrong={500}
                fontSize={"text-2xl"}
                titleMarginBottom={5}
              >
                5% OFF
              </Title>
              <Title level={3} fontWeightStrong={500} fontSize={"text-xl"}>
                For whole order
              </Title>
            </div>

            <div className="flex justify-between items-center">
              <code className={"text-sm text-[#163ED4]"}>
                Code: NEWCUSTOMER_1234
              </code>
              <div className={"flex"}>
                <IconComponent
                  className={"font-semibold text-sm py-2 px-3"}
                  icon={<MdOutlineContentCopy />}
                  iconWidth={"w-5"}
                  vertical={"items-center"}
                  spaceIconX={2}
                >
                  Copy
                </IconComponent>

                <IconComponent
                  className={"font-semibold text-sm py-2 px-3"}
                  icon={<IoArrowForwardSharp />}
                  iconWidth={"w-5"}
                  vertical={"items-center"}
                  spaceIconX={2}
                >
                  Apply
                </IconComponent>
              </div>
            </div>

            <div className={"text-[#8B94B2]"}>
              <ul className={classNames("list-disc")}>
                <li className={EnrollmentStyle["Modal__list-item"]}>
                  05/08/2021 04:00 – 09/08/2021 12:00
                </li>
                <li className={EnrollmentStyle["Modal__list-item"]}>
                  For all products.
                </li>
                <li className={EnrollmentStyle["Modal__list-item"]}>
                  Combinations: Get 20% off when you spend over $169.00 or get
                  15% off when you spend over $89.00.
                </li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default Enrollment;
