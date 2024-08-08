import path, { dirname } from "path";
import cloudinary from "../config/cloudinary.js";
import url from "url";
import fs from "fs";
import createHttpError from "http-errors";
import bookModel from "./bookModel.js";
/* eslint-disable no-unused-vars */
const __fileName = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const createBook = async (req, res, next) => {
  // console.log("files", req.body, req.files);
  const { title, genre } = req.body;
  //getting __fileName __dirName

  // getting the coverImage type i.e "jpg"
  // const fileType = req.files.file[0].mimetype.split("/").at(-1);

  //getting the filename of bookpdf
  const fileName = req.files.file[0].filename;
  //getting the filePath where pdf is located locally
  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    fileName
  );

  // Uploading to Cloudinary Cloud from local path where image resides
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      filename_override: fileName,
      folder: "book-pdfs",
      format: "pdf",
    });
    console.log("UploadResult", uploadResult);
    console.log("userId", req.userId);
    const newBook = await bookModel.create({
      title,
      genre,
      author: req.userId,
      file: uploadResult.secure_url,
    });

    // Delete temporary files after upload
    try {
      await fs.promises.unlink(filePath);
    } catch (err) {
      console.log(err);
      return next(
        createHttpError(500, "Error in deleting the temporary files")
      );
    }
    res.status(201).json({ id: newBook._id });
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "Error while uploading on Cloudinary"));
  }
};
const updateBook = async (req, res, next) => {
  const { title, genre } = req.body;

  const bookId = req.params.bookid;

  const book = await bookModel.findOne({ _id: bookId });

  if (!book) {
    return next(createHttpError(404, "Book not found"));
  }

  // Accesss Check
  if (book.author.toString() !== req.userId) {
    return next(createHttpError(403, "Unauthorized"));
  }

  let completeFileName = "";
  let filePath;
  if (req.files.file) {
    filePath = path.resolve(
      __dirname,
      "../../public/data/uploads/",
      req.files.file[0].filename
    );
  }

  const fileName = req.files.file[0].filename;
  completeFileName = fileName;

  const uploadResultPdf = await cloudinary.uploader.upload(filePath, {
    resource_type: "raw",
    filename_override: completeFileName,
    folder: "book-pdfs",
    format: "pdf",
  });

  completeFileName = uploadResultPdf.secure_url;
  await fs.promises.unlink(filePath);

  const updateBook = await bookModel.findOneAndUpdate(
    {
      _id: bookId,
    },
    {
      title,
      genre,
      file: completeFileName ? completeFileName : book.file,
    },
    { new: true }
  );
  res.status(201).json(bookId);
  console.log("Updated Book: ", updateBook);
};
const listBook = async (req, res, next) => {
  try {
    // todo add pagination
    const book = await bookModel.find();
    res.json({ book });
  } catch (err) {
    return next(createHttpError(500, "Error while getting a book"));
  }
};
const getBook = async (req, res, next) => {
  try {
    const book = await bookModel.findOne({ _id: req.params.bookid });
    if (!book) {
      return next(createHttpError(404, "Book not found"));
    }
    res.json({ book });
  } catch (err) {
    return next(createHttpError(500, err));
  }
};
export { createBook, updateBook, listBook, getBook };
// To send data like pdf, image etc in the body, we use multipart form-data
/* Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency. */
// we use external library multer for this purpose
