//internal imports
import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  //validate
  if (!name) {
    next("Name is required");
    // return res
    // .status(400)
    // .send({ success: false, message: "Please provide name" });
  }
  if (!email) {
    next("Email is required");
    // return res
    // .status(400)
    // .send({ success: false, message: "Please provide email" });
  }
  if (!password) {
    next("password is required and must be at least 6 characters");
    // return res
    // .status(400)
    // .send({ success: false, message: "Password is required" });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email is already registered. Please Login");
    // return res.status(200).send({
    //   success: false,
    //   message: "User already registered. Please login.",
    // });
  }

  const user = await userModel.create({ name, email, password });

  //token
  const token = user.createJWT();

  res.status(201).send({
    success: true,
    message: "User registration successful",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      locatio: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("All fields are required");
  }
  //find user by email
  const user = await userModel
    .findOne({
      email,
    })
    .select("+password"); //hiding the password
  if (!user) {
    next("Invalid Username or password");
  }
  //compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid Username or password");
  }
  user.password = undefined; //security purpose
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successful",
    user,
    token,
  });
};
