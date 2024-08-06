/* eslint-disable no-unused-vars */
// Request Processing for userRouters - userController
import createHttpError from "http-errors";
import userModel from "./userModel.js";
export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  //Database Call
  // If user already exists with an email ID
  const user = await userModel.findOne({ email: email });
  if (user) {
    const error = createHttpError(400, "User already exists with this email");
    return next(error);
  }
  return res.json({ msg: "User Created Successfully" });
};
