import express from "express";
import "./strategies/local_strategy.mjs";
// import "./strategies/google_strategy.mjs";x
//routes
import routes from "./routes/_index.mjs";
//middlewear
import "dotenv/config";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser("helloworld"));
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: { maxAge: 60000 * 60 },
      store: MongoStore.create({ client: mongoose.connection.getClient() }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(routes);

  // app.use(resolveUserById);
  // app.use(loggingMiddlewear);
  //had to remove this for app to work again
  //Oh, it's used globally, so no need to code app.use

  app.get("/", (req, res) => {
    req.session.visited = true;
    res.cookie("hello", "world", { maxAge: 60000 * 60, signed: true });
    res.send({ msg: "Hello" });
  });

  // app.post("/api/auth", passport.authenticate("local"), (req, res) => {});
  return app;
}
