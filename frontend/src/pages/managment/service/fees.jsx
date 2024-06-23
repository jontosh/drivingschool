import TableComponent from "@/components/table/index.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { FeesModule } from "@/modules/fees.jsx";

export const Fees = ({ status, search }) => {
  const { columns, data } = FeesModule();
  const { Data } = useFilterStatus({ data, status, search });

  return <TableComponent columns={columns} dataSource={Data} />;
};
