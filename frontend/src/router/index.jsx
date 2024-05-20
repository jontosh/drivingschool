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
import Management from "@/pages/managment/index.jsx";
import Modal from "@/pages/modal/index.jsx";
import Notfound from "@/pages/notfound/index.jsx";
import Register from "@/pages/register/index.jsx";
import SignIn from "@/pages/register/sign-in.jsx";
import Report from "@/pages/report/index.jsx";
import Scheduling from "@/pages/scheduling/index.jsx";
import Manage from "@/pages/scheduling/subpages/manage.jsx";
import Search from "@/pages/search/index.jsx";
import Student from "@/pages/student/index.jsx";
import StudentSpa from "@/pages/student/student-spa.jsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/design",
        element: <Design />,
        children: [
          {
            path: "components",
            element: <Components />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/report/:title",
        element: <Report />,
        children: [
          {
            path: ":subpage",
          },
        ],
      },
      {
        path: "/enrollment",
        element: <Enrollment />,
      },
      {
        path: "/support",
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
        path: "/configuration/:title",
        element: <Configuration />,
        children: [
          {
            path: ":subpage",
          },
        ],
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/communication/:title",
        element: <Communication />,
        children: [
          {
            path: ":subpage",
          },
        ],
      },
      {
        path: "/scheduling/:title",
        element: <Scheduling />,
      },
      {
        path: "/finance/:title",
        element: <Finance />,
      },
      {
        path: "/scheduling/manage/:title",
        element: <Manage />,
      },
      {
        path: "/management/:title",
        element: <Management />,
        children: [
          {
            path: ":subpage",
          },
        ],
      },
      {
        path: "/modals/:title/:page_modal",
        element: <Modal />,
      },
      {
        path: "/student/account",
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
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
    ],
  },
]);
