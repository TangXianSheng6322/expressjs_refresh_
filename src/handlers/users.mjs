import { mockUsers } from "../utils/_constants.mjs";
import { validationResult, matchedData } from "express-validator";
import { hashPassword } from "../utils/_helpers.mjs";
import { User } from "../mongoose/schemas/user.mjs";

export const getUserByIdHandler = (req, res) => {
  const { findIndex } = req;
  const findUser = mockUsers[findIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
};

export const createUserHandler = async (req, res) => {
  // console.log(req.body);
  if (!validationResult(req).isEmpty()) {
    // return res.status(400).send({ errors: validationResult(req).array() });
    return res.status(400).send(validationResult(req).array());
  }

  const data = matchedData(req);
  // const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
  // console.log(data);
  data.password = hashPassword(data.password);
  // console.log(data);
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
};
