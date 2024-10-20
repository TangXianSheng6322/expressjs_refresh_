import mongoose from "mongoose";

const newGoogleUserSchema = new mongoose.Schema({
  userName: {
    type: mongoose.Schema.Types.String,
    required: false,
    unique: true,
  },
  googleId: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  email: { type: mongoose.Schema.Types.String, required: true, unique: true },
});

export const GoogleUser = mongoose.model("GoogleUser", newGoogleUserSchema);
