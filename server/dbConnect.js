import mongoose from "mongoose";
import 'dotenv/config'


async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB CONNECTED SUCESSFULLY")
    }
    catch (error) {
        throw error
    }
}


mongoose.connection.on("disconnected",()=>{
    console.log("MONGODB DISCONNECTED")
})

mongoose.connection.on("connected",()=>{
    
    console.log("MONGODB CONNECTED")
})


 dbConnect()