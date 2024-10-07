import Title, { Paragraph } from "@/components/title/index.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { useCallback, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Form, Modal, Select } from "antd";
import { AiOutlineClose } from "react-icons/ai";

const Enrollment = () => {
  const [form] = Form.useForm();
  const [SelectedPackages, setSelectedPackages] = useState([]);
  const [CR, setCR] = useState(null);

  const { data: ServicePackages } = useRequestGetQuery({
    path: "/account_management/services/service/",
  });
  const { data: ServiceClasses } = useRequestGetQuery({
    path: "/account_management/class/",
  });

  const classes = useMemo(
    () =>
      ServiceClasses?.filter((item) => item?.status === "ACTIVE").map(
        (item) => ({
          value: item?.id,
          label: `${item?.details} | ${item?.note}`,
        }),
      ),
    [ServiceClasses],
  );

  const classesItem = useMemo(
    () =>
      ServiceClasses?.filter((item) => item?.id === CR).reduce(
        (_, acc) => ({ name: `${acc?.details} | ${acc?.note}` }),
        0,
      ) || {},
    [CR],
  );

  const handleCoupon = useCallback(() => {
    Modal.info({
      title: (
        <Title level={2} fontSize={"text-3xl"}>
          5% OFF
        </Title>
      ),
      content: <>content</>,
      width: 650,
    });
  }, []);

  const filteredPackages = useMemo(() => {
    form.setFieldValue("package", SelectedPackages);

    return SelectedPackages.length !== 0
      ? ServicePackages?.filter((pkg) =>
          SelectedPackages.includes(pkg?.id),
        )?.map((pkg) => ({
          id: pkg?.id,
          name: pkg?.name,
          price: parseFloat(pkg?.price),
        }))
      : [];
  }, [SelectedPackages, ServicePackages]);

  const packages = useMemo(
    () =>
      ServicePackages?.filter((item) => item?.status === "ACTIVE").map(
        (item) => ({ value: item?.id, label: item?.name }),
      ),
    [ServicePackages],
  );

  const filteredOptions = packages?.filter(
    (pkg) => !SelectedPackages.includes(pkg?.value),
  );

  const onFinish = async (values) => {
    console.log(values);
  };

  const onCancelPackage = (id) => {
    setSelectedPackages((prev) => prev?.filter((index) => index !== id));
  };

  const onCancelCR = () => {
    form.setFieldValue("cr", null);
    setCR(null);
  };

  const packagesItem = filteredPackages?.map((pkg, index) => {
    index += 1;
    return (
      <li key={index} className={"flex items-center justify-between gap-5"}>
        <Paragraph>{index}</Paragraph>
        <Paragraph className={"flex-grow"}>{pkg?.name}</Paragraph>
        <div className={"flex items-center gap-3"}>
          <b>${pkg?.price}</b>

          <AiOutlineClose
            className={"text-red-500 cursor-pointer"}
            onClick={() => onCancelPackage(pkg?.id)}
          />
        </div>
      </li>
    );
  });

  return (
    <>
      <Helmet>
        <title>New student enrollment</title>
      </Helmet>

      <section className={"px-3 sm:px-5 md:px-11 space-y-5 max-w-full w-full"}>
        <Title
          level={2}
          fontSize={"text-indigo-600 text-4xl"}
          fontWeightStrong={600}
          titleMarginBottom={26}
        >
          New student enrollment
        </Title>

        <Form form={form} onFinish={onFinish} className={"space-y-5"}>
          <div className="flex gap-5">
            <div className="flex-grow">
              <div className="bg-white rounded-2xl p-5 space-y-2.5">
                <Title level={3} fontSize={"text-2xl"}>
                  Package selection
                </Title>
                <Paragraph fontSize={"text-gray-500"}>
                  Select the package to enroll students
                </Paragraph>

                <Form.Item
                  name={"package"}
                  rules={[
                    {
                      required: true,
                      message: "Please choose PACKAGE!",
                    },
                  ]}
                >
                  <Select
                    className={"h-[50px]"}
                    mode="multiple"
                    placeholder="Select"
                    value={SelectedPackages}
                    onChange={setSelectedPackages}
                    options={filteredOptions}
                  />
                </Form.Item>

                {packagesItem?.length !== 0 && (
                  <div className={"space-y-3"}>
                    <div className="flex items-center justify-between gap-2">
                      <Title level={4}>You choose</Title>
                      <Paragraph fontSize={" text-gray-500"}>
                        Sub total $
                        {filteredPackages?.reduce(
                          (cur, acc) => cur + acc?.price,
                          0,
                        )}
                        Tax: $0 Coupon: $
                        {filteredPackages?.reduce(
                          (cur, acc) => cur + acc?.price,
                          0,
                        )}
                      </Paragraph>
                    </div>
                    <ol className={"space-y-2.5"}>{packagesItem}</ol>

                    <Button
                      type={"primary"}
                      onClick={handleCoupon}
                      htmlType={"button"}
                    >
                      Coupon
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-grow">
              <div className="bg-white rounded-2xl p-5 space-y-2.5">
                <Title level={3} fontSize={"text-2xl"}>
                  Class selection
                </Title>
                <Paragraph fontSize={"text-gray-500"}>
                  Select the package to enroll students
                </Paragraph>

                <Form.Item name={"cr"}>
                  <Select
                    placeholder={"Select"}
                    className={"h-[50px]"}
                    options={classes}
                    onChange={setCR}
                  />
                </Form.Item>

                {classesItem?.name && (
                  <div className={"flex gap-3 justify-between items-center"}>
                    <Paragraph>1</Paragraph>
                    <Paragraph className={"flex-grow"}>
                      {classesItem?.name}
                    </Paragraph>
                    <AiOutlineClose
                      className={"w-4 text-red-500 cursor-pointer"}
                      onClick={onCancelCR}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <article className="bg-white rounded-2xl p-5 space-y-2.5">
            <Form.Item name={"information_type"}>
              <Select
                className={"h-[50px]"}
                style={{
                  width: "50%",
                }}
                options={[
                  { value: "Teen", label: "Teen" },
                  { value: "Adult", label: "Adult" },
                  { value: "Knowledge Test", label: "Knowledge Test" },
                  { value: "Road Test", label: "Road Test" },
                ]}
              />
            </Form.Item>
          </article>
        </Form>
      </section>
    </>
  );
};

export default Enrollment;
