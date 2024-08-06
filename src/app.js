/* eslint-disable no-unused-vars */
import createHttpError from 'http-errors';
import express from 'express'
import globalErrorHandler from './middlewares/globalHandler.js';
import userRouter from './user/userRouter.js';
const app = express();

// In built middleware for json parsing
app.use(express.json());


// Routes
app.get('/', (req, res, next) => {
    res.json({msg : 'Welcome to the elib apis'});
})

app.use('/api/users', userRouter);


// Global Error Handler - it is a special type of middleware where we have four params
app.use(globalErrorHandler);
export default app