import TableComponent from "@/components/table/index.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { LocationModule } from "@/modules/management.jsx";

export const Location = ({ status, search }) => {
  const { columns, data } = LocationModule();
  const { Data } = useFilterStatus({ data, status, search });

  return <TableComponent columns={columns} data={Data} />;
};
