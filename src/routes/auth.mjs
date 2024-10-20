import { Router } from "express";
import passport from "passport";

//constants
import { mockUsers } from "../utils/_constants.mjs";
//middleware
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
//utils
import { createGoogleValidationSchema } from "../utils/_validationSchemas.mjs";

const router = Router();

//AUTHENTICATION WITH SESSIONS(Need to change "app" to "router", and import some constants)

// app.post("/api/auth", (req, res) => {
//   const {
//     body: { userName, password },
//   } = req;
//   const findUser = mockUsers.find((user) => user.userName === userName);
//   if (!findUser || findUser.password !== password)
//     return res.status(401).send({ msg: "BAD CREDENTIALS" });

//   req.session.user = findUser;
//   return res.status(200).send(findUser);
// });

// app.get("/api/auth/status", (req, res) => {
//   return req.session.user
//     ? res.status(200).send(req.session.user)
//     : res.status(401).send({ msg: "Not Authenticated" });
// });

// app.post("/api/cart", (req, res) => {
//   if (!req.session.user) return res.sendStatus(401);
//   const { body: item } = req;
//   const { cart } = req.session;

//   if (cart) {
//     cart.push(item);
//   } else {
//     req.session.cart = [item];
//   }
//   return res.status(201).send(item);
// });

// app.get("/api/cart", (req, res) => {
//   if (!req.session.user) return res.sendStatus(401);
//   return res.send(req.session.cart ?? []);
// });

router.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});
router.get("/api/auth/status", (req, res) => {
  console.log(`Inside status endpoint`);
  console.log(req.user);
  console.log(req.session);
  console.log(req.sessionID);

  return req.user ? res.send(req.user) : res.sendStatus(401);
});
router.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(400);
  req.logout((err) => {
    if (err) return res.send(err);
    res.sendStatus(200);
  });
});
router.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {}
);
router.get(
  "/api/auth/google/home",
  // checkSchema(createGoogleValidationSchema),
  passport.authenticate("google", {
    successRedirect: "/api/auth/status",
    failureRedirect: "/api/auth",
  }),
  (req, res) => {
    req.sendStatus(201);
  }
);

export default router;
