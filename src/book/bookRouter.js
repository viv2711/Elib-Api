import express from "express";
import createBook from "./bookController.js"
const bookRouter = express.Router();

bookRouter.post("/register", createBook);

export default bookRouter