import Title, { Paragraph } from "@/components/title/index.jsx";
import {
  useRequestGetQuery,
  useRequestPostMutation,
} from "@/redux/query/index.jsx";
import { useCallback, useContext, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Timeline,
} from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { CustomSelect } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";

const ActiveData = (data = []) =>
  data?.filter((item) => item?.status === "ACTIVE");

const Enrollment = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [form] = Form.useForm();
  const [SelectedPackages, setSelectedPackages] = useState([]);
  const [CR, setCR] = useState(null);

  const { data: ServicePackages } = useRequestGetQuery({
    path: "/account_management/services/service/",
  });
  const { data: ServiceClasses } = useRequestGetQuery({
    path: "/account_management/class/",
  });
  const { data: Instructors } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { data: Locations } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const { data: Schools } = useRequestGetQuery({
    path: "/account_management/schools/",
  });
  const { data: Leads } = useRequestGetQuery({
    path: "/account_management/how_did_you_hear_us/",
  });
  const [requestPost] = useRequestPostMutation();

  const staffOptions = useMemo(
    () =>
      ActiveData(Instructors)?.map((staff) => ({
        value: staff?.id,
        label: `${staff?.first_name} ${staff?.last_name}`,
      })),
    [Instructors],
  );

  const locationOptions = useMemo(
    () =>
      ActiveData(Locations)?.map((location) => ({
        value: location?.id,
        label: location?.name,
      })),
    [Locations],
  );

  const schoolOptions = useMemo(
    () =>
      ActiveData(Schools)?.map((school) => ({
        value: school?.id,
        label: school?.name,
      })),
    [Schools],
  );

  const leadOptions = useMemo(
    () =>
      ActiveData(Leads)?.map((lead) => ({
        value: lead?.id,
        label: lead?.name,
      })),
    [Leads],
  );

  const classes = useMemo(
    () =>
      ActiveData(ServiceClasses)?.map((item) => ({
        value: item?.id,
        label: `${item?.details} | ${item?.note}`,
      })),
    [ServiceClasses],
  );

  const classesItem = useMemo(
    () =>
      ServiceClasses?.filter((item) => item?.id === CR).reduce(
        (_, acc) => ({
          name: `${acc?.details} | ${acc?.note}`,
          start_date: acc?.start_date,
          end_Data: acc?.end_Data,
        }),
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
      ActiveData(ServicePackages)?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })),
    [ServicePackages],
  );

  const filteredOptions = packages?.filter(
    (pkg) => !SelectedPackages.includes(pkg?.value),
  );

  const totalPrice = filteredPackages?.reduce(
    (cur, acc) => cur + acc?.price,
    0,
  );

  const onFinish = async (values) => {
    try {
      const responseStudent = await requestPost({
        path: "/student_account/student/",
        data: {
          ...values,
          dl_given_date: values.dl_given_date?.format("YYYY-MM-DD"),
          dl_expire_date: values.dl_expire_date?.format("YYYY-MM-DD"),
          extension_data: values.extension_data?.format("YYYY-MM-DD"),
          birth: values.birth?.format("YYYY-MM-DD"),
          type: 3,
          password: Date.now(),
        },
      }).catch(console.error);

      if (responseStudent?.data?.email) {
        await requestPost({
          path: "/communication/send_template",
          data: {
            template: 1,
            to: [responseStudent?.data?.id],
          },
        });
      }

      if (responseStudent?.error?.status >= 400) {
        Modal.error({
          title: "Error message",
          content: (
            <Timeline
              items={Object.values(responseStudent?.error?.data).map(
                (item) => ({ children: item[0] }),
              )}
            />
          ),
        });
      } else {
        const responseEnrollment = await requestPost({
          path: "/student_account/enrollment/",
          data: {
            code: 1,
            cr: values?.cr,
            cr_start: classesItem?.start_date,
            cr_end: classesItem?.end_Data,
            student: responseStudent?.data?.id,
            by: responseStudent?.data?.staff,
            package: values?.package,
            price: totalPrice,
          },
        }).catch(console.error);

        if (responseEnrollment?.error?.status >= 400) {
          Modal.error({
            title: "Error message",
            content: (
              <Timeline
                items={Object.values(responseStudent?.error?.data).map(
                  (item) => ({ children: item[0] }),
                )}
              />
            ),
          });
        } else {
          Modal.success({
            title: "Success",
            onOk: () => {
              form.resetFields();
              setSelectedPackages([]);
            },
          });
        }
      }
    } catch (e) {
      console.warn(e);
    }
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

        <Form
          layout={"vertical"}
          form={form}
          onFinish={onFinish}
          className={"space-y-5"}
        >
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
                        Tax: $0 Coupon: ${totalPrice}
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
            <div className="space-y-2.5 w-1/2">
              <Title level={3} fontSize={"text-2xl"}>
                Student information type
              </Title>
              <Paragraph fontSize={"text-gray-500"}>
                Select the package to enroll students
              </Paragraph>

              <Form.Item name={"information_type"}>
                <Select
                  className={"h-[50px]"}
                  placeholder={"Select type"}
                  options={[
                    { value: "Teen", label: "Teen" },
                    { value: "Adult", label: "Adult" },
                    { value: "Knowledge Test", label: "Knowledge Test" },
                    { value: "Road Test", label: "Road Test" },
                  ]}
                />
              </Form.Item>
            </div>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.information_type !== currentValues.information_type
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("information_type") ? (
                  <div className={"space-y-5"}>
                    <div className={"grid grid-cols-2 gap-5"}>
                      <div className="space-y-5">
                        <Form.Item name={"staff"} label={"Assign to staff"}>
                          <Select
                            options={staffOptions}
                            placeholder={"Account #"}
                            className={"h-[50px]"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"location"}
                          label={"Assign to Location"}
                        >
                          <Select
                            options={locationOptions}
                            placeholder={"Select Location"}
                            className={"h-[50px]"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"first_name"}
                          label={"First name"}
                          rules={[
                            {
                              required: true,
                              message: "Please input First name!",
                            },
                          ]}
                        >
                          <Input
                            className="h-[50px]"
                            placeholder={"First name"}
                          />
                        </Form.Item>

                        <Form.Item name={"mid_name"} label={"Middle name"}>
                          <Input
                            className="w-full h-[50px]"
                            placeholder={"Middle name"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"last_name"}
                          label={"Last name"}
                          rules={[
                            {
                              required: true,
                              message: "Please input Last name!",
                            },
                          ]}
                        >
                          <Input
                            className="h-[50px]"
                            placeholder={"Last name"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"address"}
                          label={"Address"}
                          rules={[
                            {
                              required: true,
                              message: "Please input address!",
                            },
                          ]}
                        >
                          <Input
                            className="h-[50px] "
                            placeholder={"address"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"city"}
                          label={"City"}
                          rules={[
                            { required: true, message: "Please input city!" },
                          ]}
                        >
                          <Input className="h-[50px]" placeholder={"City"} />
                        </Form.Item>

                        <Form.Item
                          name={"state"}
                          label={"State"}
                          rules={[
                            { required: true, message: "Please select state!" },
                          ]}
                        >
                          <Select
                            options={[{ value: "USA", label: "USA" }]}
                            placeholder={"Select state"}
                            className={"h-[50px]"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"zip"}
                          label={"Zip/Postal code"}
                          rules={[
                            { required: true, message: "Please input zip!" },
                          ]}
                        >
                          <Input className="h-[50px] " placeholder={"Zip"} />
                        </Form.Item>

                        <Form.Item
                          name={"home_phone"}
                          label={"Home Phone"}
                          rules={[
                            {
                              required: true,
                              message: "Please input Home Phone!",
                            },
                          ]}
                        >
                          <Input
                            className="h-[50px] "
                            placeholder={"Home Phone"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"cell_phone"}
                          label={"Cell Phone"}
                          rules={[
                            {
                              required: true,
                              message: "Please input Cell Phone!",
                            },
                          ]}
                        >
                          <Input
                            className="h-[50px] "
                            placeholder={"Cell Phone"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"email"}
                          label={"Email"}
                          rules={[{ required: true, type: "email" }]}
                        >
                          <Input
                            type={"email"}
                            className="h-[50px]"
                            placeholder={"Email"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"gender"}
                          label={"Gender"}
                          rules={[
                            {
                              required: true,
                              message: "Please select gender!",
                            },
                          ]}
                        >
                          <Radio.Group>
                            <Radio value={"Male"}>Male</Radio>
                            <Radio value={"Female"}>Female</Radio>
                            <Radio value={"Other"}>Other</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item
                          name={"preferred_pronoun"}
                          label={"Preferred Pronoun"}
                          rules={[
                            {
                              required: true,
                              message: "Please select preferred pronoun!",
                            },
                          ]}
                        >
                          <Select
                            options={[
                              { label: "She/Her", value: "She" },
                              { label: "He/Him", value: "He" },
                              { label: "Other", value: "Other" },
                            ]}
                            placeholder={"Select preferred pronoun"}
                            className={"h-[50px]"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"medical_condition"}
                          label={"Medical condition"}
                        >
                          <Input.TextArea placeholder={"Text"} />
                        </Form.Item>

                        <Form.Item name={"note"} label={"Student Notes"}>
                          <Input.TextArea placeholder={"Text"} />
                        </Form.Item>

                        <Form.Item
                          name={"driving_note"}
                          label={"Student driving notes"}
                        >
                          <Input.TextArea placeholder={"Text"} />
                        </Form.Item>
                      </div>

                      <div className="space-y-5">
                        <Form.Item
                          name={"birth"}
                          label={"Birth"}
                          rules={[
                            {
                              required: true,
                              message: "Please input birth date!",
                            },
                          ]}
                        >
                          <DatePicker
                            className={`w-full h-[50px] `}
                            placeholder={"Select birth date"}
                          />
                        </Form.Item>

                        <Form.Item name={"dl_permit"} label={"DL/Permit"}>
                          <Input
                            className="h-[50px]"
                            placeholder={"DL/Permit"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"dl_given_date"}
                          label={"DL Given Date"}
                          rules={[
                            {
                              required: true,
                              message: "Please input DL given date!",
                            },
                          ]}
                        >
                          <DatePicker
                            className={`w-full h-[50px]`}
                            placeholder={"Select DL given date"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"dl_expire_date"}
                          label={"DL Expire Date"}
                          rules={[
                            {
                              required: true,
                              message: "Please input DL expire date!",
                            },
                          ]}
                        >
                          <DatePicker
                            className={`w-full h-[50px]`}
                            placeholder={"Select DL expire date"}
                          />
                        </Form.Item>

                        <Form.Item
                          name="scheduling"
                          valuePropName="checked"
                          label={"Disable Self Scheduling"}
                        >
                          <Checkbox />
                        </Form.Item>

                        <Form.Item
                          name="payment"
                          valuePropName="checked"
                          label={"Payment Plan"}
                        >
                          <Checkbox />
                        </Form.Item>

                        <Form.Item
                          name={"extension_data"}
                          label={"Extension Date"}
                          rules={[
                            {
                              required: true,
                              message: "Please input extension date!",
                            },
                          ]}
                        >
                          <DatePicker
                            className={`w-full h-[50px]`}
                            placeholder={"Select extension date"}
                          />
                        </Form.Item>

                        <Form.Item name={"high_school"} label={"High School"}>
                          <Select
                            options={schoolOptions}
                            placeholder={"Select School"}
                            className={"h-[50px]"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"lead"}
                          label={"Lead"}
                          rules={[
                            { required: true, message: "Please select lead!" },
                          ]}
                        >
                          <Select
                            options={leadOptions}
                            placeholder={"Select Lead"}
                            className={"h-[50px]"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"username"}
                          label={"Username"}
                          rules={[
                            {
                              required: true,
                              message: "Please input username!",
                            },
                          ]}
                        >
                          <Input
                            className="h-[50px]"
                            placeholder={"Username"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"parent_name"}
                          label={"Parent name"}
                          rules={[
                            {
                              required: true,
                              message: "Please input Parent name!",
                            },
                          ]}
                        >
                          <Input
                            className="h-[50px] "
                            placeholder={"Parent name"}
                          />
                        </Form.Item>

                        <Form.Item name={"parent_phone"} label={"Parent phone"}>
                          <Input
                            className="h-[50px]"
                            placeholder={"Parent phone"}
                          />
                        </Form.Item>

                        <Form.Item name={"parent_email"} label={"Parent email"}>
                          <Input
                            type={"email"}
                            className="wh-[50px]"
                            placeholder={"Email"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"parent_2_name"}
                          label={"Parent name 2"}
                          rules={[
                            {
                              required: true,
                              message: "Please input Parent name!",
                            },
                          ]}
                        >
                          <Input
                            className="h-[50px]"
                            placeholder={"Parent name"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"parent_2_phone"}
                          label={"Parent phone 2"}
                        >
                          <Input
                            className="h-[50px]"
                            placeholder={"Parent phone"}
                          />
                        </Form.Item>

                        <Form.Item
                          name={"parent_2_email"}
                          label={"Parent email 2"}
                        >
                          <Input
                            type={"email"}
                            className="h-[50px]"
                            placeholder={"Email"}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="flex gap-5 justify-center">
                      <Button
                        htmlType={"submit"}
                        size={"large"}
                        className={"bg-[#24C18F] text-white"}
                      >
                        Save
                      </Button>

                      <Form.Item name={"method"}>
                        <CustomSelect
                          placeholder={"Apply Payment & Save"}
                          options={[
                            {
                              value: "Process Credit card",
                              label: "Process Credit card",
                            },
                            {
                              value: "Enter Swiped Transaction",
                              label: "Enter Swiped Transaction",
                            },
                            {
                              value: "Enter Cash Payment",
                              label: "Enter Cash Payment",
                            },
                            {
                              value: "Enter Check Payment",
                              label: "Enter Check Payment",
                            },
                          ]}
                          className={"h-10 text-center"}
                          selectorBg={colorsObject.info}
                          colorTextPlaceholder={colorsObject.main}
                          colorBorder={colorsObject.info}
                        />
                      </Form.Item>
                    </div>
                  </div>
                ) : null
              }
            </Form.Item>
          </article>
        </Form>
      </section>
    </>
  );
};

export default Enrollment;
