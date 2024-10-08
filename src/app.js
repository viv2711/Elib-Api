/* eslint-disable no-unused-vars */
import createHttpError from "http-errors";
import express from "express";
import globalErrorHandler from "./middlewares/globalHandler.js";
import { config } from "./config/config.js";
import userRouter from "./user/userRouter.js";
import bookRouter from "./book/bookRouter.js";
import cors from 'cors';
const app = express();

app.use(cors({
  origin: config.frontend_domain,
}));
// In built middleware for json parsing
app.use(express.json());

// Routes
app.get("/", (req, res, next) => {
  res.json({ msg: "Welcome to the elib apis" });
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// Global Error Handler - it is a special type of middleware where we have four params
app.use(globalErrorHandler);
export default app;
