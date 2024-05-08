import { CheckModal } from "@/modules/modals.jsx";
import classNames from "classnames";

const Modal = ({ className, children, ...props }) => {
  return (
    <section
      className={(classNames(className), "px-11 space-y-5 max-w-full w-full")}
      {...props}
    >
      <CheckModal />
    </section>
  );
};

export default Modal;
