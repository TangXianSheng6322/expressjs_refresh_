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
  password: { notEmpty: true },
};

export const createGoogleValidationSchema = {
  // userName: {
  //   notEmpty: { errorMessage: "Username cannot be empty" },
  //   isString: { errorMessage: "Username must be a string" },
  //   isLength: {
  //     options: { min: 3, max: 32 },
  //     errorMessage: "Username should contain 5-30 characters",
  //   },
  // },
  email: {
    notEmpty: { errorMessage: "Email cannot be empty" },
    isString: { errorMessage: "Email must be a string" },
  },
  id: {
    notEmpty: { errorMessage: "Email cannot be empty" },
    isString: { errorMessage: "Email must be a string" },
  },
};
