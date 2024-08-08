import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
const authenticate = (req, res, next) => {
  // In req header we send Authorization key in which we pass the JWT token that we have created while login -- in Postman
  const token = req.header("Authorization");
  if (!token) {
    return next(createHttpError(401, "Authorization token is required"));
  }
  // we pass Authorization key the value = "bearer @#$%^&*YOUR-JWT-TOKEN@#$%^&*"
  const parseToken = token.split(" ")[1];

  try {
    const decoded = jwt.verify(parseToken, config.jwtSecret);
    console.log("decoded", decoded);
    req.userId = decoded.sub;

  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "User not authenticated"));
  }
  // res.json({ msg: "Authentication Successfull" });
  next();
};
export default authenticate;
