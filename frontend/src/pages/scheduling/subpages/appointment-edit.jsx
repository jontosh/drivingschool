import ButtonComponent from "@/components/button/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import {
  Modal,
  DatePicker,
  Form,
  Input,
  Select,
  Switch,
  Button,
  Timeline,
} from "antd";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  useRequestGetQuery,
  useRequestPatchMutation,
} from "@/redux/query/index.jsx";
import { ActiveData, useFilterStatus } from "@/hooks/filter.jsx";
import TableComponent from "@/components/table/index.jsx";
import { CheckProgress } from "@/modules/progress.jsx";
import dayjs from "dayjs";

export const AppointmentEdit = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [Search, setSearch] = useState("");
  const [Filter, setFilter] = useState(false);
  const [form] = Form.useForm();
  const [AppointmentList, setAppointmentList] = useState([]);

  const { data: Instructors } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { data: Vehicles } = useRequestGetQuery({
    path: "/account_management/vehicle/",
  });
  const { data: Locations } = useRequestGetQuery({
    path: "/account_management/location/",
  });
  const { data: Appointments } = useRequestGetQuery({
    path: "/scheduling/appointment/",
  });
  const { data: TimeSlots } = useRequestGetQuery({
    path: "/scheduling/time_slot/",
  });
  const { data: Students } = useRequestGetQuery({
    path: "/student_account/student/",
  });
  const [requestPatch, { reset: PatchReset }] = useRequestPatchMutation();

  const timeSlotsOptions = useMemo(
    () =>
      TimeSlots?.map((item) => ({ value: item?.id, label: item?.staff_name })),
    [TimeSlots],
  );

  const studentsOptions = useMemo(
    () =>
      ActiveData(Students)?.map((item) => ({
        value: item?.id,
        label: `${item?.first_name} ${item?.last_name}`,
      })),
    [Students],
  );

  const instructorsOptions = useMemo(
    () =>
      ActiveData(Instructors)?.map((item) => ({
        value: item?.id,
        label: `${item?.first_name} ${item?.last_name}`,
      })),
    [Instructors],
  );

  const vehiclesOptions = useMemo(
    () =>
      ActiveData(Vehicles)?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })),
    [Vehicles],
  );

  const locationsOptions = useMemo(
    () =>
      ActiveData(Locations)?.map((item) => ({
        value: item?.id,
        label: item?.name,
      })),
    [Locations],
  );

  const appointments = useMemo(() => {
    return Appointments?.reduce((newAppointments, appointment) => {
      const timeSlot = TimeSlots?.find(
        (slot) => slot?.id === appointment?.time_slot,
      );

      if (!timeSlot) return newAppointments;

      const filteredStudents = Students?.filter((student) =>
        appointment?.student?.includes(student?.id),
      )?.map((student) => ({
        studentId: student?.id,
        student_name: `${student?.first_name} ${student?.last_name}`,
      }));

      const formattedTimeSlot = timeSlot?.slots?.map((slot) => ({
        appointment: appointment?.id,
        date: timeSlot?.date,
        time: `${dayjs(timeSlot?.date).format("DD/MM/YYYY")} ${dayjs(slot?.start).format("hh:mm A")}-${dayjs(slot?.end).format("hh:mm A")}`,
        instructor: timeSlot?.staff_name,
        staff: timeSlot?.staff,
        status: appointment?.status,
        vehicle_name: Vehicles?.find(
          (vehicle) => vehicle?.id === timeSlot?.vehicle,
        )?.name,
        location_name: Locations?.find(
          (location) => location?.id === timeSlot?.location,
        )?.name,
        pu_location: timeSlot?.pu_location,
        week_range: timeSlot?.week_range,
        vehicle: timeSlot?.vehicle,
        location: timeSlot?.location,
      }));

      filteredStudents?.forEach((student) => {
        formattedTimeSlot?.forEach((slot) => {
          newAppointments.push({
            ...slot,
            student_name: student?.student_name,
          });
        });
      });

      return newAppointments;
    }, []);
  }, [Appointments, TimeSlots, Students, Vehicles, Locations]);

  useEffect(() => {
    setAppointmentList(appointments);
  }, [appointments?.length]);

  const { Data } = useFilterStatus({ data: AppointmentList, search: Search });

  const onFinish = useCallback(async (values) => {
    const filtered = appointments.filter((appointment) => {
      const isInstructorValid = values.instructor === appointment.staff;
      const isLocationValid = values.location === appointment?.location;
      const isStatusValid =
        values.status?.toLowerCase() === appointment.status?.toLowerCase();
      const isVehicleValid = values.vehicle === appointment?.vehicle;
      const isWeekdaysValid = values.weekdays?.every((day) =>
        appointment.week_range.includes(day),
      );

      return (
        isInstructorValid ||
        isLocationValid ||
        isStatusValid ||
        isVehicleValid ||
        isWeekdaysValid
      );
    });

    setAppointmentList(filtered);
    setFilter(filtered?.length !== 0);
  }, []);

  const onReset = () => {
    form.resetFields();
    setFilter(false);
  };

  const [actionForm] = Form.useForm();

  const onAction = async (value, id) => {
    if (value === "edit") {
      const onFinish = async (values) => {
        try {
          const { error } = await requestPatch({
            path: "/scheduling/appointment",
            id,
            data: values,
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
              onOk: () => {
                actionForm.resetFields();
                PatchReset();
              },
            });
          }
        } catch (e) {
          console.warn(e);
        }
      };

      Modal.info({
        title: "EDIT APPOINTMENTS",
        onOk: () => {
          actionForm.resetFields();
          PatchReset();
        },
        content: (
          <Form form={actionForm} layout={"vertical"} onFinish={onFinish}>
            <Form.Item label={"Status"} name={"status"}>
              <Select
                placeholder={"Status"}
                options={[
                  { value: "ACTIVE", label: "ACTIVE" },
                  { value: "INACTIVE", label: "INACTIVE" },
                  { value: "DELETED", label: "DELETED" },
                ]}
              />
            </Form.Item>
            <Form.Item label={"Time slot"} name={"time_slot"}>
              <Select placeholder={"Slot"} options={timeSlotsOptions} />
            </Form.Item>
            <Form.Item label={"Student"} name={"student"}>
              <Select
                mode={"multiple"}
                allowClear
                placeholder={"Slot"}
                options={studentsOptions}
              />
            </Form.Item>

            <Button type={"primary"} htmlType={"submit"}>
              Edit
            </Button>
          </Form>
        ),
      });
    } else if (value === "delete") {
      try {
        const { error } = await requestPatch({
          path: "/scheduling/appointment",
          id,
          data: { status: "DELETED" },
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
            onOk: () => {
              PatchReset();
            },
          });
        }
      } catch (e) {
        console.warn(e);
      }
    } else if (value === "cancel") {
      try {
        const { error } = await requestPatch({
          path: "/scheduling/appointment",
          id,
          data: { status: "INACTIVE" },
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
            onOk: () => {
              PatchReset();
            },
          });
        }
      } catch (e) {
        console.warn(e);
      }
    }
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
      dataIndex: "instructor",
      key: "instructor",
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
        const { hover, bg } = CheckProgress(status);
        return (
          <ButtonComponent
            defaultHoverBg={hover}
            defaultBg={bg}
            defaultHoverColor={colorsObject.main}
            defaultColor={colorsObject.main}
            controlHeight={30}
            borderRadius={5}
            style={{ width: 93 }}
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
      render: () => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          Single Appointment
        </Paragraph>
      ),
    },
    {
      title: "Vehicle",
      dataIndex: "vehicle_name",
      key: "vehicle_name",
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
      title: "Student name",
      dataIndex: "student_name",
      key: "student_name",
      align: "center",
      render: (name) => (
        <Paragraph
          fontWeightStrong={500}
          colorText={colorsObject.secondary}
          fontSize={"text-lg"}
        >
          {name}
        </Paragraph>
      ),
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Select
          onChange={(value) => onAction(value, record?.appointment)}
          placeholder={"Select action"}
          options={[
            { value: "edit", label: "EDIT" },
            { value: "delete", label: "DELETE" },
            { value: "cancel", label: "CANCEL" },
            { value: "shift", label: "SHIFT" },
            { value: "export", label: "EXPORT" },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="bg-white p-5 sm:p-10"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-5">
            <Form.Item label="Instructor" name={"instructor"}>
              <Select
                placeholder={"Instructor"}
                options={instructorsOptions}
                className={"h-[50px]"}
              />
            </Form.Item>

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
            <Form.Item label="Status" name={"status"}>
              <Select
                placeholder={"Status"}
                options={[
                  {
                    value: "ACTIVE",
                    label: "ACTIVE",
                  },
                  {
                    value: "INACTIVE",
                    label: "INACTIVE",
                  },
                  {
                    value: "DELETED",
                    label: "DELETED",
                  },
                ]}
                className={"h-[50px]"}
              />
            </Form.Item>

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
            onClick={onReset}
          >
            Clear
          </ButtonComponent>
        </div>
      </Form>

      {Filter && (
        <div className={"mt-5 px-5 py-6 bg-white"}>
          <Input
            className={"h-[50px]"}
            placeholder={"Search"}
            prefix={<AiOutlineSearch className={"text-xl"} />}
            allowClear
            enterButton="Search"
            onChange={({ target }) => setSearch(target.value)}
          />

          <div className={"-mx-5 pt-5"}>
            <TableComponent columns={columns} data={Data} pagination scroll={{ x: 900 }} />
          </div>
        </div>
      )}
    </>
  );
};
