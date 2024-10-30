import request from "supertest";
import { createApp } from "../createApp.mjs";
import mongoose from "mongoose";

describe("/api/auth", () => {
  let app;
  beforeAll(() => {
    mongoose
      .connect("mongodb://localhost/express_tutorial_test")
      .then(() => console.log("Connected to Test Database"))
      .catch((err) => console.log(`Error: ${err}`));
    app = createApp();
  });

  it("should return 401 when user is not authenticated", async () => {
    const response = await request(app).get("/api/auth/status");
    expect(response.statusCode).toBe(401);
  });
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});

// app.get("/hello", (req, res) => {
//   res.status(200).send({ msg: "Hey pookie" });
// });

// // describe("hello endpoint", () => {
// //   it("should get /hello and send status 200 and a message 'Hey pookie'", () => {
// //     request(app)
// //       .get("/hello")
// //       .expect(200, { msg: "Hey pookie" })
// //       .end((err, res) => {
// //         if (err) throw err;
// //       });
// //   });
// // });

// describe("hello endpoint", () => {
//   it("should get /hello and send status 200 and a message 'Hey pookie'", async () => {
//     const response = await request(app).get("/hello");
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toStrictEqual({ msg: "Hey pookie" });
//   });
// });
