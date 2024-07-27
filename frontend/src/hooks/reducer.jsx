import { ModalError, ModalSuccess } from "@/components/modal/index.jsx";

export const ModalReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        ...state,
        status: <ModalSuccess open={action.open} onEvent={action.onEvent} />,
      };
    case "ERROR":
      return {
        ...state,
        status: (
          <ModalError
            data={action?.data}
            open={action.open}
            onEvent={action.onEvent}
          />
        ),
      };
    default:
      console.error(`Unknown action: ${action.type}`);
      return state;
  }
};
