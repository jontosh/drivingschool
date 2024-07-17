import ButtonComponent from "@/components/button/index.jsx";
import Modal from "@/components/modal/index.jsx";
import TableComponent from "@/components/table/index.jsx";
import Title from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import {
  StudentAccountEnrollmentModule,
  StudentAccountModule,
} from "@/modules/student-account.jsx";
import { ResultModalButton } from "@/pages/student/items/modal.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";
import classNames from "classnames";
import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BillingStyle from "./student-account.module.scss";

const Enrollment = () => {
  const { data: Packages } = useRequestGetQuery({
    path: "/account_management/services/service/",
  });
  const { data: Instructor } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { studentId } = useParams();
  const { colorsObject } = useContext(ColorsContext);
  const [IsOpen, setIsOpen] = useState(false);
  const [ModalCase, setModalCase] = useState("");
  const { ResultOfModalContent } = ResultModalButton(ModalCase);
  const { data, columns } = StudentAccountEnrollmentModule();
  const [EnrollmentData, setEnrollmentData] = useState([]);
  const [Price, setPrice] = useState(0);

  useEffect(() => {
    const enrollment = [];
    let price = 0;

    for (let i = 0; i < data?.length; i++) {
      if (studentId === data[i]?.student) {
        for (let j = 0; j < Packages?.length; j++) {
          if (data[i].package[i] === Packages[j]?.id) {
            //   Packages[j]?.name
            enrollment.push({
              ...data[i],
              package: Packages[j]?.name,
            });
            for (let k = 0; k < Instructor?.length; k++) {
              if (data[i].by === Instructor[k]?.id) {
                //   code
              }
            }
          }
        }
      }
    }

    for (let i = 0; i < enrollment.length; i++) {
      price += enrollment[i].price;
    }

    setPrice(price);
    setEnrollmentData(enrollment);
  }, [data, Packages, Instructor]);

  const handleModal = (typeModal = "") => {
    setIsOpen((prev) => !prev);
    setModalCase(typeModal);
  };

  return (
    <Fragment>
      <div className="border shadow-2xl border-indigo-700 px-10 py-5 rounded-2xl">
        <div className="-mx-10 px-3 md:px-10 border-b pb-5 border-b-gray-400 flex items-center flex-col md:flex-row max-md:space-y-2.5 justify-between">
          <Title level={2} fontSize={"text-xl space-x-2"}>
            <span className="text-indigo-700">Enrollment</span>
            <span className={"text-[#24C18F]"}>${Price}</span>
          </Title>

          <div className="grid min-[500px]:grid-cols-3 gap-2 max-md:w-full">
            <ButtonComponent
              defaultBg={"#24C18F"}
              defaultHoverBg={"#3CE3AE"}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={16}
              fontSize={14}
              borderRadius={5}
            >
              + Add new
            </ButtonComponent>

            <ButtonComponent
              defaultBg={colorsObject.orange}
              defaultHoverBg={colorsObject.orange}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={29}
              fontSize={14}
              borderRadius={5}
              onClick={() => handleModal("email")}
            >
              Email
            </ButtonComponent>

            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.info}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={29}
              fontSize={14}
              borderRadius={5}
              onClick={() => handleModal("print")}
            >
              Print
            </ButtonComponent>
          </div>
        </div>
        <div className="pt-5 -mx-10">
          <TableComponent columns={columns} data={EnrollmentData} />
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
    </Fragment>
  );
};

const Billings = () => {
  const { data: Instructor } = useRequestGetQuery({
    path: "/student_account/instructor/",
  });
  const { colorsObject } = useContext(ColorsContext);
  const { studentId } = useParams();
  const { data, columns } = StudentAccountModule();
  const [ModalCase, setModalCase] = useState("");
  const [IsOpen, setIsOpen] = useState(false);
  const [BillingData, setBillingData] = useState([]);
  const { ResultOfModalContent } = ResultModalButton(ModalCase);
  const [Price, setPrice] = useState(0);

  useEffect(() => {
    const student = [];
    let price = 0;
    for (let i = 0; i < data?.length; i++) {
      if (studentId === data[i]?.student) {
        student.push(data[i]);
      }
    }
    for (let i = 0; i < student.length; i++) {
      price += student[i].price;
    }
    setPrice(price);
    setBillingData(student);
  }, [data, Instructor]);

  const handleModal = (typeModal = "") => {
    setIsOpen((prev) => !prev);
    setModalCase(typeModal);
  };

  return (
    <Fragment>
      <div className="border shadow-2xl border-indigo-700 px-10 py-5 rounded-2xl">
        <div className="-mx-10 px-3 md:px-10 border-b pb-5 border-b-gray-400 flex items-center flex-col md:flex-row max-md:space-y-2.5 justify-between">
          <Title level={2} fontSize={"text-xl space-x-2"}>
            <span className="text-indigo-700">Billing</span>
            <span className={"text-[#24C18F]"}>${Price}</span>
          </Title>

          <div className="grid min-[500px]:grid-cols-3 gap-2 max-md:w-full">
            <ButtonComponent
              defaultBg={"#24C18F"}
              defaultHoverBg={"#3CE3AE"}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={16}
              fontSize={14}
              borderRadius={5}
            >
              + Add new
            </ButtonComponent>

            <ButtonComponent
              defaultBg={colorsObject.orange}
              defaultHoverBg={colorsObject.orange}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={29}
              fontSize={14}
              borderRadius={5}
              onClick={() => handleModal("email")}
            >
              Email
            </ButtonComponent>

            <ButtonComponent
              defaultBg={colorsObject.info}
              defaultHoverBg={colorsObject.info}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              paddingInline={29}
              fontSize={14}
              borderRadius={5}
              onClick={() => handleModal("print")}
            >
              Print
            </ButtonComponent>
          </div>
        </div>
        <div className="pt-5 -mx-10">
          <TableComponent columns={columns} data={BillingData} />
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
