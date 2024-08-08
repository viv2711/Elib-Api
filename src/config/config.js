import dotenv from "dotenv";
import process from "process";

dotenv.config();

const _config = {
  port: process.env.PORT,
  mongodbString: process.env.MONGO_CONNECTION_STRING,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWTSecret,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD,
  clodinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret: process.env.CLOUDINARY_SECRET,
  frontend_domain: process.env.FRONTEND_DOMAIN,
};
// Freeze the configuration object to prevent explicit modifications
export const config = Object.freeze(_config);
//Object.freeze is used to freeze the object or make it read only object so that no can change it
