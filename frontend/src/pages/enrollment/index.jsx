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
    setPackageIndexes(PackageTotal.map((pkg) => pkg.id));
  }, [PackageTotal]);

  useEffect(() => {
    const activePackages = ServicePackage?.filter(
      (pkg) => pkg.status.toLowerCase() === "active",
    ).map((pkg) => ({
      ...pkg,
      label: pkg.web_name,
      value: pkg.id,
      price: parseFloat(pkg.price),
    }));

    const activeClasses = ServiceClass?.filter(
      (cls) => cls.status.toLowerCase() === "active",
    ).map((cls) => ({
      ...cls,
      label: cls.details,
      value: cls.id,
    }));

    setPackageSelection(activePackages);
    setClassSelection(activeClasses);
  }, [ServicePackage, ServiceClass]);

  const handlePackage = (value) => setPackageValue(value);
  const handleStudentInfoType = (value) => setStudentInfoType(value);
  const handlePackageDelete = (id) => {
    setPackageTotal((prev) => prev.filter((item) => item.id !== id));
    setPackageValue("");
  };
  const handleClass = (value) => setClassValue(value);

  useEffect(() => {
    const selectedPackages = PackageSelection?.filter(
      (item) => item.value === PackageValue,
    );
    setPackageTotal((prev) => [...prev, ...selectedPackages]);
    const selectedClass = ClassSelection?.find(
      (item) => item.id === ClassValue,
    );
    setClassItem(selectedClass);
  }, [PackageValue, ClassValue]);

  let totalPrice = PackageTotal.reduce((sum, { price }) => sum + price, 0);

  const packageItems = PackageTotal?.map(({ price, label, id }, index) => (
    <Fragment key={id}>
      <div className="flex justify-between">
        <div className="flex gap-x-2.5 items-center">
          <Paragraph fontSize="text-base" fontWeightStrong={400}>
            {index + 1}
          </Paragraph>
          <Paragraph fontSize="text-xs" fontWeightStrong={400}>
            {label}
          </Paragraph>
        </div>
        <div className="flex items-center gap-2.5">
          <Paragraph fontSize="text-base" fontWeightStrong={400}>
            ${price}
          </Paragraph>
          <IconComponent
            className="w-5 inline-flex items-center"
            icon={<Icons type="cross" />}
            onClick={() => handlePackageDelete(id)}
          />
        </div>
      </div>
    </Fragment>
  ));

  const classItems = ServiceClass?.map(({ details, note, id }, index) =>
    ClassValue === id ? (
      <div
        className="border-2 rounded-3xl border-indigo-500 flex items-center"
        key={id}
      >
        <Paragraph
          className="border-r-2 border-r-indigo-500 p-4"
          fontSize="text-base"
          fontWeightStrong={400}
        >
          {index + 1}
        </Paragraph>
        <Paragraph className="p-4" fontSize="text-base" fontWeightStrong={400}>
          {details} | {note}
        </Paragraph>
      </div>
    ) : null,
  );

  return (
    <Fragment>
      <Helmet>
        <title>New student enrollment</title>
      </Helmet>
      <section className="px-3 md:px-11 space-y-5 max-w-full w-full">
        <Title
          level={2}
          fontSize="text-indigo-600 text-4xl"
          fontWeightStrong={600}
          titleMarginBottom={20}
        >
          New Student Enrollment
        </Title>
        <div className="grid lg:grid-cols-2 gap-7">
          <div className="bg-white p-5 rounded-3xl shadow-lg">
            <Title
              fontSize="text-xl"
              fontWeightStrong={500}
              titleMarginBottom={5}
              level={2}
            >
              Package selection
            </Title>
            <Paragraph fontSize="text-xs text-zinc-500 mb-2.5">
              Select the package to enroll students
            </Paragraph>
            <CustomSelect
              placeholder="Package selection"
              onChange={handlePackage}
              options={PackageSelection}
              value={PackageValue || undefined}
              className="w-full mb-2.5 h-[50px]"
              optionFontSize={14}
              optionSelectedFontWeight={400}
              fontSize={16}
            />
            {PackageTotal.length > 0 && (
              <>
                <div className="flex justify-between mb-2.5">
                  <Paragraph fontWeightStrong={400} fontSize="text-base">
                    You chosen:
                  </Paragraph>
                  <Paragraph fontSize="text-xs text-gray-600">
                    Sub total ${totalPrice} Tax: $0 Coupon: $338
                  </Paragraph>
                </div>
                <div className="flex flex-col gap-y-3.5 pl-4 mb-5">
                  {packageItems}
                </div>
                <div className="flex justify-between">
                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.info}
                    paddingInline={28}
                    controlHeight={40}
                    borderRadius={5}
                  >
                    Coupon
                  </ButtonComponent>
                  <Paragraph fontSize="text-xl" fontWeightStrong={400}>
                    ${totalPrice}
                  </Paragraph>
                </div>
              </>
            )}
          </div>
          <div className="bg-white p-5 rounded-3xl shadow-lg">
            <Title
              fontSize="text-xl"
              fontWeightStrong={500}
              titleMarginBottom={5}
            >
              Class selection
            </Title>
            <Paragraph fontSize="text-xs text-zinc-500 mb-2.5">
              Select the package to enroll students
            </Paragraph>
            <CustomSelect
              placeholder="Select class"
              options={ClassSelection}
              className="w-full mb-2.5 h-[50px]"
              onChange={handleClass}
            />
            {classItems}
          </div>
        </div>
        <div className="shadow-lg p-5 bg-white rounded-3xl">
          <Title
            fontSize="text-xl"
            fontWeightStrong={500}
            titleMarginBottom={5}
          >
            Student information type
          </Title>
          <Paragraph fontSize="text-xs text-zinc-500 mb-2.5">
            Select the package to enroll students
          </Paragraph>
          <CustomSelect
            placeholder="Student information type"
            fontSize={14}
            onChange={handleStudentInfoType}
            options={StudentInfoTypeOptions}
            className="mb-2.5 h-[50px] shadow-lg max-w-[570px] w-full"
            disabled={!PackageTotal.length}
          />
          {StudentInfoType && PackageIndexes.length > 0 && (
            <InfoForm
              packages={{
                packages: PackageIndexes,
                total: totalPrice,
                class: ClassItem,
              }}
              type={StudentInfoType}
            />
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Enrollment;
