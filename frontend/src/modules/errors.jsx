import IconComponent from "@/components/icons/index.jsx";
import classNames from "classnames";
import { TbAlertCircle } from "react-icons/tb";

export const FormError = ({ children, className }) => {
  return (
    <IconComponent
      vertical={"items-center"}
      spaceIconX={2}
      icon={<TbAlertCircle />}
      className={classNames(
        className,
        `text-[#FF3932] text-xs flex items-center mt-2.5 cursor-text`,
      )}
    >
      {children}
    </IconComponent>
  );
};
