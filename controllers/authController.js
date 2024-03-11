//internal imports
import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  //validate
  if (!name) {
    return res
      .status(400)
      .send({ success: false, message: "Please provide name" });
  }
  if (!email) {
    return res
      .status(400)
      .send({ success: false, message: "Please provide email" });
  }
  if (!password) {
    return res
      .status(400)
      .send({ success: false, message: "Password is required" });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("password is required and must be greater than 6 characters");
    // return res.status(200).send({
    //   success: false,
    //   message: "User already registered. Please login.",
    // });
  }

  const user = await userModel.create({ name, email, password });
  res.status(201).send({
    success: true,
    message: "User registration successful",
    user,
  });
};
