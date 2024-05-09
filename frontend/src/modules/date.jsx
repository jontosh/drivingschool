export const useDateModule = () => {
  const Months = Array.from({ length: 12 }, (item, i) => {
    return {
      value: new Date(0, i).toLocaleString("en-US", { month: "long" }),
      label: new Date(0, i).toLocaleString("en-US", { month: "long" }),
    };
  });
  const YearsOptions = () => {
    let currentYear = new Date().getFullYear(),
      years = [];
    let startYear = 1999;
    while (startYear <= currentYear) {
      years.push({ value: startYear++, label: startYear++ });
    }
    return years;
  };

  return { Months, YearsOptions };
};
