import classNames from "classnames";
import { Fragment, useEffect, useRef, useState } from "react";
import FormStyle from "./form.module.scss";
import { ConfigProvider, Input, Select, Transfer } from "antd";
const { Option } = Select;

export const CustomCheckBox = ({
  className,
  value,
  name,
  children,
  onChange,
  checked,
  customWrapClassName,
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
          <span
            className={classNames(
              `relative ${FormStyle["Custom-checkbox"]}`,
              customWrapClassName,
            )}
          ></span>
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
  fontSize = "text-sm",
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
        <label className={props.classNames} {...props}>
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
              <span className={`${classNames(fontSize, spanClassName)}`}>
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
  colorText = "#000",
  ...props
}) => {
  useEffect(() => {}, []);

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
              colorText,
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
          //ref={ref}
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
  customWrapClassName,
  ...props
}) => {
  return (
    <label
      className={`flex gap-1 items-center ${classNames(props.classNames, FormStyle["Radio"])}`}
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
        <span
          className={classNames(
            `relative ${FormStyle["Custom-checkbox"]}`,
            customWrapClassName,
          )}
        ></span>
      </div>
      {children}
    </label>
  );
};

export const CustomTransfer = ({
  className,
  onChange,
  colorBgContainer,
  colorBorder,
  colorBgContainerDisabled,
  colorText,
  controlHeightLG,
  fontSize,
  dataSource,
  titles,
  initialTargetKeys,
  listHeight,
  headerHeight,
}) => {
  const [targetKeysState, setTargetKeysState] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    console.log("targetKeys:", nextTargetKeys);
    console.log("direction:", direction);
    console.log("moveKeys:", moveKeys);
    setTargetKeysState(nextTargetKeys);
    if (typeof onChange === "function") {
      onChange(nextTargetKeys);
    }
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log("sourceSelectedKeys:", sourceSelectedKeys);
    console.log("targetSelectedKeys:", targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll = (direction, e) => {
    console.log("direction:", direction);
    console.log("target:", e.target);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Transfer: {
            colorBgContainer,
            colorBorder,
            colorBgContainerDisabled,
            colorText,
            controlHeightLG,
            fontSize,
            listHeight,
            headerHeight,
            // listWidth: "100%"
          },
        },
      }}
    >
      <Transfer
        className={classNames(className, "overflow-hidden")}
        onChange={handleChange}
        dataSource={dataSource}
        titles={titles}
        targetKeys={targetKeysState}
        selectedKeys={selectedKeys}
        onSelectChange={onSelectChange}
        onScroll={onScroll}
        render={(item) => item.title}
      />
    </ConfigProvider>
  );
};

export const CustomDate = () => {
  return <ConfigProvider></ConfigProvider>;
};

export const SwitchCustom = ({
  name,
  value,
  children,
  className,
  checked = false,
  onChange,
  ...props
}) => {
  return (
    <Fragment>
      <label
        className="relative bg-white shadow-xl inline-flex cursor-pointer items-center overflow-hidden"
        {...props}
      >
        <input
          type="checkbox"
          checked={checked}
          className="peer sr-only"
          onChange={onChange}
          name={name}
          value={value}
        />
        <div className="peer  h-8 items-center gap-4  bg-white  after:absolute after:left-0 after:top-0 after:bottom-0 after:w-12 after:rounded after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none text-sm text-white">
          <span className={"px-3 py-1.5 bg-[#24C18F] rounded-lg"}>Yes</span>
          <span className={"px-3 py-1.5 bg-[#FF333F] rounded-lg"}>No</span>
        </div>
      </label>
      {children}
    </Fragment>
  );
};
