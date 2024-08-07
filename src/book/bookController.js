import path, { dirname } from "path";
import cloudinary from "../config/cloudinary.js";
import url from "url";
import createHttpError from "http-errors";
/* eslint-disable no-unused-vars */
const createBook = async (req, res, next) => {
  // console.log("files", req.body, req.files);

  //getting __fileName __dirName
  const __fileName = url.fileURLToPath(import.meta.url);
  const __dirname = dirname(__fileName);

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
  res.json({ msg: "Book Created Successfully" });

  // Uploading to Cloudinary Cloud from local path where image resides
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      filename_override: fileName,
      folder: "book-pdfs",
      format: "pdf",
    });
    console.log("UploadResult", uploadResult);
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "Error while uploading on Cloudinary"));
  }
};

export default createBook;

// To send data like pdf, image etc in the body, we use multipart form-data
/* Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency. */
// we use external library multer for this purpose
