import { useEffect, useState } from "react";

export const useFilterStatus = ({ data = [], status, search }) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filterData = () => {
      return data.filter((item) => {
        const lowerCaseSearch = search?.toLowerCase() || "";

        const matchesStatus = status
          ? item?.status?.toLowerCase() === status.toLowerCase()
          : true;

        const matchesSearch = Object.values(item).some((value) =>
          value?.toString()?.toLowerCase()?.includes(lowerCaseSearch),
        );

        return matchesStatus && matchesSearch;
      });
    };

    setFilteredData(filterData());
  }, [data, status, search]);

  return { Data: filteredData };
};

export const ActiveData = (data = []) =>
  data?.filter((item) => item?.status === "ACTIVE");
