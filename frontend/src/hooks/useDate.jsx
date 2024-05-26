export const useDate = () => {
  const Months = Array.from({ length: 12 }, (item, i) => {
    return {
      value: i + 1,
      label: new Date(0, i).toLocaleString("en-US", { month: "long" }),
    };
  });

  const Days = Array.from({ length: 31 }, (item, i) => {
    i += 1;
    return {
      value: i,
      label: i,
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

  return { Months, YearsOptions, Days };
};
