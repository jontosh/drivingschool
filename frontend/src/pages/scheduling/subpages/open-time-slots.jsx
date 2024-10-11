import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Modal, Select, Switch, Timeline } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { ActiveData, useFilterStatus } from "@/hooks/filter.jsx";
import {
  useRequestGetQuery,
  useRequestPatchMutation,
} from "@/redux/query/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import dayjs from "dayjs";
import { CheckProgress } from "@/modules/progress.jsx";

export const OpenTimeSlots = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [Filter, setFilter] = useState(false);
  const [Search, setSearch] = useState("");
  const [form] = Form.useForm();
  const [TimeSlotList, setTimeSlotList] = useState([]);

  const { data: Instructors } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { data: Locations } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const { data: Vehicles } = useRequestGetQuery({
    path: "/account_management/vehicle/",
  });
  const { data: TimeSlots, refetch } = useRequestGetQuery({
    path: "/scheduling/time_slot/",
  });
  const [requestPatch] = useRequestPatchMutation();

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
  const vehiclesOptions = useMemo(
    () =>
      ActiveData(Vehicles)?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })),
    [Vehicles],
  );
  const timeSlots = useMemo(() => {
    const newTimeSlots = [];
    TimeSlots?.forEach((timeSlot) => {
      timeSlot?.slots?.forEach((slot) => {
        newTimeSlots.push({
          ...timeSlot,
          time: `${dayjs(slot?.start)?.format("DD/MM/YYYY")} ${dayjs(slot?.start)?.format("hh:mm A")}-${dayjs(slot?.end)?.format("hh:mm A")}`,
          vehicle_name: Vehicles?.find(
            (vehicle) => vehicle?.id === timeSlot?.vehicle,
          )?.name,
        });
      });
    });
    return newTimeSlots;
  }, [TimeSlots]);

  const { Data } = useFilterStatus({ data: TimeSlotList, search: Search });

  useEffect(() => {
    if (timeSlots?.length !== 0) {
      setTimeSlotList(timeSlots);
    }
  }, [timeSlots]);

  const onFinish = async (values) => {
    const filtered = timeSlots?.filter((timeSlot) => {
      const isInstructorValid = values.instructor === timeSlot.staff;
      const isLocationValid = values.location === timeSlot?.location;
      const isStatusValid = values.status === timeSlot.status;
      const isVehicleValid = values.vehicle === timeSlot?.vehicle;
      const isWeekdaysValid = values.weekdays?.every((day) =>
        timeSlot.week_range.includes(day),
      );

      return (
        isInstructorValid ||
        isLocationValid ||
        isStatusValid ||
        isVehicleValid ||
        isWeekdaysValid
      );
    });

    setTimeSlotList(filtered);
    setFilter(filtered?.length !== 0);
  };

  const onAdd = async () => {
    console.log("ok");
  };

  const onReset = () => {
    form.resetFields();
    setFilter(false);
  };

  const columns = [
    {
      title: "Date/Start and End Time",
      dataIndex: "time",
      key: "time",
      align: "center",
      render: (time) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {time}
        </Paragraph>
      ),
    },
    {
      title: "Instructor",
      dataIndex: "staff_name",
      key: "staff_name",
      align: "center",
      render: (instructor) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {instructor}
        </Paragraph>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const { bg, hover } = CheckProgress(status);
        return (
          <ButtonComponent
            defaultHoverBg={hover}
            defaultBg={bg}
            defaultHoverColor={colorsObject.main}
            defaultColor={colorsObject.main}
            controlHeight={30}
            borderRadius={5}
            style={{ width: 94 }}
          >
            {status?.toUpperCase()}
          </ButtonComponent>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {type}
        </Paragraph>
      ),
    },
    {
      title: "Vehicle",
      dataIndex: "vehicle_name",
      key: "vehicle",
      align: "center",
      render: (vehicle) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {vehicle}
        </Paragraph>
      ),
    },
    {
      title: "Location",
      dataIndex: "location_name",
      key: "location_name",
      align: "center",
      render: (location) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {location}
        </Paragraph>
      ),
    },
    {
      title: "Pickup Location",
      dataIndex: "pu_location",
      key: "pu_location",
      align: "center",
      render: (pickup) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {pickup}
        </Paragraph>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 110,
      render: (_, record) => {
        const onDelete = async () => {
          try {
            const { error } = await requestPatch({
              path: "/scheduling/time_slot",
              id: record?.id,
              data: { ...record, status: "DELETED" },
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
                title: "Success message",
                onOk: () => refetch(),
              });
            }
          } catch (e) {
            console.warn(e);
          }
        };
        return (
          <div className={"text-center space-x-2.5"}>
            <IconComponent
              className={"text-xl text-red-600 border border-indigo-600"}
              style={{
                borderRadius: 5,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              icon={<DeleteOutlined />}
              onClick={onDelete}
            />

            <IconComponent
              className={"text-xl text-indigo-500 border border-indigo-600"}
              style={{
                borderRadius: 5,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              icon={<FormOutlined />}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="bg-white py-5 px-5 sm:px-9">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-5">
              <div className="flex items-center space-x-5">
                <ButtonComponent
                  defaultBg={colorsObject.info}
                  defaultHoverBg={colorsObject.infoHover}
                  borderRadius={5}
                  paddingInline={20}
                  className={"mt-6"}
                  type={"button"}
                  onClick={onAdd}
                >
                  Add new
                </ButtonComponent>

                <Form.Item
                  label="Instructor"
                  className="w-full m-0"
                  name={"staff"}
                >
                  <Select
                    placeholder={"Select"}
                    options={instructorsOptions}
                    className={"h-[50px]"}
                  />
                </Form.Item>
              </div>

              <Form.Item label="Select date" name={"date"}>
                <DatePicker.RangePicker className="w-full h-[50px]" />
              </Form.Item>

              <Form.Item label="Time filter" name={"time"}>
                <Select
                  placeholder={"Time filter"}
                  options={[
                    {
                      value: "before",
                      label: "Before noon",
                    },
                    {
                      value: "after",
                      label: "After noon",
                    },
                    {
                      value: "pm",
                      label: "After 3pm",
                    },
                  ]}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="Weekdays" name={"weekdays"}>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder={"Weekdays"}
                  options={[
                    {
                      value: "Monday",
                      label: "Monday",
                    },
                    {
                      value: "Tuesday",
                      label: "Tuesday",
                    },
                    {
                      value: "Wednesday",
                      label: "Wednesday",
                    },
                    {
                      value: "Thursday",
                      label: "Thursday",
                    },
                    {
                      value: "Friday",
                      label: "Friday",
                    },
                    {
                      value: "Saturday",
                      label: "Saturday",
                    },
                    {
                      value: "Sunday",
                      label: "Sunday",
                    },
                  ]}
                  className={"h-[50px]"}
                />
              </Form.Item>
            </div>

            <div className="space-y-5">
              <Form.Item label="Vehicle" name={"vehicle"}>
                <Select
                  placeholder={"Select"}
                  options={vehiclesOptions}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="Location" name={"location"}>
                <Select
                  placeholder={"Select"}
                  options={locationsOptions}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item label="Appointment type" name={"type"}>
                <Select
                  placeholder={"Select"}
                  options={[
                    {
                      value: "Single Appointment(Driver Only)Road",
                      label: "Single Appointment (Driver Only)",
                    },
                    {
                      value: "Road Test(DriverOnly)",
                      label: "Road Test (Driver Only)",
                    },
                  ]}
                  className={"h-[50px]"}
                />
              </Form.Item>

              <Form.Item
                label="Displayed In Student Center"
                name={"student_center"}
              >
                <Switch />
              </Form.Item>
            </div>
          </div>

          <div className="flex max-[580px]:flex-col justify-center gap-5 pt-5">
            <ButtonComponent
              defaultHoverBg={"#24C18F"}
              defaultBg={"#24C18F"}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              borderRadius={5}
              controlHeight={40}
              paddingInline={98}
              type={"submit"}
            >
              Filter
            </ButtonComponent>
            <ButtonComponent
              defaultHoverBg={colorsObject.secondary}
              defaultBg={colorsObject.secondary}
              defaultHoverColor={colorsObject.main}
              defaultColor={colorsObject.main}
              borderRadius={5}
              controlHeight={40}
              paddingInline={98}
              type={"reset"}
              onClick={onReset}
            >
              Clear
            </ButtonComponent>
          </div>
        </Form>
      </div>

      {Filter && (
        <div className={"mt-5 px-5 py-6 bg-white"}>
          <div
            className={
              "flex max-[880px]:flex-col max-[880px]:space-y-5 justify-between items-center"
            }
          >
            <Input
              className={"h-[50px]"}
              placeholder={"Search"}
              prefix={<AiOutlineSearch className={"text-xl"} />}
              allowClear
              enterButton="Search"
              onChange={({ target }) => setSearch(target?.value)}
            />
          </div>

          <div className={"-mx-5 pt-5"}>
            <TableComponent
              columns={columns}
              data={Data}
              pagination
              scroll={{ x: 1050 }}
            />
          </div>
        </div>
      )}
    </>
  );
};
