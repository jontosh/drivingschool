export const formatPhoneNumber = (value) => {
  let formattedNumber;
  // const { name, value } = e.target;
  // const { length } = value;
  // Filter non numbers
  const regex = () => value.replace(/[^0-9\.]+/g, "");
  // Set area code with parenthesis around it
  const areaCode = () => `(${regex().slice(0, 3)})`;

  // Set formatting for first six digits
  const firstSix = () => `${areaCode()} ${regex().slice(3, 6)}`;

  // Dynamic trail as user types
  const trailer = (start) => `${regex().slice(start, regex().length)}`;
  if (value?.length < 3) {
    // First 3 digits
    formattedNumber = regex();
  } else if (value?.length === 4) {
    // After area code
    formattedNumber = `${areaCode()} ${trailer(3)}`;
  } else if (value?.length === 5) {
    // When deleting digits inside parenthesis
    formattedNumber = `${areaCode().replace(")", "")}`;
  } else if (value?.length > 5 && value?.length < 9) {
    // Before dash
    formattedNumber = `${areaCode()} ${trailer(3)}`;
  } else if (value?.length >= 10) {
    // After dash
    formattedNumber = `${firstSix()}-${trailer(6)}`;
  }

  return { formattedNumber };
};
