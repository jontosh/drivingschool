import ButtonComponent from "@/components/button/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Alert, DatePicker, Form, Select } from "antd";
import { useContext, useState } from "react";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import dayjs from "dayjs";
import { ExcelExport } from "@/modules/export-xlsx.jsx";

export const ActivityLogs = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [IsExport, setIsExport] = useState(false);
  const [form] = Form.useForm();
  const [AlertType, setAlertType] = useState("error");

  const { data: Logs } = useRequestGetQuery({ path: "/communication/logs/" });
  const { data: Students } = useRequestGetQuery({
    path: "/student_account/student/",
  });

  const onFinish = async (values) => {
    const filtered = Logs?.filter((item) => {
      return (
        values?.method === item?.method ||
        dayjs(values?.time)?.format("YYYY-MM-DD") ===
          dayjs(item?.time)?.format("YYYY-MM-DD")
      );
    });

    if (filtered?.length !== 0) {
      const data = filtered?.map((item) => {
        const student = Students?.find((student) => student?.id === item?.user);
        return {
          ...item,
          user: `${student?.first_name} ${student?.last_name}`,
        };
      });
      ExcelExport({ data, fileName: "LOGS" });
    }

    setAlertType(filtered?.length !== 0 ? "success" : "error");
    setIsExport(true);
  };

  const onClear = () => {
    form.resetFields();
    setIsExport(false);
  };

  return (
    <>
      <div className={"bg-white py-5 px-5 sm:px-9"}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          className={"min-[850px]:w-[50%] m-auto"}
        >
          {IsExport && (
            <Form.Item>
              <Alert
                message={`${AlertType.toUpperCase()} download`}
                type={AlertType}
                closable
                showIcon
                onClose={onClear}
              />
            </Form.Item>
          )}

          <Form.Item label="Log type" name={"method"}>
            <Select
              placeholder={"Select"}
              options={[
                {
                  value: "login",
                  label: "LOGIN",
                },
                {
                  value: "logout",
                  label: "LOGOUT",
                },
              ]}
              className={"h-[50px]"}
            />
          </Form.Item>

          <Form.Item label="Select date" name={"time"}>
            <DatePicker className="w-full h-[50px] " />
          </Form.Item>

          <div className="flex max-[600px]:flex-col justify-center gap-5 pt-5">
            <ButtonComponent
              defaultHoverBg={"#24C18F"}
              defaultBg={"#24C18F"}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              borderRadius={5}
              paddingInline={98}
              type={"submit"}
            >
              Export
            </ButtonComponent>
            <ButtonComponent
              defaultHoverBg={colorsObject.secondary}
              defaultBg={colorsObject.secondary}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              borderRadius={5}
              paddingInline={98}
              type={"reset"}
              onClick={onClear}
            >
              Clear
            </ButtonComponent>
          </div>
        </Form>
      </div>
    </>
  );
};
