import classNames from "classnames";
import { Fragment } from "react";
import FormStyle from "./form.module.scss";
export const CustomCheckBox = ({
  className,
  value,
  name,
  children,
  onChange,
  ...props
}) => {
  className = classNames([
    FormStyle["Label"],
    className,
    `inline-flex gap-x-1 items-center `,
  ]);
  return (
    <Fragment>
      <label className={className} {...props}>
        <div className={`relative ${FormStyle["CheckBox-warp"]}`}>
          <input
            type={"checkbox"}
            value={value}
            onChange={onChange}
            name={name}
            className={`${FormStyle["Origin-checkbox"]} absolute top-0 left-0 -z-10 opacity-0`}
          />
          <span className={`relative ${FormStyle["Custom-checkbox"]}`}></span>
        </div>
        {children}
      </label>
    </Fragment>
  );
};
