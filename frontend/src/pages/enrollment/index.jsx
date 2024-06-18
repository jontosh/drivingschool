import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import IconComponent, { Icons } from "@/components/icons/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { EnrollmentsSelections } from "@/modules/enrollments.jsx";
import { InfoForm } from "@/pages/enrollment/info-form.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import EnrollmentStyle from "./enrollment.module.scss";

const Enrollment = () => {
  const { data: ServicePackage } = useRequestGetQuery({
    path: "/account_management/services/service/",
  });

  const { data: ServiceClass } = useRequestGetQuery({
    path: "/account_management/class/",
  });

  const { colorsObject } = useContext(ColorsContext);
  const { StudentInfoTypeOptions } = EnrollmentsSelections();
  const [PackageSelection, setPackageSelection] = useState([]);
  const [PackageTotal, setPackageTotal] = useState([]);
  const [PackageIndexes, setPackageIndexes] = useState([]);
  const [PackageValue, setPackageValue] = useState("");
  const [ClassSelection, setClassSelection] = useState([]);
  const [StudentInfoType, setStudentInfoType] = useState("");
  const [ClassValue, setClassValue] = useState(null);
  const [ClassItem, setClassItem] = useState(null);

  useEffect(() => {
    const array = [];
    for (let i = 0; i < PackageTotal?.length; i++) {
      array.push(PackageTotal[i]?.id);
    }
    setPackageIndexes(array);
  }, [PackageTotal?.length]);

  useEffect(() => {
    let options = [];
    let classesOptions = [];

    for (let i = 0; i < ServicePackage?.length; i++) {
      if (ServicePackage[i]?.status?.toLowerCase() === "active") {
        options.push({
          ...ServicePackage[i],
          label: ServicePackage[i].web_name,
          value: ServicePackage[i].id,
          price: parseFloat(ServicePackage[i].price),
        });
      }
    }

    setPackageSelection(options);

    for (let i = 0; i < ServiceClass?.length; i++) {
      if (ServiceClass[i]?.status?.toLowerCase() === "active") {
        classesOptions.push({
          ...ServiceClass[i],
          label: ServiceClass[i].details,
          value: ServiceClass[i].id,
        });
      }
    }

    setClassSelection(classesOptions);
  }, [ServicePackage, ServiceClass]);

  const handlePackage = (value) => setPackageValue(value);
  const handleStudentInfoType = (value) => setStudentInfoType(value);
  const handlePackageDelete = (id) => {
    setPackageTotal((prev) => prev?.filter((item) => item.id !== id));

    setPackageValue("");
  };

  const handleClass = (value) => setClassValue(value);

  useEffect(() => {
    setPackageTotal(() =>
      PackageSelection?.filter((item) => item.value === PackageValue),
    );
    const classItem = ClassSelection?.filter((item) => item?.id === ClassValue);

    setClassItem(() => classItem[0]);
  }, [PackageValue, ClassValue]);

  let totalPrice = 0;

  const packageItem = PackageTotal?.map(({ price, label, id }, index) => {
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
          </div>

          <div className="flex items-center gap-2 5">
            <Paragraph fontSize={"text-base"} fontWeightStrong={400}>
              ${price}
            </Paragraph>

            <IconComponent
              className="w-5 inline-flex items-center"
              icon={<Icons type={"cross"} />}
              onClick={() => handlePackageDelete(id)}
            />
          </div>
        </div>
        {/*Item Start*/}
      </Fragment>
    );
  });

  const classItem = ServiceClass?.map(({ details, note, id }, index) => {
    index += 1;
    return ClassValue === id ? (
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
          {details} | {note}
        </Paragraph>
      </div>
    ) : null;
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
                placeholder={"Package selection"}
                onChange={handlePackage}
                options={PackageSelection}
                value={PackageValue ? PackageValue : undefined}
                className={"w-full mb-2.5 h-[50px]"}
                optionFontSize={14}
                optionSelectedFontWeight={400}
                fontSize={16}
              />

              {PackageTotal?.length > 0 ? (
                <Fragment>
                  <div className="flex justify-between mb-2.5">
                    <Paragraph fontWeightStrong={400} fontSize={"text-base"}>
                      You chosen:
                    </Paragraph>
                    <Paragraph fontSize={"text-xs text-gray-600"}>
                      Sub total ${totalPrice} Tax: $0 Coupon: $338
                    </Paragraph>
                  </div>
                </Fragment>
              ) : null}

              {PackageTotal?.length > 0 ? (
                <div className={`flex flex-col gap-y-3.5 pl-4 mb-5`}>
                  {packageItem}
                </div>
              ) : null}

              {PackageTotal?.length > 0 ? (
                <div className="flex justify-between">
                  <div className={"space-x-2.5"}>
                    <ButtonComponent
                      defaultBg={colorsObject.info}
                      defaultHoverBg={colorsObject.info}
                      paddingInline={28}
                      controlHeight={40}
                      borderRadius={5}
                      // onClick={handleCouponModal}
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
                placeholder={"Select class"}
                options={ClassSelection}
                className={"w-full mb-2.5 h-[50px]"}
                onChange={handleClass}
              />

              {classItem}
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
            placeholder={"Student information type"}
            fontSize={14}
            onChange={handleStudentInfoType}
            options={StudentInfoTypeOptions}
            className={"mb-2.5 h-[50px] shadow-lg max-w-[570px] w-full"}
            disabled={!PackageTotal?.length}
          />

          {StudentInfoType !== "" && (
            <InfoForm
              packages={{
                packages: PackageIndexes,
                total: totalPrice,
                class: ClassItem,
              }}
            />
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Enrollment;
