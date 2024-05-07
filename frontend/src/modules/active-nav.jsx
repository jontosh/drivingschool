import ServiceStyle from "@/pages/managment/management.module.scss";

export const setActiveNav = ({ isActive }) =>
  isActive
    ? `${ServiceStyle["Tab__link-active"]} py-5 text-lg`
    : "hover:text-indigo-500 text-lg text-gray-700 py-5";
