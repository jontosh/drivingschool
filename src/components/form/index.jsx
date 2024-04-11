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
        <div
          className={classNames(
            `relative inline-flex items-center ${FormStyle["CheckBox-warp"]}`,
            props.classNames,
          )}
        >
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
  colorBorder = "#000",
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
              colorBorder,
            },
          },
        }}
      >
        <label className={props.classNames}>
          <Input
            className={`h-full ${className}`}
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            status={status}
            size={size}
            onChange={onChange}
          />
          {spanText && (
            <Fragment>
              <span className={`${classNames(spanClassName)} text-sm`}>
                {spanText}
              </span>
            </Fragment>
          )}
        </label>

        {children}
      </ConfigProvider>
    </Fragment>
  );
};

export const CustomSelect = ({
  className,
  value,
  onBlur,
  onChange,
  options,
  placeholder,
  dropdownClassName,
  style,
  multipleItemBorderColor,
  optionFontSize,
  optionSelectedFontWeight,
  fontSize = 14,
  colorBorder = "gray",
  selectorBg = "#fff",
  ...props
}) => {
  const option = options.map(({ ...option }, index) => (
    <Option key={index} {...option}>
      {option.label}
    </Option>
  ));

  return (
    <Fragment>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              multipleItemBorderColor,
              optionFontSize,
              optionSelectedFontWeight,
              fontSize,
              colorBorder,
              selectorBg,
            },
          },
        }}
      >
        <Select
          className={classNames(className)}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          popupClassName={dropdownClassName}
          style={style}
          onBlur={onBlur}
          {...props}
        >
          {option}
        </Select>
      </ConfigProvider>
    </Fragment>
  );
};

export const CustomRadio = ({
  children,
  value,
  onChange,
  className,
  name,
  checked,
  ...props
}) => {
  return (
    <label
      className={classNames(props.classNames, FormStyle["Radio"])}
      {...props}
    >
      <div
        className={`relative inline-flex items-center ${FormStyle["CheckBox-warp"]}`}
      >
        <input
          type={"radio"}
          value={value}
          onChange={onChange}
          name={name}
          checked={checked}
          className={classNames(
            `${FormStyle["Origin-checkbox"]} absolute top-0 left-0 -z-10 opacity-0`,
            className,
          )}
        />
        <span className={`relative ${FormStyle["Custom-checkbox"]}`}></span>
      </div>
      {children}
    </label>
  );
};
