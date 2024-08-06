/* eslint-disable no-unused-vars */
import createHttpError from 'http-errors';
import { config } from './config/config.js';
import express, {request, response} from 'express'
import globalErrorHandler from './middlewares/globalHandler.js';
const app = express();

// Routes
app.get('/', (req, res, next) => {
    res.json({msg : 'Welcome to the elib apis'});
})


// Global Error Handler - it is a special type of middleware where we have four params
app.use(globalErrorHandler);
export default app