import { Button, ConfigProvider } from "antd";
import classNames from "classnames";
import { Fragment } from "react";
import ButtonStyle from "./button.module.scss";

const ButtonComponent = ({
  className,
  children,
  disabled,
  href,
  type,
  onClick,
  target,
  defaultActiveColor = "inherit",
  defaultBg = "inherit",
  defaultBorderColor = "transparent",
  defaultColor = "white",
  textHoverBg = "inherit",
  paddingBlock = 0,
  paddingInline = 0,
  defaultHoverBg = "inherit",
  defaultHoverBorderColor = "none",
  defaultHoverColor = "white",
  controlHeight = 30,
  fontSize = 16,
  ...props
}) => {
  className = classNames([className, ButtonStyle["Button"]]);
  return (
    <Fragment>
      <ConfigProvider
        theme={{
          token: {
            fontSize,
          },
          components: {
            Button: {
              defaultActiveColor,
              defaultBorderColor,
              defaultBg,
              defaultColor,
              textHoverBg,
              paddingBlock,
              paddingInline,
              defaultHoverBg,
              defaultHoverBorderColor,
              defaultHoverColor,
              controlHeight,
              // colorText,
            },
          },
        }}
      >
        <Button
          target={target}
          onClick={onClick}
          htmlType={type}
          className={className}
          disabled={disabled}
          href={href}
          {...props}
        >
          {children}
        </Button>
      </ConfigProvider>
    </Fragment>
  );
};

export const IconComponent = ({
  className,
  icon,
  children,
  paddingInline = 0,
  paddingBlock = 0,
  defaultBg = "#fff",
  defaultColor = "#000",
  defaultBorderColor = "transparent",
  defaultHoverColor = "#000",
  defaultHoverBorderColor = "transparent",
  defaultHoverBg = "#fff",
  fontSize = 12,
  fontWeight = 500,
  ...props
}) => {
  className = classNames([
    ButtonStyle["Icon"],
    className,
    `inline-flex align-center`,
  ]);
  return (
    <Fragment>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              paddingInline,
              paddingBlock,
              defaultBg,
              defaultColor,
              defaultBorderColor,
              defaultHoverColor,
              defaultHoverBorderColor,
              defaultHoverBg,
              fontSize,
              fontWeight,
            },
          },
        }}
      >
        <Button
          className={className}
          icon={icon}
          children={children}
          {...props}
        />
      </ConfigProvider>
    </Fragment>
  );
};

export default ButtonComponent;
