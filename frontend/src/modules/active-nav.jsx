import ServiceStyle from "@/pages/managment/management.module.scss";

export const setActiveNav = ({ isActive }) =>
  isActive
    ? `py-3 md:py-5 text-base md:text-lg ${ServiceStyle["Tab__link-active"]}`
    : "hover:text-indigo-500 text-base md:text-lg text-gray-700 py-3 md:py-5";

export const setActiveMenu = ({ isActive }) =>
  isActive
    ? `text-[15px] text-indigo-500 font-medium ${ServiceStyle["Tab__link-active"]}`
    : "text-[15px] text-black font-medium";
