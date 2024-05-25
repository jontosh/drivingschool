import { AccountManagementProvider } from "@/context/account-management.jsx";
import { ColorsProvider } from "@/context/colors.jsx";
import { store } from "@/redux/store.jsx";
import { router } from "@/router/index.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorsProvider>
      <Provider store={store}>
        <AccountManagementProvider>
          <RouterProvider router={router} />
        </AccountManagementProvider>
      </Provider>
    </ColorsProvider>
  </React.StrictMode>,
);
