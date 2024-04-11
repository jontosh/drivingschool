import classNames from "classnames";
import ModalStyle from "./modal.module.scss";

const Modal = ({ className, setIsOpen, children }) => {
  className = classNames(className, ModalStyle["Modal"]);
  const handleClick = (e) => {
    if (e.target.dataset.modal) {
      setIsOpen(false);
    }
  };

  return (
    <div
      data-modal
      onClick={handleClick}
      className={`fixed flex items-center justify-center flex-col top-0 left-0 z-20 w-full h-full ${className}`}
    >
      {children}
    </div>
  );
};

export default Modal;
