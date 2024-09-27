export const useReducer = (state, action) => {
  switch (action.type) {
    case "admin": {
      return {
        ...state,
        portal: action.pathname.split("/")[1] === action.type,
        portalText: action.type,
        content: action?.content,
      };
    }
    case "instructor": {
      return {
        ...state,
        portal: action.pathname.split("/")[1] === action.type,
        portalText: action.type,
        content: action?.content,
      };
    }
    case "student": {
      return {
        ...state,
        portal: action.pathname.split("/")[1] === action.type,
        portalText: action.type,
        content: action?.content,
      };
    }
    default: {
      return state;
    }
  }
};

export const useBaseURL = () => {
  const { pathname } = window.location;

  return { pathname: pathname.split("/")[1] };
};
