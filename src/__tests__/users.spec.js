import { getUserByIdHandler } from "../handlers/users.mjs";

const mockRequest = {
  findIndex: 2,
};

const mockResponse = {
  sendStatus: jest.fn(),
  send: jest.fn(),
};

describe("get users", () => {
  it("should get user by id", () => {
    getUserByIdHandler(mockRequest, mockResponse);
  });
});
