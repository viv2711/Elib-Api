/* eslint-disable no-unused-vars */
import express from 'express'

const app = express();

// Routes
app.get('/', (req, res, next) => {
    res.json({msg : 'Welcome to the elib apis'});
})
export default app