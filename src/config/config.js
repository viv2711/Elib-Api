import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const _config = {
    port: process.env.PORT,
    mongodbString: process.env.MONGO_CONNECTION_STRING,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWTSecret
};
// Freeze the configuration object to prevent modifications
export const config = Object.freeze(_config);
//Object.freeze is used to freeze the object or make it read only object so that no can change it 
