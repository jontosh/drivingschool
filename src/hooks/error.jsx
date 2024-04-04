export const useError = () => {
  const errors = {};

  const Validation = (type) => {
    switch (type) {
      case "EMPTY":
        errors.input = "Error input is empty";
      case "EMAIL_VALID":
        errors.email = "Invalid email address";
      default:
        throw new Error(`Error type ${type}`);
    }
  };

  return { errors, Validation };
};
