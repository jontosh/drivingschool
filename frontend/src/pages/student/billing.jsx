import ButtonComponent from "@/components/button/index.jsx";
import { CustomSelect } from "@/components/form/index.jsx";
import Modal from "@/components/modal/index.jsx";
import Title, { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { ResultModalButton } from "@/pages/student/items/modal.jsx";
import { Table } from "antd";
import classNames from "classnames";
import { Fragment, useContext, useState } from "react";
import BillingStyle from "./student-account.module.scss";

const Enrollment = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [IsOpen, setIsOpen] = useState(false);
  const [ModalCase, setModalCase] = useState("");
  const { ResultOfModalContent } = ResultModalButton(ModalCase);

  const handleModal = (typeModal = "") => {
    setIsOpen((prev) => !prev);
    setModalCase(typeModal);
  };

  const columns = [
    {
      title: "Package",
      dataIndex: "packages",
      key: "packages",
      align: "center",
      render: (text) => <Paragraph className={"text-center"}>{text}</Paragraph>,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      align: "center",
      render: (code) => <Paragraph className={"text-center"}>{code}</Paragraph>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => (
        <Paragraph className={"text-center"}>${price}</Paragraph>
      ),
    },
    {
      title: "Database Id",
      dataIndex: "dbId",
      key: "dbId",
      align: "center",
      render: (id) => <Paragraph className={"text-center"}>{id}</Paragraph>,
    },
    {
      title: "Data enrolled",
      dataIndex: "dataEnrolled",
      key: "dataEnrolled",
      align: "center",
      render: (time) => <Paragraph className={"text-center"}>{time}</Paragraph>,
    },
    {
      title: "Enrolled by",
      dataIndex: "enrolledBy",
      key: "enrolledBy",
      align: "center",
      render: (by) => <Paragraph className={"text-center"}>{by}</Paragraph>,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      align: "center",
      render: (notes) => (
        <Paragraph className={"text-center"}>{notes}</Paragraph>
      ),
    },
    {
      title: "",
      key: "",
      render: () => (
        <div className={"text-center"}>
          <CustomSelect
            selectorBg={colorsObject.info}
            className={`${BillingStyle["Billing__select"]}`}
            value={"Status"}
            options={[
              {
                value: "Edit",
                label: "Edit",
              },
              {
                value: "Delete",
                label: "Delete",
              },
              {
                value: "Print",
                label: "Print",
              },
              {
                value: "Email",
                label: "Email",
              },
            ]}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      packages: "8h in car",
      code: "01",
      price: 649.99,
      dbId: 135,
      dataEnrolled: "3/9/2024 1:37 pm",
    },
    {
      packages: "8h in car",
      code: "02",
      price: 649.99,
      dbId: 136,
      dataEnrolled: "3/9/2024 1:37 pm",
    },
  ];
  return (
    <div>
      <div className="border shadow-2xl border-indigo-700 px-10 py-5 rounded-2xl">
        <div className="-mx-10 px-10 border-b pb-5 border-b-gray-400 flex justify-between">
          <Title level={2} fontSize={"text-xl space-x-2"}>
            <span className="text-indigo-700">Enrollment</span>
            <span className={"text-[#24C18F]"}>$649,99</span>
          </Title>

          <div className="space-x-2">
            <ButtonComponent
              controlHeight={26}
              defaultBg={"#24C18F"}
              defaultHoverBg={"#3CE3AE"}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={16}
              fontSize={10}
              borderRadius={5}
            >
              + Add new
            </ButtonComponent>

            <ButtonComponent
              controlHeight={26}
              defaultBg={colorsObject.orange}
              defaultHoverBg={colorsObject.orange}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={29}
              fontSize={10}
              borderRadius={5}
              onClick={() => handleModal("email")}
            >
              Email
            </ButtonComponent>

            <ButtonComponent
              controlHeight={26}
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.info}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={29}
              fontSize={10}
              borderRadius={5}
              onClick={() => handleModal("print")}
            >
              Print
            </ButtonComponent>
          </div>
        </div>
        <div className="pt-5 -mx-10">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      </div>
      {IsOpen && (
        <Modal setIsOpen={setIsOpen}>
          <div
            className={classNames(
              "py-6 px-8 bg-white rounded-2xl w-full",
              BillingStyle["Modal__content"],
            )}
          >
            <ResultOfModalContent
              modalButton={ModalCase}
              handleClose={() => setIsOpen(false)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
const Billings = () => {
  const { colorsObject } = useContext(ColorsContext);
  const [IsOpen, setIsOpen] = useState(false);
  const [ModalCase, setModalCase] = useState("");
  const { ResultOfModalContent } = ResultModalButton(ModalCase);

  const handleModal = (typeModal = "") => {
    setIsOpen((prev) => !prev);
    setModalCase(typeModal);
  };
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text) => (
        <Paragraph fontWeightStrong={500} className={"text-center"}>
          {text}
        </Paragraph>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (code) => (
        <Paragraph fontWeightStrong={500} className={"text-center"}>
          {code}
        </Paragraph>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (price) => (
        <Paragraph fontWeightStrong={500} className={"text-center"}>
          {price}
        </Paragraph>
      ),
    },
    {
      title: "Database Id",
      dataIndex: "dbId",
      key: "dbId",
      align: "center",
      render: (id) => (
        <Paragraph fontWeightStrong={500} className={"text-center"}>
          {id}
        </Paragraph>
      ),
    },
    {
      title: "Accepted by staff",
      dataIndex: "acceptedBy",
      key: "acceptedBy",
      align: "center",
      render: (by) => (
        <Paragraph fontWeightStrong={500} className={"text-center"}>
          {by}
        </Paragraph>
      ),
    },
    {
      title: "Payment note",
      dataIndex: "notes",
      key: "notes",
      align: "center",
      render: (notes) => (
        <Paragraph fontWeightStrong={500} className={"text-center"}>
          {notes}
        </Paragraph>
      ),
    },
    {
      title: "",
      key: "",
      render: () => (
        <div className={"text-center"}>
          <CustomSelect
            selectorBg={colorsObject.info}
            className={`${BillingStyle["Billing__select"]}`}
            value={"Status"}
            options={[
              {
                value: "Edit",
                label: "Edit",
              },
              {
                value: "Delete",
                label: "Delete",
              },
              {
                value: "Print",
                label: "Print",
              },
              {
                value: "Email",
                label: "Email",
              },
            ]}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      date: "4/2/2024",
      type: "VISA",
      amount: 649.99,
      dbId: 135,
    },
    {
      date: "4/2/2024",
      type: "Paypal",
      amount: 649.99,
      dbId: 136,
    },
  ];
  return (
    <Fragment>
      <div className="border shadow-2xl border-indigo-700 px-10 py-5 rounded-2xl">
        <div className="-mx-10 px-10 border-b pb-5 border-b-gray-400 flex justify-between">
          <Title level={2} fontSize={"text-xl space-x-2"}>
            <span className="text-indigo-700">Billing</span>
            <span className={"text-[#24C18F]"}>$0,00</span>
          </Title>

          <div className="space-x-2">
            <ButtonComponent
              controlHeight={26}
              defaultBg={"#24C18F"}
              defaultHoverBg={"#3CE3AE"}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={16}
              fontSize={10}
              borderRadius={5}
            >
              + Add new
            </ButtonComponent>

            <ButtonComponent
              controlHeight={26}
              defaultBg={colorsObject.orange}
              defaultHoverBg={colorsObject.orange}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={29}
              fontSize={10}
              borderRadius={5}
              onClick={() => handleModal("email")}
            >
              Email
            </ButtonComponent>

            <ButtonComponent
              controlHeight={26}
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.info}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={29}
              fontSize={10}
              borderRadius={5}
              onClick={() => handleModal("print")}
            >
              Print
            </ButtonComponent>
          </div>
        </div>
        <div className="pt-5 -mx-10">
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
        {IsOpen && (
          <Modal setIsOpen={setIsOpen}>
            <div
              className={classNames(
                "py-6 px-8 bg-white rounded-2xl w-full",
                BillingStyle["Modal__content"],
              )}
            >
              <ResultOfModalContent
                modalButton={ModalCase}
                handleClose={() => setIsOpen(false)}
              />
            </div>
          </Modal>
        )}
      </div>
    </Fragment>
  );
};

export const Billing = () => {
  return (
    <div className={"space-y-8"}>
      <Enrollment />
      <Billings />
    </div>
  );
};
