import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      type: String,
      required: [true, "Required Field"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Required Field"],
      minlength: [6, "Password should be at least 6 characters"],
      select: true,
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

//middlewares
userSchema.pre("save", async function () {
  //callback doesn't work
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//JSON Web Token
userSchema.methods.createJWT = function () {
  //rs256 by default
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default mongoose.model("User", userSchema);
