export const createValidationSchemas = {
  userName: {
    notEmpty: { errorMessage: "Username cannot be empty" },
    isString: { errorMessage: "Username must be a string" },
    isLength: {
      options: { min: 3, max: 32 },
      errorMessage: "Username should contain 5-30 characters",
    },
  },
  displayName: { notEmpty: true },
};
