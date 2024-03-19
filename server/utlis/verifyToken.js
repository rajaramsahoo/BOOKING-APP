import 'dotenv/config'
import jwt from 'jsonwebtoken';
import { createError } from './error.js';


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log(req.cookies)
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT_privateKey, (error, user) => {
        if (error) return next(createError(403, "Token is not valid!"));
        req.user = user;
        // console.log(req.user.id)

        next();
    });
}

export const verifyUser = (req, res, next) => {
    // console.log(req.user.id)
    verifyToken(req, res,next, () => {
        if (req.user.id === req.params.id) {
            next()
            console.log(req.user.id)
        }
        else {
            return next(createError(403, "You are not authorized! user"));
        }
    })
}


export const verifyAdmin = (req,res,next) =>{
    // console.log(req.user.id)
    verifyToken(req, res,next,()=>{
        if(req.user.isAdmin ){
            next()
            console.log(req.user.isAdmin)
        }
        else{
            return next(createError(403, "You are not Admin"));
        }
    })
}





