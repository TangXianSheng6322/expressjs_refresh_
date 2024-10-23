import * as validator from "express-validator";
import * as helpers from "../utils/_helpers.mjs";
import { createUserHandler, getUserByIdHandler } from "../handlers/users.mjs";
import { mockUsers } from "../utils/_constants.mjs";
import { User } from "../mongoose/schemas/user.mjs";

jest.mock("express-validator", () => ({
  validationResult: jest.fn(() => ({
    isEmpty: jest.fn(() => false),
    array: jest.fn(() => [{ msg: "Invalid Username" }]),
  })),
  matchedData: jest.fn(() => ({
    userName: "test",
    password: "password",
    displayName: "displayName",
  })),
}));
jest.mock("../mongoose/schemas/user.mjs");
jest.mock("../utils/_helpers.mjs", () => ({
  hashPassword: jest.fn((password) => `hashed_${password}`),
}));

//DESCRIBE 1
describe("get users", () => {
  const mockRequest = {
    findIndex: 2,
  };

  const mockResponse = {
    sendStatus: jest.fn(),
    send: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get user by id", () => {
    getUserByIdHandler(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalled();
    // expect(mockResponse.send).not.toHaveBeenCalled();
    // expect(mockResponse.send).toHaveBeenCalledWith(mockUsers[2]);
    // expect(mockResponse.send).toHaveBeenCalledWith({
    //   id: 2, ////id is 2,but index is 1
    //   userName: "sasha",
    //   displayName: "kOL",
    //   password: "hello000",
    // });
    expect(mockResponse.send).toHaveBeenCalledWith({
      id: 3,
      userName: "nina",
      displayName: "Joomn",
      password: "hello111",
    });
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
  });
  it("should call status 404 when user is not found", () => {
    const copyMockRequest = { ...mockUsers, findIndex: 99 };
    getUserByIdHandler(copyMockRequest, mockResponse);
    expect(mockResponse.sendStatus).toHaveBeenCalled();
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
    expect(mockResponse.sendStatus).toHaveBeenCalledTimes(1);
    expect(mockResponse.send).not.toHaveBeenCalled();
  });
});

//DESCRIBE 2
describe("create users", () => {
  const mockRequest = {};

  const mockResponse = {
    sendStatus: jest.fn(),
    send: jest.fn(),
    status: jest.fn(() => mockResponse),
  };
  //1st!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  it("should return the status 400 when there data was not validated", async () => {
    await createUserHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(2);
    expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith([
      { msg: "Invalid Username" },
    ]);
  });

  //2nd!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  it("should return the status 201 and user created", async () => {
    jest.spyOn(validator, "validationResult").mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));
    const saveMethod = jest
      .spyOn(User.prototype, "save")
      .mockResolvedValueOnce({
        id: 1,
        userName: "test",
        password: "hashed_password",
        displayName: "displayName",
      });

    await createUserHandler(mockRequest, mockResponse);

    expect(validator.matchedData).toHaveBeenCalledWith(mockRequest);
    expect(helpers.hashPassword).toHaveBeenCalledWith("password");
    expect(helpers.hashPassword).toHaveReturnedWith("hashed_password");
    expect(User).toHaveBeenCalledWith({
      userName: "test",
      password: "hashed_password",
      displayName: "displayName",
    });
    console.log(User.mock.instances[0]);
    // expect(User.mock.instances[0].save).toHaveBeenCalled(); ////or
    expect(saveMethod).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith({
      id: 1,
      userName: "test",
      password: "hashed_password",
      displayName: "displayName",
    });
  });

  //3rd!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  it("should throw error if user was not saved, with status 400", async () => {
    jest.spyOn(validator, "validationResult").mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));

    // const saveMethod = jest
    //   .spyOn(User.prototype, "save")
    //   .mockImplementationOnce(() => Promise.reject("Failed to save user"));
    ////or
    const saveMethod = jest
      .spyOn(User.prototype, "save")
      .mockRejectedValueOnce("Failed to save user");
    //^^^these are the same

    await createUserHandler(mockRequest, mockResponse);
    expect(saveMethod).toHaveBeenCalled();
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
  });
});
