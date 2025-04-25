import { Paragraph } from "@/components/title/index.jsx";

/**
 * Universal table column render function for simple text columns.
 * @param {object} options
 * @param {string} options.text - Text to render
 * @param {string} [options.fontSize="text-lg"]
 * @param {number} [options.fontWeight=400]
 * @param {string} [options.className]
 * @returns {JSX.Element}
 */
export const CustomTableColumn = ({ text, fontSize = "text-lg", fontWeight = 400, className = "" }) => (
  <Paragraph fontSize={fontSize} fontWeightStrong={fontWeight} className={className}>
    {text}
  </Paragraph>
);

// For Ant Design Table columns usage:
// render: (text) => <CustomTableColumn text={text} />
