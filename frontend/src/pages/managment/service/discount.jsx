import TableComponent from "@/components/table/index.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { DiscountsModule } from "@/modules/discount.jsx";

export const Discount = ({ status, search }) => {
  const { columns, data } = DiscountsModule();
  const { Data } = useFilterStatus({ data, status, search });

  return (
    <TableComponent columns={columns} dataSource={Data} pagination={false} />
  );
};
