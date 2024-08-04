import { PrivateRoute } from "@/auth/private-route.jsx";
import Layout from "@/layout";
import Communication from "@/pages/communication/index.jsx";
import Configuration from "@/pages/configuration/index.jsx";
import Dashboard from "@/pages/dashboard/index.jsx";
import Components from "@/pages/design/components.jsx";
import Design from "@/pages/design/index.jsx";
import Enrollment from "@/pages/enrollment/index.jsx";
import Finance from "@/pages/finances/index.jsx";
import { Help } from "@/pages/help";
import HelpMain from "@/pages/help/main";
import { NewTicket } from "@/pages/help/new-ticket";
import { News } from "@/pages/help/news";
import { TicketSpa } from "@/pages/help/ticket/ticket-spa.jsx";
import InstructorProfile from "@/pages/instructor/profile/index.jsx";
import Management from "@/pages/managment/index.jsx";
import Modal from "@/pages/modal/index.jsx";
import Notfound from "@/pages/notfound/index.jsx";
import Register from "@/pages/register/index.jsx";
import Password from "@/pages/register/password.jsx";
import Report from "@/pages/report/index.jsx";
import Scheduling from "@/pages/scheduling/index.jsx";
import Manage from "@/pages/scheduling/subpages/manage.jsx";
import Search from "@/pages/search/index.jsx";
import Student from "@/pages/student/index.jsx";
import StudentSpa from "@/pages/student/student-spa.jsx";
import { default as InstructorDashboard } from "@/pages/instructor/dashboard/dashboard.jsx";
import { default as InstructorScheduling } from "@/pages/instructor/scheduling";
import StudentAccount from "@/pages/students/account/index.jsx";
import StudentContact from "@/pages/students/contact/index.jsx";
import { default as StudentDashboard } from "@/pages/students/dashboard";
import StudentEnroll from "@/pages/students/enroll/index.jsx";
import StudentResource from "@/pages/students/resources/index.jsx";
import StudentExams from "@/pages/students/resources/quiz/exams.jsx";
import Quiz, { QuizView } from "@/pages/students/resources/quiz/index.jsx";
import StudentResults from "@/pages/students/resources/quiz/results.jsx";
import StudentTestView from "@/pages/students/resources/quiz/test.jsx";
import StudentSchedule from "@/pages/students/schedule/index.jsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "password/:id",
        element: <Password />,
      },
      {
        path: "report/:title",
        element: <Report />,
        children: [
          {
            path: ":subpage",
          },
        ],
      },
      {
        path: "enrollment",
        element: <Enrollment />,
      },
      {
        path: "support",
        element: <HelpMain />,
        children: [
          {
            path: "news/ticket/:title/:id",
            element: <TicketSpa />,
          },
          {
            path: "help/ticket/:title/:id",
            element: <TicketSpa />,
          },
          {
            path: "help",
            element: <Help />,
          },
          {
            path: "news",
            element: <News />,
          },
          {
            path: "new-ticket",
            element: <NewTicket />,
          },
        ],
      },
      {
        path: "configuration/:title",
        element: <Configuration />,
        children: [
          {
            path: ":subpage",
          },
        ],
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "communication/:title",
        element: <Communication />,
        children: [
          {
            path: ":subpage",
          },
        ],
      },
      {
        path: "scheduling/:title",
        element: <Scheduling />,
      },
      {
        path: "finance/:title",
        element: <Finance />,
      },
      {
        path: "scheduling/manage/:title",
        element: <Manage />,
      },
      {
        path: "management/:title",
        element: <Management />,
        children: [
          {
            path: ":subpage",
          },
        ],
      },
      {
        path: "modals/:title/:page_modal",
        element: <Modal />,
      },
      {
        path: "student/account",
        element: <Student />,
        children: [
          {
            path: ":title",
            element: <StudentSpa />,
            children: [
              {
                path: ":studentId",
                children: [
                  {
                    path: ":subtitle",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "design",
    element: <Design />,
    children: [
      {
        path: "components",
        element: <Components />,
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
  {
    path: "admin/register/sign-in",
    element: <Register title={"Admin"} />,
  },
  {
    path: "instructor/register/sign-in",
    element: <Register title={"instructor"} />,
  },
  {
    path: "student/register/sign-in",
    element: <Register title={"student"} />,
  },
  {
    path: "instructor",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard/:instructorId",
        element: <InstructorDashboard />,
      },
      {
        path: "schedule-lessons/:instructorId",
        element: <InstructorScheduling />,
      },
      {
        path: "profile/:instructorId",
        element: <InstructorProfile />,
      },
    ],
  },
  {
    path: "student",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard/:studentId",
        element: <StudentDashboard />,
      },
      {
        path: "account/:subpage/:studentId",
        element: <StudentAccount />,
      },
      {
        path: "enroll/:studentId",
        element: <StudentEnroll />,
      },
      {
        path: "contact/:studentId",
        element: <StudentContact />,
      },
      {
        path: "schedule/:title/:studentId",
        element: <StudentSchedule />,
      },
      {
        path: "resource/:title/:studentId",
        element: <StudentResource />,
      },
      {
        path: "resource/quiz/:studentId",
        element: <Quiz />,
        children: [
          {
            path: "view",
            element: <QuizView />,
            children: [
              {
                path: "exams",
                element: <StudentExams />,
              },
              {
                path: "results",
                element: <StudentResults />,
              },
            ],
          },
          {
            path: "test/:testId",
            element: <StudentTestView />,
          },
        ],
      },
    ],
  },
]);
