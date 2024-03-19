import mongoose from "mongoose";
import hotelModel from "../models/hotels_models.js";
import roomModel from "../models/rooms_models.js"

//create Hotels
export async function createHotels(req, res) {
    try {
        // let { name, type, city, address, distance, title, desc, cheapestPrice } = req.body;
        const savedHotels = {
            ...req.body
        }
        await hotelModel.create(savedHotels)
        res.status(200).json(savedHotels)
    }
    catch (error) {
        // throw error;
        res.status(500).json(error)
    }
}

//Update HOtels
export async function updateHotels(req, res) {
    try {
        // let { name, type, city, address, distance, title, desc, cheapestPrice } = req.body;
        const updateHotelData = await hotelModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })


        res.status(200).json(updateHotelData)
    }
    catch (error) {
        // throw error;
        res.status(500).json(error)
    }
}

//Delete Hotels
export async function deleteHotels(req, res) {
    try {
        const deleteHotelData = await hotelModel.findByIdAndDelete(req.params.id)
       res.status(200).json(deleteHotelData)
    }
    catch (error) {
        // throw error;
        res.status(500).json(error)
    }
}


//get
export async function singleHotel(req, res) {
    try {
        const singleHotelData = await hotelModel.findById(req.params.id)
        res.status(200).json(singleHotelData)
    }
    catch (error) {
        // throw error;
        res.status(500).json(error)
    }
}

//get all
export async function allHotels(req, res) {
    try {
        const allHotelsData = await hotelModel.find()
        res.status(200).json(allHotelsData)
    }
    catch (error) {
        // throw error;
        res.status(500).json(error)
    }
}

export async function featuredHotels(req, res,next) {
    try {
        const{min,max, ...others} = req.query
        const allFeaturedHotelsData = await hotelModel.find({...others,cheapestPrice:{$gt:min | 1 , $lt:max || 1909},}).limit(4)
      //  const allFeaturedHotelsData = await hotelModel.find(req.query).limit(2)

        res.status(200).json(allFeaturedHotelsData)
    }
    catch (error) {
        // throw error;
         res.status(500).json(error)
        // next(error)
    }
}



export async function countByCity(req, res) {
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city=>{
            // return hotelModel.find({city:city}).length
            return hotelModel.countDocuments({city:city})

        }))
        res.status(200).json(list)
    }
    catch (error) {
        // throw error;
        res.status(500).json(error)
    }
}

export async function countByType(req, res,next) {
    try {
        const hotelCount = await hotelModel.countDocuments({type:"hotel"})
        const apartmentCount = await hotelModel.countDocuments({type:"apartment"})
        const resortCount = await hotelModel.countDocuments({type:"resort"})
        const vilaCount = await hotelModel.countDocuments({type:"vila"})
        const cabinsCount = await hotelModel.countDocuments({type:"cabins"})
        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"apartment",count:apartmentCount},
            {type:"resort",count:resortCount},
            {type:"vila",count:vilaCount},
            {type:"cabins",count:cabinsCount}
        ])
        }
      
    catch (error) {
        // throw error;
      next(error)
      console.log(error)
    }
}

export async function getHotelRooms(req, res,next) {
    try {
        const hotel = await hotelModel.findById(req.params.id)
        const list = await  Promise.all(hotel.rooms.map((room)=>{
            return roomModel.findById(room)
        }))
        res.status(200).json(list)
    }
    catch (error) {
        // throw error;
       next(error)
    }
}
