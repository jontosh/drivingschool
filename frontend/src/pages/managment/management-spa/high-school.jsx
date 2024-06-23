import TableComponent from "@/components/table/index.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { HighSchoolModule } from "@/modules/management.jsx";

export const HighSchool = ({ status, search }) => {
  const { columns, data } = HighSchoolModule();
  const { Data } = useFilterStatus({ data, status, search });

  return <TableComponent columns={columns} data={Data} />;
};
