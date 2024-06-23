import TableComponent from "@/components/table/index.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { HearModule } from "@/modules/management.jsx";

export const Hear = ({ status, search }) => {
  const { columns, data } = HearModule();
  const { Data } = useFilterStatus({ data, status, search });

  return <TableComponent columns={columns} data={Data} />;
};
