import classNames from "classnames";
import { Fragment } from "react";
import FormStyle from "./form.module.scss";
import { ConfigProvider, Input, Select } from "antd";
const { Option } = Select;

export const CustomCheckBox = ({
  className,
  value,
  name,
  children,
  onChange,
  checked,
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
            checked={checked}
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
  hoverBg = "#ffffff",
  activeBg = "#ffffff",
  spanClassName,
  type = "text",
  children,
  ...props
}) => {
  className = classNames([className]);
  return (
    <Fragment>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              hoverBg,
              activeBg,
            },
          },
        }}
      >
        <label className={props.classNames}>
          <Input
            className={className}
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            status={status}
            size={size}
            onChange={onChange}
          />
          <span className={`${classNames(spanClassName)} text-base`}>
            {spanText}
          </span>
        </label>

        {children}
      </ConfigProvider>
    </Fragment>
  );
};

export const CustomSelect = ({
  className,
  value,
  onChange,
  options,
  placeholder,
  dropdownClassName,
}) => {
  return (
    <Fragment>
      <Select
        className={className}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        dropdownClassName={dropdownClassName}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Fragment>
  );
};
