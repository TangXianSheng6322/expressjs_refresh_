import { Router } from "express";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
import { createValidationSchemas } from "../utils/_validationSchemas.mjs";
//constants
import { mockUsers } from "../utils/_constants.mjs";
//middleware
import { resolveUserById, loggingMiddlewear } from "../utils/_middleware.mjs";
//db schemas
import { User } from "../mongoose/schemas/user.mjs";
//utils
import { hashPassword } from "../utils/_helpers.mjs";

const router = Router();

//GET routes
router.get(
  "/api/user",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 4 })
    .withMessage(
      "Must should contain the minimum of 5 characters and the maximun of 10 characters"
    ),
  (req, res) => {
    // const { filter, value } = req.query;
    console.log(req.session.id);
    req.sessionStore.get(req.sessionID, (err, sessionData) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log("Inside Session Store Get");
      console.log(sessionData);
    });
    const {
      query: { filter, value },
    } = req;
    console.log(validationResult(req));
    if (filter && value) {
      return res.send(mockUsers.filter((user) => user[filter].includes(value)));
    } else {
      return res.status(200).send(mockUsers);
    }
  }
);

router.get("/api/user/:id", resolveUserById, (req, res) => {
  const { findIndex } = req;
  const findUser = mockUsers[findIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

//POST routes
router.post(
  "/api/user",
  // [
  //   body("userName")
  //     .notEmpty()
  //     .withMessage("Username cannot be empty")
  //     .isLength({ min: 5, max: 30 })
  //     .withMessage("Username should contain 5-30 characters")
  //     .isString()
  //     .withMessage("Username must be a string"),
  //   body("displayName").notEmpty(),
  // ],
  checkSchema(createValidationSchemas),
  async (req, res) => {
    console.log(req.body);
    if (!validationResult(req).isEmpty()) {
      return res.status(400).send({ errors: validationResult(req).array() });
    }

    const data = matchedData(req);
    // const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
    console.log(data);
    data.password = hashPassword(data.password);
    console.log(data);
    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    // mockUsers.push(newUser);
    // return res.status(201).send(newUser);
  }
);

//PUT PATCH routes
router.put("/api/user/:id", resolveUserById, loggingMiddlewear, (req, res) => {
  const { body, findIndex } = req;

  mockUsers[findIndex] = { id: mockUsers[findIndex].id, ...body };
  return res.sendStatus(200);
});

router.patch("/api/user/:id", resolveUserById, (req, res) => {
  const { body, findIndex } = req;
  mockUsers[findIndex] = { ...mockUsers[findIndex], ...body };
  return res.sendStatus(200);
});

//DELETE routes
router.delete("/api/user/:id", resolveUserById, (req, res) => {
  const { findIndex } = req;
  mockUsers.splice(findIndex, 1);
  return res.sendStatus(200);
});

router.delete("/api/user", (req, res) => {
  const {
    query: { filter, value },
  } = req;
  console.log(filter, value);

  if (filter === "all" && value === "true") {
    mockUsers.splice(0, mockUsers.length);
  }

  return res.status(200).send(mockUsers);
});
export default router;
