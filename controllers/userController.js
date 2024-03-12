import userModel from "../models/userModel.js";

export const getUserController = async (req, res, next) => {
  const users = await userModel.find();
  res.status(200).json({
    message: "users retrieved successfully",
    users,
  });
};

export const updateUserController = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;
  if (!name || !email || !lastName || !location) {
    next("All fields are required");
  }
  const user = await userModel.findOne({
    _id: req.user.userId,
  });
  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};
