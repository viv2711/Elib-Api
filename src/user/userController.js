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
  try {
    const token = jwt.sign({ sub: newUser._id }, config.jwtSecret, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    return res.status(201).json({ accessToken: token });
  } catch (err) {
    return next(createHttpError(500, "Error while creating JWT server"));
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }
  let user;

  // handling user not found error
  try {
    user = await userModel.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }
  } catch (err) {
    return next(createHttpError(404, err));
  }

  // Verifying the password
  let isMatch;
  try {
    isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Username or Password Incorrect");
    }
  } catch (err) {
    return next(createHttpError(404, err));
  }

  // Create new access token for login
  try {
    const token = jwt.sign({ sub: user._id }, config.jwtSecret, {
      expiresIn: "7d",
      algorithm: "HS256",
    });
    res.json({ accessToken: token });
  } catch (err) {
    return next(createHttpError(500, "Unable to create token"));
  }
};
