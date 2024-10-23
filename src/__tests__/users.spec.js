import validator from "express-validator";
import { createUserHandler, getUserByIdHandler } from "../handlers/users.mjs";
import { mockUsers } from "../utils/_constants.mjs";

jest.mock("express-validator", () => ({
  validationResult: jest.fn(() => ({
    isEmpty: jest.fn(() => false),
    array: jest.fn(() => [{ msg: "Invalid Username" }]),
  })),
}));

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

describe("create users", () => {
  const mockRequest = {};

  const mockResponse = {
    sendStatus: jest.fn(),
    send: jest.fn(),
    status: jest.fn(() => mockResponse),
  };

  it("should return the status 400 when there are errors", async () => {
    await createUserHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalledTimes(2);
    expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith([
      { msg: "Invalid Username" },
    ]);
  });
});
