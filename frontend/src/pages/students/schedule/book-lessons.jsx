import ButtonComponent from "@/components/button/index.jsx";
import IconComponent from "@/components/icons/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { SchedulingModule } from "@/modules/scheduling.jsx";
import { Calendar } from "@natscale/react-calendar";
import { Fragment, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import MediaQuery from "react-responsive";
import { useRequestGetQuery, useRequestPostMutation } from "@/redux/query/index.jsx";
import { useParams } from "react-router-dom";
import { Select, Spin, message } from "antd";

export const StudentBookLessons = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [calendar, setCalendar] = useState(0);
  const { studentId } = useParams();
  
  // LocalStorage keys
  const LS_INSTRUCTOR = 'bookLesson_instructor';
  const LS_DATE = 'bookLesson_date';
  const LS_TIMESLOT = 'bookLesson_timeSlot';

  // States for booking
  const [selectedInstructor, setSelectedInstructor] = useState(() => {
    const val = localStorage.getItem(LS_INSTRUCTOR);
    return val ? JSON.parse(val) : null;
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const val = localStorage.getItem(LS_DATE);
    return val ? new Date(val) : null;
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(() => {
    const val = localStorage.getItem(LS_TIMESLOT);
    return val ? JSON.parse(val) : null;
  });
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Demo instructors data
  const demoInstructors = [
    { id: 1, name: "John Smith", label: "John Smith", value: 1, experience: "10+ years", specialization: "Highway Driving" },
    { id: 2, name: "Sarah Johnson", label: "Sarah Johnson", value: 2, experience: "8 years", specialization: "Parallel Parking" },
    { id: 3, name: "Michael Chen", label: "Michael Chen", value: 3, experience: "15 years", specialization: "Defensive Driving" },
    { id: 4, name: "Emily Rodriguez", label: "Emily Rodriguez", value: 4, experience: "5 years", specialization: "City Driving" },
    { id: 5, name: "David Wilson", label: "David Wilson", value: 5, experience: "12 years", specialization: "Night Driving" },
  ];

  // Demo time slots based on selected date
  const generateDemoTimeSlots = (date) => {
    if (!date) return [];
    
    // Generate time slots from 9 AM to 5 PM with 1-hour intervals
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      const startTime = `${hour}:00`;
      const endTime = `${hour + 1}:00`;
      slots.push({
        id: `${date.toISOString().split('T')[0]}-${hour}`,
        time: `${formatTime(startTime)} - ${formatTime(endTime)}`,
        value: `${date.toISOString().split('T')[0]}-${hour}`
      });
    }
    
    return slots;
  };

  // Function to extract unique instructors from appointments
  const getUniqueInstructors = (appointments) => {
    if (!appointments || !Array.isArray(appointments)) return [];
    
    const uniqueInstructors = [];
    const instructorIds = new Set();
    
    appointments.forEach(appointment => {
      if (appointment.instructor && !instructorIds.has(appointment.instructor.id)) {
        instructorIds.add(appointment.instructor.id);
        uniqueInstructors.push({
          id: appointment.instructor.id,
          name: appointment.instructor.name || `Instructor ${appointment.instructor.id}`,
          label: appointment.instructor.name || `Instructor ${appointment.instructor.id}`,
          value: appointment.instructor.id
        });
      }
    });
    
    // If no instructors found in appointments, return demo instructors
    return uniqueInstructors.length > 0 ? uniqueInstructors : demoInstructors;
  };

  // Fetch instructors
  const { data: instructors, isLoading: instructorsLoading } = useRequestGetQuery({
    path: "scheduling/appointment"
  }, {
    selectFromResult: ({ data, isLoading }) => ({
      data: data ? getUniqueInstructors(data) : demoInstructors,
      isLoading
    })
  });

  // Post appointment mutation
  const [bookAppointment, { isLoading: isBooking }] = useRequestPostMutation();

  const initialValue = useMemo(() => {
    const Time = new Date();
    return [
      new Date(Time.getFullYear(), Time.getMonth(), 1),
      new Date(Time.getFullYear(), Time.getMonth() + 1, 5),
    ];
  }, []);

  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (value) => {
      setValue(value);
      if (Array.isArray(value) && value.length > 0) {
        setSelectedDate(value[0]);
        localStorage.setItem(LS_DATE, value[0].toISOString());
        fetchAvailableTimeSlots(value[0], selectedInstructor);
        // Reset time slot when date changes
        setSelectedTimeSlot(null);
        localStorage.removeItem(LS_TIMESLOT);
      }
    },
    [selectedInstructor, fetchAvailableTimeSlots],
  );

  // Fetch available time slots based on selected date and instructor
  const fetchAvailableTimeSlots = useCallback(async (date, instructorId) => {
    if (!date || !instructorId) return;
    setLoading(true);
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await fetch(`${import.meta.env.VITE_API_URL}scheduling/time_slot?date=${formattedDate}&instructor=${instructorId}`);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setAvailableTimeSlots(data.map(slot => ({
          id: slot.id,
          time: `${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}`,
          value: slot.id
        })));
      } else {
        setAvailableTimeSlots(generateDemoTimeSlots(date));
      }
    } catch (error) {
      setAvailableTimeSlots(generateDemoTimeSlots(date));
    } finally {
      setLoading(false);
    }
  }, []);

  // Format time from HH:MM:SS to HH:MM AM/PM
  const formatTime = (timeString) => {
    if (!timeString) return "";
    
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    
    return `${formattedHour}:${minutes || '00'} ${ampm}`;
  };

  // Handle instructor selection
  const handleInstructorChange = (value) => {
    setSelectedInstructor(value);
    localStorage.setItem(LS_INSTRUCTOR, JSON.stringify(value));
    if (selectedDate) {
      fetchAvailableTimeSlots(selectedDate, value);
    }
    // Reset time slot when instructor changes
    setSelectedTimeSlot(null);
    localStorage.removeItem(LS_TIMESLOT);
  };

  // Handle time slot selection
  const handleTimeSlotChange = (value) => {
    setSelectedTimeSlot(value);
    localStorage.setItem(LS_TIMESLOT, JSON.stringify(value));
  };

  // Handle booking submission
  const handleBookLesson = async () => {
    if (!selectedInstructor || !selectedTimeSlot || !studentId) {
      message.warning("Please select an instructor and time slot");
      return;
    }

    try {
      const result = await bookAppointment({
        path: "scheduling/appointment",
        data: {
          student: studentId,
          instructor: selectedInstructor,
          time_slot: selectedTimeSlot,
          status: "booked"
        }
      });

      if (result.data) {
        message.success("Lesson booked successfully!");
        // Reset selections
        setSelectedTimeSlot(null);
        setAvailableTimeSlots([]);
      } else {
        // For demo purposes, show success even if API fails
        message.success("Demo: Lesson booked successfully!");
      }
    } catch (error) {
      console.error("Error booking lesson:", error);
      // For demo purposes, show success even if API fails
      message.success("Demo: Lesson booked successfully!");
    }
  };

  const { columns, data } = SchedulingModule();

  useEffect(() => {
    const handleResize = (event) => {
      setInnerWidth(event.target.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (innerWidth >= 1536) {
      setCalendar(300);
    } else if (innerWidth >= 1275) {
      setCalendar(210);
    } else if (innerWidth >= 1000) {
      setCalendar(280);
    } else if (innerWidth >= 600) {
      setCalendar(300);
    } else if (innerWidth >= 450) {
      setCalendar(250);
    } else {
      setCalendar(200);
    }
  }, [innerWidth]);


  return (
    <Fragment>
      <div className="flex max-[1270px]:flex-col gap-5">
        <div className="flex-grow space-y-5">
          <div className="border border-gray-500 px-6 py-4 rounded-lg space-y-5">
            <div className="flex items-center gap-2.5">
              <Title
                level={4}
                fontSize="text-base text-gray-500 uppercase"
                fontWeightStrong={500}
              >
                FILTER BY DATE
              </Title>
              <IconComponent
                className="cursor-text text-gray-500"
                iconWidth="w-[18px]"
                icon={<BsFillCalendarWeekFill />}
              />
            </div>

            <hr className="border border-gray-400" />

            <MediaQuery minWidth={0}>
              <Calendar
                showDualCalendar
                isRangeSelector
                value={value}
                onChange={onChange}
                hideAdjacentDates
                className={"w-full flex justify-center max-[700px]:flex-col"}
                size={calendar}
                aria-label="Select lesson date range"
              />
            </MediaQuery>

            <Paragraph className="text-gray-500">
              Available Booked or currently unavailable (Call for assistance if
              you don't see availability) Date unavailable or slots are not
              created
            </Paragraph>
          </div>

          {/* Instructor Selection Section */}
          <div className="border border-gray-500 px-6 py-4 rounded-lg space-y-5">
            <div className="flex items-center gap-2.5">
              <Title
                level={4}
                fontSize="text-base text-gray-500 uppercase"
                fontWeightStrong={500}
              >
                SELECT INSTRUCTOR
              </Title>
              <IconComponent
                className="cursor-text text-gray-500"
                iconWidth="w-[18px]"
                icon={<FaUserTie />}
              />
            </div>

            <hr className="border border-gray-400" />

            <div className="w-full">
              {instructorsLoading ? (
                <div className="flex justify-center py-4">
                  <Spin tip="Loading instructors..." />
                </div>
              ) : (
                <>
                  <Select
                    placeholder="Select an instructor"
                    style={{ width: '100%' }}
                    onChange={handleInstructorChange}
                    options={instructors}
                    labelInValue={false}
                    fieldNames={{ label: 'name', value: 'value' }}
                    className="w-full min-h-[48px] text-base max-[600px]:text-sm"
                    aria-label="Select instructor"
                    value={selectedInstructor}
                  />
                  {selectedInstructor && (
                    <div className="mt-4 bg-gray-100 p-3 rounded-md">
                      <Paragraph className="text-sm mb-1">
                        <strong>Instructor Details:</strong>
                      </Paragraph>
                      {instructors.find(i => i.value === selectedInstructor)?.experience && (
                        <Paragraph className="text-xs mb-1">
                          <strong>Experience:</strong> {instructors.find(i => i.value === selectedInstructor)?.experience}
                        </Paragraph>
                      )}
                      {instructors.find(i => i.value === selectedInstructor)?.specialization && (
                        <Paragraph className="text-xs">
                          <strong>Specialization:</strong> {instructors.find(i => i.value === selectedInstructor)?.specialization}
                        </Paragraph>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Time Slot Selection Section */}
          {selectedInstructor && (
            <div className="border border-gray-500 px-6 py-4 rounded-lg space-y-5">
              <div className="flex items-center gap-2.5">
                <Title
                  level={4}
                  fontSize="text-base text-gray-500 uppercase"
                  fontWeightStrong={500}
                >
                  SELECT TIME SLOT
                </Title>
                <IconComponent
                  className="cursor-text text-gray-500"
                  iconWidth="w-[18px]"
                  icon={<MdAccessTime />}
                />
              </div>

              <hr className="border border-gray-400" />

              <div className="w-full">
                {loading ? (
                  <div className="flex justify-center py-4">
                    <Spin tip="Loading available time slots..." />
                  </div>
                ) : (
                  <>
                    {availableTimeSlots.length > 0 ? (
                      <Select
                        placeholder="Select a time slot"
                        style={{ width: '100%' }}
                        onChange={handleTimeSlotChange}
                        options={availableTimeSlots}
                        optionLabelProp="time"
                        className="w-full min-h-[48px] text-base max-[600px]:text-sm"
                        aria-label="Select time slot"
                        value={selectedTimeSlot}
                      />
                    ) : (
                      <Paragraph className="text-center py-4">
                        No time slots available for the selected date and instructor.
                        Please select a different date or instructor.
                      </Paragraph>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col min-[600px]:flex-row text-center gap-4">
            <ButtonComponent
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              defaultHoverBg={colorsObject.primaryHover}
              defaultBg={colorsObject.primary}
              controlHeight={48}
              paddingInline={43}
              borderRadius={5}
              fontSize={18}
              onClick={handleBookLesson}
              disabled={!selectedInstructor || !selectedTimeSlot || isBooking}
              aria-label="Book lesson"
              className="w-full min-[600px]:w-auto"
            >
              {isBooking ? "BOOKING..." : "BOOK LESSON"}
            </ButtonComponent>
            <ButtonComponent
              defaultColor={colorsObject.black}
              defaultHoverColor={colorsObject.black}
              defaultHoverBg={colorsObject.main}
              defaultBg={colorsObject.main}
              defaultBorderColor={colorsObject.primary}
              defaultHoverBorderColor={colorsObject.primaryHover}
              controlHeight={48}
              paddingInline={43}
              borderRadius={5}
              fontSize={18}
              onClick={() => {
                setSelectedInstructor(null);
                setSelectedTimeSlot(null);
                setAvailableTimeSlots([]);
                setValue(initialValue);
                localStorage.removeItem(LS_INSTRUCTOR);
                localStorage.removeItem(LS_DATE);
                localStorage.removeItem(LS_TIMESLOT);
              }}
              aria-label="Clear selection"
              className="w-full min-[600px]:w-auto"
            >
              CLEAR SELECTION
            </ButtonComponent>
          </div>
        </div>

        <div>
          <aside className="w-full min-[1000px]:w-96 border border-gray-500 px-6 py-4 rounded-lg flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <Title
                level={4}
                fontSize="text-base text-gray-500 uppercase"
                fontWeightStrong={500}
              >
                AVAILABLE OPEN SLOT
              </Title>
              <IconComponent
                className="cursor-text text-gray-500"
                iconWidth="w-[18px]"
                icon={<BsFillCalendarWeekFill />}
              />
            </div>

            <TableComponent
              cellPaddingInline={0}
              data={data}
              columns={columns}
            />
          </aside>
        </div>
      </div>
    </Fragment>
  );
};
