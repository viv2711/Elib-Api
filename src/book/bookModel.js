import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      // this ObjectId is user id in our Users collection
      // we use it to connect both our user and book collection in db
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

export default mongoose.model("Book", bookSchema);
