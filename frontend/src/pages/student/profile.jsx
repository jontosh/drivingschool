import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Emergency } from "@/pages/student/emergency.jsx";
import {
  useRequestGetQuery,
  useRequestIdQuery,
  useRequestPatchMutation,
  useRequestPostMutation,
} from "@/redux/query/index.jsx";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import ProfileStyle from "./student-account.module.scss";
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  QRCode,
  Radio,
  Select,
  Timeline,
} from "antd";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import moment from "moment";
import { useURLSearchParams } from "@/hooks/useURLSearchParams.jsx";
import { ActiveData } from "@/hooks/filter.jsx";

const Profile = () => {
  const { colorsObject } = useContext(ColorsContext);
  const studentId = useURLSearchParams("studentId");
  const [requestPatch] = useRequestPatchMutation();
  const [requestPost] = useRequestPostMutation();
  const { data, isLoading, isSuccess } = useRequestIdQuery({
    path: "/student_account/student",
    id: studentId,
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

  const [IsMore, setIsMore] = useState(false);
  const [form] = Form.useForm();

  const instructorsOptions = useMemo(
    () =>
      ActiveData(Instructors)?.map((item) => ({
        value: item?.id,
        label: `${item?.first_name} ${item?.last_name}`,
      })),
    [Instructors],
  );
  const locationsOptions = useMemo(
    () =>
      ActiveData(Locations)?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })),
    [Locations],
  );
  const schoolsOptions = useMemo(
    () =>
      ActiveData(Schools)?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })),
    [Schools],
  );

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({
        ...data,
        birth: moment(data.birth),
        dl_given_date: moment(data.dl_given_date),
        dl_expire_date: moment(data.dl_expire_date),
        extension_data: moment(data.extension_data || moment()),
        _disable_self_scheduling: false,
        _payment_plan: false,
      });
    }
  }, [isSuccess, data, form]);

  const handleMore = () => setIsMore((prev) => !prev);
  const handleUsernameAndPassword = async () => {
    try {
      const { error } = await requestPost({
        path: "/communication/send_template/",
        data: {
          template: 4,
          to: [studentId],
        },
      });

      if (error?.status >= 400) {
        Modal.error({
          title: "Error message",
          content: (
            <Timeline
              items={Object.values(error?.data).map((item) => ({
                children: item[0],
              }))}
            />
          ),
        });
      } else {
        Modal.success({
          title: "Success",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async (values) => {
    try {
      const formattedValues = {
        ...values,
        birth: values.birth?.format("YYYY-MM-DD"),
        dl_given_date: values.dl_given_date?.format("YYYY-MM-DD"),
        dl_expire_date: values.dl_expire_date?.format("YYYY-MM-DD"),
        extension_data: values.extension_data?.format("YYYY-MM-DD"),
      };

      const { error } = await requestPatch({
        path: "/student_account/student",
        data: formattedValues,
        id: studentId,
      });
      if (error?.status >= 400) {
        Modal.error({
          title: "Error message",
          content: (
            <Timeline
              items={Object.values(error?.data).map((item) => ({
                children: item[0],
              }))}
            />
          ),
        });
      } else {
        Modal.success({
          title: "Success",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Form
        layout={"vertical"}
        form={form}
        onFinish={onFinish}
        disabled={isLoading}
      >
        <div className="space-y-5 min-[1200px]:space-y-0 min-[1200px]:flex min-[1200px]:flex-row items-center gap-y-7 min-[1200px]:gap-x-7 pb-6 border-b border-b-indigo-700 px-5">
          <div
            className={`rounded-2xl border-2 border-indigo-700 w-full min-[1200px]:w-[460px] overflow-hidden`}
          >
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <Map
                defaultCenter={{ lat: 22.54992, lng: 32 }}
                defaultZoom={3}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
                className="h-[310px]"
              />
            </APIProvider>
          </div>
          <div className={"flex-grow"}>
            <div className={`rounded-2xl border-2 border-indigo-700 py-5 px-7`}>
              <Title
                className={"text-center"}
                fontSize={"text-base text-green-600"}
                fontWeightStrong={600}
                titleMarginBottom={10}
              >
                Activated
              </Title>
              <div className={`grid min-[850px]:grid-cols-2 gap-7`}>
                <div className={"space-y-5"}>
                  <Form.Item name={"status"} className={"mb-0"}>
                    <CustomSelect
                      placeholder={"Select Status"}
                      options={[
                        { value: "ACTIVE", label: "ACTIVE" },
                        { value: "DELETED", label: "DELETED" },
                        { value: "PENDING", label: "PENDING" },
                      ]}
                      className={`w-full h-[40px] text-white ${ProfileStyle["Status"]}`}
                      selectorBg={colorsObject.info}
                      colorBorder={colorsObject.info}
                      disabled={isLoading}
                    />
                  </Form.Item>

                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.info}
                    className={"w-full pt-1.5"}
                    borderRadius={5}
                    href={"/admin/student/account/messages/" + studentId}
                  >
                    Send Text
                  </ButtonComponent>
                  <div className="flex gap-5 items-center">
                    <div
                      className={`${ProfileStyle["Student-profile__imageholder-small"]} hidden min-[850px]:block rounded-lg border-2 border-indigo-700`}
                    >
                      <QRCode
                        style={{ width: "100%", height: "100%" }}
                        type="svg"
                        value="https://ant.design/"
                      />
                    </div>

                    <ButtonComponent
                      defaultBg={colorsObject.info}
                      defaultHoverBg={colorsObject.info}
                      className={"flex-grow"}
                      borderRadius={5}
                    >
                      Print
                    </ButtonComponent>
                  </div>
                </div>
                {/*-------------*/}
                <div className={"space-y-5"}>
                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.info}
                    className={"w-full pt-1.5"}
                    borderRadius={5}
                    href={`/student/dashboard/${studentId}`}
                    target={"_blank"}
                  >
                    Access Student Center
                  </ButtonComponent>

                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.info}
                    className={"w-full"}
                    borderRadius={5}
                    onClick={handleUsernameAndPassword}
                  >
                    Username/Password
                  </ButtonComponent>

                  <ButtonComponent
                    defaultBg={colorsObject.info}
                    defaultHoverBg={colorsObject.info}
                    className={"w-full"}
                    borderRadius={5}
                  >
                    Other
                  </ButtonComponent>

                  <div
                    className={`${ProfileStyle["Student-profile__imageholder-small"]} mx-auto min-[850px]:hidden rounded-lg border-2 border-indigo-700`}
                  >
                    <QRCode
                      style={{ width: "100%", height: "100%" }}
                      type="svg"
                      value="https://ant.design/"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-0 sm:p-5 grid lg:grid-cols-2 gap-5 max-[1000px]:grid-cols-1">
          <div className="space-y-5">
            <Form.Item name={"information_type"} label={"Student Type"}>
              <Select
                placeholder={"Type"}
                options={[
                  { value: "Teen", label: "Teen" },
                  { value: "Adult", label: "Adult" },
                  { value: "Knowledge Test", label: "Knowledge Test" },
                  { value: "Road Test", label: "Road Test" },
                ]}
                className={"h-[50px]"}
              />
            </Form.Item>

            <Form.Item name={"staff"} label={"Assign to Staff"}>
              <Select
                placeholder={"Staff"}
                options={instructorsOptions}
                className={"h-[50px]"}
              />
            </Form.Item>

            <Form.Item name={"location"} label={"Assign To Location"}>
              <Select
                placeholder={"location"}
                options={locationsOptions}
                className={"h-[50px]"}
              />
            </Form.Item>

            <Form.Item name={"id"} label={"Student ID"}>
              <Input disabled className={"h-[50px]"} placeholder={"Id"} />
            </Form.Item>

            <Form.Item
              name={"first_name"}
              label={"First Name"}
              rules={[
                {
                  required: true,
                  message: "Please input First Name!",
                },
              ]}
            >
              <Input className={"h-[50px]"} placeholder={"First name"} />
            </Form.Item>

            <Form.Item name={"mid_name"} label={"Middle Name"}>
              <Input className={"h-[50px]"} placeholder={"Middle name"} />
            </Form.Item>

            <Form.Item
              name={"last_name"}
              label={"Last Name"}
              rules={[
                {
                  required: true,
                  message: "Please input last Name!",
                },
              ]}
            >
              <Input className={"h-[50px]"} placeholder={"Last name"} />
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
              <Input className={"h-[50px]"} placeholder={"Address"} />
            </Form.Item>

            <Form.Item
              name={"city"}
              label={"City"}
              rules={[
                {
                  required: true,
                  message: "Please input city!",
                },
              ]}
            >
              <Input className={"h-[50px]"} placeholder={"City"} />
            </Form.Item>

            <Form.Item
              name={"state"}
              label={"State"}
              rules={[
                {
                  required: true,
                  message: "Please select state!",
                },
              ]}
            >
              <Select
                placeholder={"State"}
                options={[{ value: "USA", label: "USA" }]}
                className={"h-[50px]"}
              />
            </Form.Item>

            <Form.Item
              name={"zip"}
              label={"Zip"}
              rules={[
                {
                  required: true,
                  message: "Please input zip!",
                },
              ]}
            >
              <Input className={"h-[50px]"} placeholder={"Zip code"} />
            </Form.Item>

            <Form.Item
              name={"cell_phone"}
              label={"Cell Phone "}
              rules={[
                {
                  required: true,
                  message: "Please input Cell Phone !",
                },
              ]}
            >
              <Input className={"h-[50px]"} placeholder={"Cell phone"} />
            </Form.Item>

            <Form.Item name={"home_phone"} label={"Home Phone"}>
              <Input className={"h-[50px]"} placeholder={"Home phone"} />
            </Form.Item>

            <Form.Item
              name={"email"}
              label={"Email"}
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input className={"h-[50px]"} placeholder={"Email"} />
            </Form.Item>

            <Form.Item
              name={"gender"}
              label={"Gender"}
              rules={[
                {
                  required: true,
                  message: "Choose one of gender!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Other">Other</Radio>
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
                  {
                    value: "He",
                    label: "He",
                  },
                  {
                    value: "She",
                    label: "She",
                  },
                  {
                    value: "Other",
                    label: "Other",
                  },
                ]}
                className={"h-[50px]"}
              />
            </Form.Item>
          </div>
          <div className="space-y-5">
            <Form.Item
              name={"birth"}
              label={"Birthday"}
              rules={[
                {
                  required: true,
                  message: "Please input Birthday!",
                },
              ]}
            >
              <DatePicker disabled={isLoading} className={"w-full h-[50px]"} />
            </Form.Item>

            <Form.Item name={"dl_permit"} label={"DL/Permit #"}>
              <Input placeholder={"DL/Permit"} className={"h-[50px]"} />
            </Form.Item>

            <Form.Item name={"dl_given_date"} label={"DL/Permit Issued"}>
              <DatePicker className={"w-full h-[50px]"} />
            </Form.Item>

            <Form.Item name={"dl_expire_date"} label={"DL Permit Expiration"}>
              <DatePicker disabled={isLoading} className={"w-full h-[50px] "} />
            </Form.Item>

            <Form.Item
              name={"_disable_self_scheduling"}
              label={"Disable Self Scheduling"}
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>

            <Form.Item
              name={"_payment_plan"}
              label={"Payment Plan"}
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>

            <Form.Item
              name={"extension_data"}
              label={"Extension Date (New Deadline)"}
            >
              <DatePicker disabled={isLoading} className={"w-full h-[50px]"} />
            </Form.Item>

            <Form.Item name={"high_school"} label={"High School"}>
              <Select
                placeholder={"High School"}
                options={schoolsOptions}
                className={"h-[50px]"}
              />
            </Form.Item>

            <Form.Item name={"parent_name"} label={"Parent Name"}>
              <Input placeholder={"Parent Name"} className={"h-[50px]"} />
            </Form.Item>

            <Form.Item name={"parent_phone"} label={"Parent Phone"}>
              <Input placeholder={"Parent Phone"} className={"h-[50px]"} />
            </Form.Item>

            <Form.Item
              name={"parent_email"}
              label={"Parent email"}
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input placeholder={"Parent email"} className={"h-[50px]"} />
            </Form.Item>

            {/*  ---------------- */}
            <Form.Item name={"parent_2_name"} label={"Parent Name 2"}>
              <Input placeholder={"Parent Name"} className={"h-[50px]"} />
            </Form.Item>

            <Form.Item name={"parent_2_phone"} label={"Parent Phone 2"}>
              <Input placeholder={"Parent phone"} className={"h-[50px]"} />
            </Form.Item>

            <Form.Item
              name={"parent_2_email"}
              label={"Parent email 2"}
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input placeholder={"Parent email"} className={"h-[50px]"} />
            </Form.Item>
          </div>
        </div>

        {IsMore && (
          <Fragment>
            <div className="space-y-5">
              <div className="grid xl:grid-cols-2 gap-7">
                <div
                  className={"bg-white shadow-2xl space-y-3 rounded-2xl p-5"}
                >
                  <div className="flex items-center justify-between">
                    <Title
                      fontSize={"text-2xl text-indigo-700"}
                      fontWeightStrong={600}
                    >
                      Student notes
                    </Title>

                    <ButtonComponent
                      controlHeight={40}
                      defaultBg={colorsObject.main}
                      defaultHoverBg={colorsObject.main}
                      defaultColor={colorsObject.primary}
                      defaultHoverColor={colorsObject.primary}
                      defaultBorderColor={colorsObject.primary}
                      paddingInline={53}
                      borderRadius={5}
                    >
                      Reset
                    </ButtonComponent>
                  </div>

                  <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
                    <Form.Item
                      className={"flex-grow mb-0 w-full"}
                      name={"note"}
                    >
                      <Input.TextArea
                        className={"border-[#667085]"}
                        placeholder={"Notes"}
                      />
                    </Form.Item>

                    <ButtonComponent
                      defaultBg={colorsObject.success}
                      defaultHoverBg={colorsObject.successHover}
                      defaultColor={colorsObject.main}
                      paddingInline={90}
                      borderRadius={5}
                      type={"submit"}
                    >
                      Save
                    </ButtonComponent>
                  </div>

                  {data?.note !== "" && <article>{data?.note}</article>}
                </div>

                <div
                  className={"bg-white shadow-2xl space-y-3 rounded-2xl p-5"}
                >
                  <div className="flex items-center justify-between">
                    <Title
                      fontSize={"text-2xl text-indigo-700"}
                      fontWeightStrong={600}
                    >
                      Tasks
                    </Title>

                    <ButtonComponent
                      controlHeight={40}
                      defaultBg={colorsObject.main}
                      defaultHoverBg={colorsObject.main}
                      defaultColor={colorsObject.primary}
                      defaultHoverColor={colorsObject.primary}
                      defaultBorderColor={colorsObject.primary}
                      paddingInline={53}
                      borderRadius={5}
                    >
                      Reset
                    </ButtonComponent>
                  </div>
                </div>
              </div>

              <div className="grid xl:grid-cols-2 gap-7">
                <Emergency id={studentId} />

                <div
                  className={"bg-white shadow-2xl space-y-3 rounded-2xl p-5"}
                >
                  <div className="flex items-center justify-between">
                    <Title
                      fontSize={"text-2xl text-indigo-700"}
                      fontWeightStrong={600}
                    >
                      Driving notes
                    </Title>

                    <ButtonComponent
                      controlHeight={40}
                      defaultBg={colorsObject.main}
                      defaultHoverBg={colorsObject.main}
                      defaultColor={colorsObject.primary}
                      defaultActiveColor={colorsObject.primary}
                      defaultHoverColor={colorsObject.primary}
                      defaultBorderColor={colorsObject.primary}
                      paddingInline={53}
                      borderRadius={5}
                    >
                      Reset
                    </ButtonComponent>
                  </div>

                  <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
                    <Input.TextArea
                      className={"border-[#667085]"}
                      placeholder={"Notes"}
                    />

                    <ButtonComponent
                      defaultBg={colorsObject.success}
                      defaultHoverBg={colorsObject.successHover}
                      defaultColor={colorsObject.main}
                      paddingInline={90}
                      borderRadius={5}
                      type={"submit"}
                    >
                      Save
                    </ButtonComponent>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
        <div
          className={`text-center space-y-6 pt-6 ${!IsMore ? "bg-white" : null}`}
        >
          <div>
            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.infoHover}
              paddingInline={43}
              borderRadius={5}
              className={"w-[234px]"}
              onClick={handleMore}
            >
              {IsMore ? "Hide" : "Show more"}
            </ButtonComponent>
          </div>
          <div>
            <ButtonComponent
              defaultBg={colorsObject.success}
              defaultHoverBg={colorsObject.successHover}
              controlHeight={40}
              paddingInline={99}
              borderRadius={5}
              type={"submit"}
            >
              Save
            </ButtonComponent>
          </div>
        </div>
      </Form>
    </Fragment>
  );
};

export default Profile;
