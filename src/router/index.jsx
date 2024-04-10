import Layout from "@/layout";
import Dashboard from "@/pages/dashboard/index.jsx";
import Components from "@/pages/design/components.jsx";
import Design from "@/pages/design/index.jsx";
import Enrollment from "@/pages/enrollment/index.jsx";
import File from "@/pages/managment/file/index.jsx";
import Management from "@/pages/managment/index.jsx";
import ManagementSpa from "@/pages/managment/management-spa.jsx";
import ManagementSpaIndex from "@/pages/managment/management-spa/index.jsx";
import Service from "@/pages/managment/service/index.jsx";
import ServiceSpa from "@/pages/managment/service/service-spa.jsx";
import Staff from "@/pages/managment/staff/index.jsx";
import Notfound from "@/pages/notfound/index.jsx";
import Register from "@/pages/register/index.jsx";
import SignIn from "@/pages/register/sign-in.jsx";
import Student from "@/pages/student/index.jsx";
import StudentSpa from "@/pages/student/subpages/index.jsx";
import StudentView from "@/pages/student/subpages/view.jsx";
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
        path: "/enrollment",
        element: <Enrollment />,
      },
      {
        path: "/management",
        element: <Management />,
        children: [
          {
            path: "service",
            element: <Service />,
            children: [
              {
                path: ":title",
                element: <ServiceSpa />,
              },
            ],
          },
          {
            path: "file",
            element: <File />,
          },
          {
            path: "staff",
            element: <Staff />,
          },
          {
            path: "single-page",
            element: <ManagementSpa />,
            children: [
              {
                path: ":title",
                element: <ManagementSpaIndex />,
              },
            ],
          },
        ],
      },
      {
        path: "/student/account",
        element: <Student />,
        children: [
          {
            path: ":subpage",
            element: <StudentSpa />,
            children: [
              {
                path: ":id",
                element: <StudentView />,
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
