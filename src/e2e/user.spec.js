import request from "supertest";
import { createApp } from "../createApp.mjs";
import mongoose from "mongoose";

describe("create user and login", () => {
  let app;
  beforeAll(() => {
    mongoose
      .connect("mongodb://localhost/express_tutorial_test")
      .then(() => console.log("Connected to Test Database"))
      .catch((err) => console.log(`Error: ${err}`));
    app = createApp();
  });

  it("should create a user", async () => {
    const response = await request(app)
      .post("/api/user")
      .send({ userName: "Pupsik", password: "Meow", displayName: "ImUrBaby" });

    expect(response.statusCode).toBe(201);
  });

  it("should log the user in", async () => {
    const response = await request(app)
      .post("/api/auth")
      .send({ userName: "Pupsik", password: "Meow" });

    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
