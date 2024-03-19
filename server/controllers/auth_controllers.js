import userModel from "../models/users_models.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import cookieParser from "cookie-parser"

export const register = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const userData = {
            ...req.body,
            password: hash
        }
        await userModel.create(userData)
        res.status(200).json({ msg: "user Created successfully" })
    }
    catch (error) {
       // res.status(500).json({ error: "You Cant REGISTER" })
      next(error)
    }
}

export const login = async (req, res) => {
    try {
        console.log("raja")
        const user = await userModel.findOne({ userName : req.body.userName })
        if (!user) {
            return res.status(404).json({ error: `${req.body.userName} not found ` })
        }
        console.log("raja1")
        console.log(user)

        let isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).json({ error: "Invalid password" })
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_privateKey)

        const { password, isAdmin, ...otherDetails } = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({ details: { ...otherDetails }, isAdmin })
    }
    catch (error) {
        res.status(500).json({ error: "something wrong in log in" })
        console.log(error)
    }
}