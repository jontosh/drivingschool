import TableComponent from "@/components/table/index.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { PackagesModule } from "@/modules/packages.jsx";

export const Packages = ({ status, search }) => {
  const { columns, data } = PackagesModule();
  const { Data } = useFilterStatus({ data, status, search });

  return (
    <TableComponent columns={columns} dataSource={Data} pagination={false} />
  );
};
