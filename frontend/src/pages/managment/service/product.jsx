import TableComponent from "@/components/table/index.jsx";
import { useFilterStatus } from "@/hooks/filter.jsx";
import { ProductModule } from "@/modules/product.jsx";

export const Product = ({ status, search }) => {
  const { columns, data } = ProductModule();
  const { Data } = useFilterStatus({ data, status, search });

  return <TableComponent columns={columns} data={Data} />;
};
