import { Crypto } from "@/auth/crypto.jsx";
import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { ModalReducer } from "@/hooks/reducer.jsx";
import {
  useRequestGetQuery,
  useRequestIdQuery,
  useRequestPatchMutation,
} from "@/redux/query/index.jsx";
import { Form, DatePicker, Radio, ConfigProvider, Input } from "antd";
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import useSessionStorageState from "use-session-storage-state";
import moment from "moment";

export const ProfileForm = () => {
  const { data: locationData } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const { data: instructorData } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { studentId } = useParams();
  const { colorsObject } = useContext(ColorsContext);
  const [form] = Form.useForm();
  const [user, setUser] = useSessionStorageState("user", {
    defaultValue: null,
  });
  const [userData, setUserData] = useState(undefined);
  const [requestPatch, { reset }] = useRequestPatchMutation();
  const [state, dispatch] = useReducer(ModalReducer, { modal: null });
  const [IsOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const { decrypted } = Crypto(user, import.meta.env.VITE_SECRET_KEY);
    setUserData(decrypted);
  }, [user]);

  const { data: studentData, isLoading: isStudent } = useRequestIdQuery({
    path: "/student_account/student",
    id: userData?.id ?? studentId,
  });

  const locations = useMemo(
    () =>
      locationData
        ?.filter((location) => location.status === "ACTIVE")
        .map((location) => ({
          value: location.id,
          label: location.name,
        })),
    [locationData],
  );

  const instructors = useMemo(
    () =>
      instructorData
        ?.filter((staff) => staff.status === "ACTIVE")
        .map((staff) => ({
          value: staff.id,
          label: `${staff.first_name} ${staff.last_name}`,
        })),
    [instructorData],
  );

  useEffect(() => {
    form.setFieldsValue({
      ...studentData,
      staff: studentData?.staff,
      location: studentData?.location,
      birth: moment(studentData?.birth),
      car_permit_data: moment(studentData?.car_permit_data),
      car_permit_expire: moment(studentData?.car_permit_expire),
    });
  }, [form, studentData]);

  const onFinish = useCallback(
    async (values) => {
      try {
        const data = {
          ...values,
          birth: values.birth?.format("YYYY-MM-DD"),
          car_permit_data: values.car_permit_data?.format("YYYY-MM-DD"),
          car_permit_expire: values.car_permit_expire?.format("YYYY-MM-DD"),
        };

        await requestPatch({
          path: "/student_account/student",
          id: userData?.id ?? studentId,
          data,
        })
          .unwrap()
          .then((response) => {
            dispatch({
              type: "SUCCESS",
              open: IsOpen,
              onEvent: () => {
                setIsOpen(false);
                reset();
              },
            });

            const { encrypted } = Crypto(
              {
                username: response?.username,
                email: response?.email,
                usertype: 3,
                admin_portal: false,
                student_portal: true,
                super_user_portal: false,
              },
              import.meta.env.VITE_SECRET_KEY,
            );

            setUser(encrypted);
          });
      } catch (e) {
        console.error(e);
        dispatch({
          type: "ERROR",
          open: IsOpen,
          onEvent: () => setIsOpen(false),
          data: {},
        });
      }
    },
    [IsOpen],
  );

  const firstColumn = [
    {
      label: "Assign to Staff",
      name: "staff",
      component: (
        <CustomSelect
          placeholder="Assign to Staff"
          className="h-[50px]"
          options={instructors}
          disable={isStudent}
        />
      ),
    },
    {
      label: "Location",
      name: "location",
      component: (
        <CustomSelect
          placeholder="Location"
          className="h-[50px]"
          options={locations}
          disable={isStudent}
        />
      ),
    },
    {
      label: "First name",
      name: "first_name",
      required: true,
      component: (
        <Input
          className={"w-full h-[50px]"}
          disable={isStudent}
          placeholder={"First name"}
        />
      ),
    },
    {
      label: "Middle name",
      name: "mid_name",
      component: (
        <Input
          className={"w-full h-[50px]"}
          disable={isStudent}
          placeholder={"Middle name"}
        />
      ),
    },
    {
      label: "Last name",
      name: "last_name",
      required: true,
      component: (
        <Input
          className={"w-full h-[50px]"}
          disable={isStudent}
          placeholder="Last name"
        />
      ),
    },
    {
      label: "Address",
      name: "address",
      required: true,
      component: (
        <Input
          className={"w-full h-[50px]"}
          disable={isStudent}
          placeholder="Address"
        />
      ),
    },
    {
      label: "City",
      name: "city",
      required: true,
      component: (
        <Input
          className={"w-full h-[50px]"}
          disable={isStudent}
          placeholder="City"
        />
      ),
    },
    {
      label: "State",
      name: "state",
      required: true,
      component: (
        <CustomSelect
          placeholder="State"
          className="h-[50px]"
          options={[{ value: "USA", label: "USA" }]}
        />
      ),
    },
    {
      label: "Zip Code",
      name: "zip",
      component: (
        <Input
          className={"w-full h-[50px]"}
          disable={isStudent}
          placeholder="Zip"
        />
      ),
    },
    {
      label: "Home phone",
      name: "home_phone",
      component: (
        <Input
          className={"w-full h-[50px]"}
          disable={isStudent}
          placeholder="phone number"
        />
      ),
    },
    {
      label: "Cell Phone",
      name: "cell_phone",
      required: true,
      component: (
        <Input
          disable={isStudent}
          className={"w-full h-[50px]"}
          placeholder="phone"
        />
      ),
    },
    {
      label: "Email",
      name: "email",
      required: true,
      type: "email",
      component: (
        <Input
          className={"w-full h-[50px]"}
          classNames="w-full"
          placeholder="email"
          disable={isStudent}
        />
      ),
    },
  ];

  const secondColumn = [
    {
      label: "Emergency Contact Name",
      name: "parent_name",
      component: (
        <Input
          className={"w-full h-[50px]"}
          placeholder="Emergency Contact Name"
          disable={isStudent}
        />
      ),
    },
    {
      label: "Emergency Contact Phone",
      name: "parent_phone",
      component: (
        <Input
          className={"w-full h-[50px]"}
          placeholder="Emergency Contact Phone"
          disable={isStudent}
        />
      ),
    },
    {
      label: "Emergency Contact Relation",
      name: "parent_email",
      component: (
        <Input
          className={"w-full h-[50px]"}
          placeholder="Emergency Contact Relation"
          disable={isStudent}
        />
      ),
    },
    {
      label: "Permit#",
      name: "dl_permit",
      component: (
        <Input
          disable={isStudent}
          className={"w-full h-[50px]"}
          placeholder="Permit"
        />
      ),
    },
    {
      label: "Permit Issued Date",
      name: "car_permit_data",
      component: (
        <DatePicker
          disable={isStudent}
          className="w-full h-[50px] border-[#667085]"
        />
      ),
    },
    {
      label: "Permit Expiration Date",
      name: "car_permit_expire",
      component: (
        <DatePicker
          disable={isStudent}
          className="w-full h-[50px] border-[#667085]"
        />
      ),
    },
    {
      label: "Username",
      name: "username",
      required: true,
      component: (
        <Input
          disable={isStudent}
          className={"w-full h-[50px]"}
          placeholder="Username"
        />
      ),
    },
  ];

  return (
    <Fragment>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
          <div className="space-y-5">
            {firstColumn.map((item, index) => (
              <Form.Item
                key={index}
                label={item.label}
                name={item.name}
                rules={
                  item.required
                    ? [
                        {
                          required: true,
                          message: `Please input your ${item.label.toLowerCase()}!`,
                          type: item.type,
                        },
                      ]
                    : []
                }
              >
                {item.component}
              </Form.Item>
            ))}
          </div>
          <div className="space-y-5">
            <Form.Item
              label="Birth"
              name="birth"
              rules={[{ required: true, message: "Please input your birth!" }]}
            >
              <DatePicker className="w-full h-[50px] border-[#667085]" />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select gender!" }]}
            >
              <Radio.Group>
                <ConfigProvider
                  theme={{
                    components: {
                      Radio: {
                        radioSize: 20,
                        dotColorDisabled: colorsObject.primary,
                        colorBorder: colorsObject.primary,
                      },
                    },
                  }}
                >
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                  <Radio value="Other">Other</Radio>
                </ConfigProvider>
              </Radio.Group>
            </Form.Item>
            {secondColumn.map((item, index) => (
              <Form.Item
                className={"relative"}
                key={index}
                label={item.label}
                name={item.name}
                rules={
                  item.required
                    ? [
                        {
                          required: true,
                          message: `Please input your ${item.label.toLowerCase()}!`,
                        },
                      ]
                    : []
                }
              >
                {item.component}
              </Form.Item>
            ))}
          </div>
        </div>
        <div className="text-center pt-10">
          <ButtonComponent
            type="submit"
            defaultBg={colorsObject.secondary}
            defaultHoverBg={colorsObject.secondaryHover}
            borderRadius={5}
            paddingInline={44}
            onClick={() => setIsOpen(true)}
          >
            UPDATE
          </ButtonComponent>
        </div>
      </Form>
      {state?.modal}
    </Fragment>
  );
};
