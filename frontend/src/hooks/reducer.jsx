import {
  ModalConfirm,
  ModalEdit,
  ModalError,
  ModalSuccess,
} from "@/components/modal/index.jsx";

export const ModalReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS": {
      return {
        ...state,
        status: (
          <ModalSuccess
            open={action.open}
            onEvent={action.onEvent}
            footer={null}
            width={action.width}
          />
        ),
      };
    }
    case "ERROR": {
      return {
        ...state,
        status: (
          <ModalError
            data={action?.data}
            open={action.open}
            onEvent={action.onEvent}
            footer={null}
            width={action.width}
          />
        ),
      };
    }
    case "CONFIRM": {
      return {
        ...state,
        modal: (
          <ModalConfirm
            footer={null}
            onOk={action.onOk}
            onCancel={action.onCancel}
            open={action.open}
            width={action.width}
          />
        ),
      };
    }
    case "EDIT": {
      return {
        ...state,
        modal: (
          <ModalEdit
            footer={null}
            onCancel={action.onCancel}
            open={action.open}
            form={action.form}
            onFinish={action.onFinish}
            width={action.width}
          >
            {action.children}
          </ModalEdit>
        ),
      };
    }
    default:
      console.error(`Unknown action: ${action.type}`);
      return state;
  }
};
