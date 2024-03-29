import App from "@/App.jsx";
import Components from "@/pages/design/components.jsx";
import Design from "@/pages/design/index.jsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    ],
  },
]);
