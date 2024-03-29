import { ColorsProvider } from "@/context/colors.jsx";
import { router } from "@/router/index.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorsProvider>
      <RouterProvider router={router} />
    </ColorsProvider>
  </React.StrictMode>,
);
