import express from "express";
import {
  createBook,
  updateBook,
  listBook,
  getBook,
  deleteBook,
} from "./bookController.js";
import multer from "multer";
import path, { dirname } from "path";
import url from "url";
import authenticate from "../middlewares/authenticate.js";
const bookRouter = express.Router();

const __fileName = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const upload = multer({
  dest: path.join(__dirname, "../../public/data/uploads"),
  limits: 1e7,
});

// we use upload.fields as we need to send multiple files to the server that is cover image and book pdf
bookRouter.post(
  "/",
  authenticate,
  upload.fields([{ name: "file", maxCount: 1 }]),
  createBook
);

bookRouter.patch(
  "/:bookid",
  authenticate,
  upload.fields([{ name: "file", maxCount: 1 }]),
  updateBook
);

bookRouter.get("/", listBook);

bookRouter.get("/:bookid", getBook);

bookRouter.delete("/:bookid", authenticate, deleteBook);

export default bookRouter;
