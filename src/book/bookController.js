/* eslint-disable no-unused-vars */
const createBook = async (req, res, next) => {
  console.log("files", req.file);
  res.json({ msg: "Book Created Successfully" });
};

export default createBook;

// To send data like pdf, image etc in the body, we use multipart form-data
/* Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency. */
// we use external library multer for this purpose
