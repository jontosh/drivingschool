import { ConfigProvider, Typography } from "antd";
import classNames from "classnames";
import { Fragment } from "react";
import TypographyStyle from "./title.module.scss";

const Title = ({
  children,
  className,
  titleMarginTop = 0,
  titleMarginBottom = 0,
  level = 1,
  fontSize,
  fontWeightStrong = 600,
  ...props
}) => {
  className = classNames([TypographyStyle["Title"], className]);
  return (
    <Fragment>
      <ConfigProvider
        theme={{
          components: {
            Typography: {
              titleMarginTop,
              titleMarginBottom,
              fontFamily: "inherit",
              fontWeightStrong,
            },
          },
        }}
      >
        <Typography.Title className={className} level={level} {...props}>
          <span className={fontSize}>{children}</span>
        </Typography.Title>
      </ConfigProvider>
    </Fragment>
  );
};

export const Paragraph = ({
  className,
  children,
  titleMarginTop = 0,
  titleMarginBottom = 0,
  fontSize,
  colorText = "#000",
  fontWeightStrong = 400,
  onClick,
}) => {
  className = classNames([className, TypographyStyle["Paragraph"]]);
  return (
    <Fragment>
      <ConfigProvider
        theme={{
          components: {
            Typography: {
              titleMarginTop,
              fontFamily: "inherit",
              titleMarginBottom,
              colorText,
              fontWeightStrong,
            },
          },
        }}
      >
        <Typography.Paragraph className={className} onClick={onClick}>
          <span className={fontSize}>{children}</span>
        </Typography.Paragraph>
      </ConfigProvider>
    </Fragment>
  );
};

export const Text = ({
  children,
  className,
  fontSize = 10,
  fontWeightStrong = 400,
}) => {
  className = classNames([className, TypographyStyle["Text"]]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Typography: {
            fontFamily: "inherit",
            fontSize,
            fontWeightStrong,
          },
        },
      }}
    >
      <Typography.Text className={className}>{children}</Typography.Text>
    </ConfigProvider>
  );
};

export default Title;
