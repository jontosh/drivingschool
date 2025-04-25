import ButtonComponent from "@/components/button/index.jsx";
import { CheckProgress } from "@/modules/progress.jsx";

/**
 * Universal status button for tables.
 * @param {string} status - Status string (e.g. 'active', 'inactive', etc.)
 * @param {object} [style] - Optional style overrides
 * @param {number} [width=128] - Button width
 * @param {React.ReactNode} [children] - Optional children (overrides status text)
 */
const StatusButton = ({ status, style = {}, width = 128, children, ...props }) => {
  const { bg, hover } = CheckProgress(status);
  return (
    <ButtonComponent
      defaultBg={bg}
      defaultHoverBg={hover}
      borderRadius={5}
      style={{ width, ...style }}
      {...props}
    >
      {children || status?.toUpperCase()}
    </ButtonComponent>
  );
};

export default StatusButton;
