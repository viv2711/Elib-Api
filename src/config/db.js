import mongoose from "mongoose";
import { config } from "./config.js";
import process from "process";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB successfully");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Something went wrong while connecting to DB", err);
    });
    await mongoose.connect(config.mongodbString);
  } catch (err) {
    console.error("Failed to connect to database", err);
    process.exit(1);
  }
};
export default connectDB;
