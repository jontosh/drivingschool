import {
  ModalConfirm,
  ModalEdit,
  ModalEmail,
  ModalError,
  ModalSuccess,
} from "@/components/modal/index.jsx";

export const ModalReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS": {
      return {
        ...state,
        modal: (
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
        modal: (
          <ModalError
            data={action?.data}
            open={action.open}
            onCancel={action.onEvent}
            footer={null}
            width={action.width}
            onOk={action.Ok}
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
    case "EMAIL": {
      return {
        ...state,
        modal: (
          <ModalEmail
            footer={null}
            onOk={action.onOk}
            onCancel={action.onCancel}
            open={action.open}
            width={action.width}
            onFinish={action.onFinish}
            keywords={action.keywords}
            form={action.form}
            title={action.title}
            data={action.data}
          />
        ),
      };
    }
    default:
      console.error(`Unknown action: ${action.type}`);
      return state;
  }
};
