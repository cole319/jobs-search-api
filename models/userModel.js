import mongoose from "mongoose";
import validator from "validator";

//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required Field"],
    },
    lastName: {
      type: String,
    },

    email: {
      typeo: String,
      required: [true, "Required Field"],
      uinque: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Required Field"],
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
