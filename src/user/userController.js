/* eslint-disable no-unused-vars */

import createHttpError from "http-errors";
// Request Processing for userRouters - userController
export const createUser = async (req, res, next) => {
    const {name, email, password} = req.body;
    // Validation
    if(!name || !email || !password){
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }
    return res.json({msg: "User Created Successfully"})
};

;
