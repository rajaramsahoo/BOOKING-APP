import express from "express"
import { createRoom, updateRooms, deleteRooms, singleRoom, allRooms,updateRoomsAvailability } from "../controllers/rooms_controllers.js";
import { verifyAdmin } from "../utlis/verifyToken.js";
const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);
router.put('/:id', verifyAdmin, updateRooms)
router.put('/availability/:id', updateRoomsAvailability)

router.delete('/:id/:hotelid', verifyAdmin, deleteRooms)
router.get('/:id', singleRoom)
router.get('/', allRooms)

export default router;
