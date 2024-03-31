import classNames from "classnames";
import { Fragment } from "react";
import FormStyle from "./form.module.scss";
import { Input, Select } from "antd";
const { Option } = Select;

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
export const CustomInput = ({
  className,
  value,
  name,
  placeholder,
  status,
  size,
  onChange,
  spanText,
}) => {
  return (
    <Fragment>
      <div className={"flex flex-col"}>
        <Input
          className={className}
          type="text"
          value={value}
          name={name}
          placeholder={placeholder}
          status={status}
          size={size}
          onChange={onChange}
        />
        <span className={`${className} text-base text-red-500`}>{spanText}</span>
      </div>
    </Fragment>
  );
};

export const CustomSelect = ({
  className,
  value,
  onChange,
  options,
  placeholder

}) => {
  return (
    <Fragment>
      <Select
        className={className}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        dropdownClassName={"border border-blue-500"}
      >
        {options.map(option => (
          <Option key={option.value} value={option.value}>{option.label}</Option>
        ))}
      </Select>
    </Fragment>
  )
}