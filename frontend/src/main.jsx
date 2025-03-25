import { AccountManagementProvider } from "@/context/account-management.jsx";
import { AuthProvider } from "@/context/auth.jsx";
import { ColorsProvider } from "@/context/colors.jsx";
import { ThemeProvider } from "@/context/theme.jsx";
import { store } from "@/redux/store.jsx";
import { router } from "@/router/index.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ColorsProvider>
        <Provider store={store}>
          <AuthProvider>
            <AccountManagementProvider>
              <RouterProvider router={router} />
            </AccountManagementProvider>
          </AuthProvider>
        </Provider>
      </ColorsProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
