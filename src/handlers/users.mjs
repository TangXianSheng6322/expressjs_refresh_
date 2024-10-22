import { mockUsers } from "../utils/_constants.mjs";
export const getUserByIdHandler = (req, res) => {
  const { findIndex } = req;
  const findUser = mockUsers[findIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
};
