import express from "express"
import { createHotels,updateHotels ,deleteHotels,singleHotel,allHotels,countByCity,getHotelRooms,countByType,featuredHotels}
 from "../controllers/hotels_controllers.js";
import { verifyAdmin } from "../utlis/verifyToken.js";


const router = express.Router();

router.post('/',verifyAdmin, createHotels)
router.put('/:id',verifyAdmin ,updateHotels)
// router.put('/:id' ,updateHotels)

router.delete('/find/:id', verifyAdmin ,deleteHotels)
//i was use /find bcz when i want to get data from /countByCity the express Server assume that //countByCity w2as also a id
router.get('/find/:id',singleHotel)
router.get('/',allHotels)
router.get('/find/hotel/featuredHotels',featuredHotels)

router.get('/countByCity',countByCity)
router.get('/countByType',countByType)
router.get('/room/:id',getHotelRooms)


export default router;
