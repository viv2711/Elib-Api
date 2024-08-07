import { v2 as cloudinary } from "cloudinary";
import { config } from "./config.js";

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.clodinary_api_key,
  api_secret: config.cloudinary_secret,
});
export default cloudinary;
