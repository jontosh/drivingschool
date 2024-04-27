import { Paragraph } from "@/components/title/index.jsx";

export const IncameModule = () => {
  const columns = [
    {
      title: "Payment name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Paragraph fontSize={"text-base"}>{text}</Paragraph>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (date) => <Paragraph fontSize={"text-base"}>{date}</Paragraph>,
    },
    {
      title: "Transaction Id",
      dataIndex: "transactionId",
      key: "transactionId",
      align: "center",
      render: (id) => <Paragraph fontSize={"text-base"}>{id}</Paragraph>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (amount) => (
        <Paragraph fontSize={"text-base"}>{amount}$</Paragraph>
      ),
    },
  ];
  const data = [
    {
      name: "Payment",
      date: "02.24.2025",
      transactionId: "Drive 1h car",
      amount: 985,
    },
    {
      name: "Payment",
      date: "02.24.2025",
      transactionId: "Drive 1h car",
      amount: 985,
    },
    {
      name: "Payment",
      date: "02.24.2025",
      transactionId: "Drive 1h car",
      amount: 985,
    },
  ];
  return { columns, data };
};
