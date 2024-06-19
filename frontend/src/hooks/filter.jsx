import { useEffect, useState } from "react";

export const useFilterStatus = ({ data, status, search }) => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    setData(data);
  }, [data]);

  useEffect(() => {
    setData(() =>
      data?.filter(
        (item) => item?.status?.toLowerCase() === status?.toLowerCase(),
      ),
    );
  }, [status]);

  useEffect(() => {
    setData(() =>
      data?.filter((item) => {
        return (
          item?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.first_name?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.type_component
            ?.toLowerCase()
            ?.includes(search?.toLowerCase()) ||
          item?.type
            ?.toString()
            ?.toLowerCase()
            ?.includes(search?.toLowerCase()) ||
          item?.subtype_btw?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.code?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.email?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.cell_phone?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.birth?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.last_name?.toLowerCase()?.includes(search?.toLowerCase())
        );
      }),
    );
  }, [search]);

  return { Data };
};
