export const useReducer = (state, action) => {
  switch (action.type) {
    case "admin": {
      return {
        ...state,
        portal: action.pathname.split("/")[1] === action.type,
        portalText: action.type,
      };
    }
    case "instructor": {
      return {
        ...state,
        portal: action.pathname.split("/")[1] === action.type,
        portalText: action.type,
      };
    }
    case "student": {
      return {
        ...state,
        portal: action.pathname.split("/")[1] === action.type,
        portalText: action.type,
      };
    }
    default: {
      return state;
    }
  }
};
