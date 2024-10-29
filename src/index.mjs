// import "./strategies/local_strategy.mjs";
import "./strategies/google_strategy.mjs";
import { createApp } from "./createApp.mjs";
import mongoose from "mongoose";
import "dotenv/config";

mongoose
  .connect("mongodb://localhost/express_t")
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

const app = createApp();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
