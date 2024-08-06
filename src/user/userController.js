/* eslint-disable no-unused-vars */
// Request Processing for userRouters - userController
import createHttpError from "http-errors";
import userModel from "./userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  //Database Call
  // If user already exists with an email ID
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const error = createHttpError(400, "User already exists with this email");
      return next(error);
    }
  } catch (err) {
    return next(createHttpError(500, "Error while getting user"));
  }

  // password -> Hashing for storing in the database
  const saltRounds = 10;
  let newUser;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return next(createHttpError(500, "Error while creating user"));
  }

  // Token Generation (JWT)
  const token = jwt.sign({ sub: newUser._id }, config.jwtSecret, {
    expiresIn: "7d",
    algorithm: "HS256",
  });

  return res.json({ accessToken: token });
};
