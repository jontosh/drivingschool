import { Badge, ConfigProvider } from "antd";
import classNames from "classnames";

const BadgeComponent = ({
  className,
  text,
  status,
  children,
  style,
  ...props
}) => {
  className = classNames(className);
  return (
    <ConfigProvider>
      <Badge
        className={className}
        text={text}
        status={status}
        children={children}
        style={style}
        classNames={props.classNames}
        {...props}
      />
    </ConfigProvider>
  );
};

export default BadgeComponent;
