import TableComponent from "@/components/table/index.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { VehiclesModule } from "@/modules/management.jsx";

export const Vehicles = ({ status, search }) => {
  const { columns, data } = VehiclesModule();
  const { Data } = useFilterStatus({ data, status, search });

  return <TableComponent columns={columns} data={Data} />;
};
