import mongoose from "mongoose";
import userModel from "../models/users_models.js"




//Update user
export async function updateUser(req, res) {
    try {
        const updateUserData = await userModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })


        res.status(200).json(updateUserData)
    }
    catch (error) {
        // throw error;
        res.status(500).json(error)
    }
}

//Delete User
export async function deleteuser(req, res) {
    try {
        const deleteUserData = await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteUserData)
    }
    catch (error) {
        // throw error;
        res.status(500).json(error)
    }
}


//get a single User
export async function singleUser(req, res) {
    try {
        const singleUserData = await userModel.findById(req.params.id)
        res.status(200).json(singleUserData)
    }
    catch (error) {
        // throw error;
        res.status(500).json(error)
    }
}

//get all User
export async function allUsers(req, res) {
    try {
        const allUsersData = await userModel.find()
        res.status(200).json(allUsersData)
    }
    catch (error) {
        // throw error;
        res.status(500).json(error)
    }
}
