import request from "supertest";
import { createApp } from "../createApp.mjs";

const app = createApp;

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
