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
  style,
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
          style={style}
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
  defaultActiveBorderColor,
  defaultHoverBg = "#fff",
  fontSize = 12,
  fontWeight = 500,
  href,
  ...props
}) => {
  className = classNames([
    ButtonStyle["Icon"],
    className,
    `inline-flex items-center`,
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
              defaultActiveBorderColor,
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
          href={href}
          {...props}
        />
      </ConfigProvider>
    </Fragment>
  );
};

export default ButtonComponent;
