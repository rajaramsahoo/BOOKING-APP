import mongoose from "mongoose";
import { createError } from "../utlis/error.js";
import roomModel from "../models/rooms_models.js";
import hotelModel from "../models/hotels_models.js";


export async function createRoom(req, res, next) {
    const hotelId = req.params.hotelid;
    try {
        const savedRoomsData = {
            ...req.body
        }
        let savedRooms = await roomModel.create(savedRoomsData)
        try {
            await hotelModel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRooms._id }
            })
        }
        catch (error) {
            next(error)
        }
        res.status(200).json(savedRooms)
    }
    catch (error) {
        next(error)
    }
}


//update Rooms
export async function updateRooms(req, res, next) {
    try {
        const updateRoomData = await roomModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })


        res.status(200).json(updateRoomData)
    }
    catch (error) {
        next(error)
    }
}

//Delete Hotels
export async function deleteRooms(req, res,next) {
    const hotelId = req.params.hotelid;
    try {
        await roomModel.findByIdAndDelete(req.params.id);
        try {
            await hotelModel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Room has been deleted.");
    } catch (error) {
        next(error);
    }
}


//get
export async function singleRoom(req, res,next) {
    try {
        const singleRoomData = await roomModel.findById(req.params.id)
        res.status(200).json(singleRoomData)
    }
    catch (error) {
        next(error)
    }
}

//get all
export async function allRooms(req, res,next) {
    try {
        const allRoomsData = await roomModel.find()
        res.status(200).json(allRoomsData)
    }
    catch (error) {
        next(error)
    }
}


////
export async function updateRoomsAvailability(req, res, next) {
    try {
         await roomModel.updateOne({"roomNumbers._id":req.params.id},{
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
              },
         })


        res.status(200).json({msg:"Room status has been updated"})
    }
    catch (error) {
        next(error)
    }
}

