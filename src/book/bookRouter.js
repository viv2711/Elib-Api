import express from "express";
import createBook from "./bookController.js";
import multer from "multer";
import path, { dirname } from "path";
import url from "url";
const bookRouter = express.Router();

const __fileName = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 }, //30mb
});

// we use upload.fields as we need to send multiple files to the server that is cover image and book pdf
bookRouter.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

export default bookRouter;
