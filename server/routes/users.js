import express from "express"
import { deleteuser, updateUser, singleUser, allUsers } from "../controllers/users_controllers.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utlis/verifyToken.js";

const router = express.Router();

// router.get("/check", verifyToken,(req,res,next)=>{
//     res.send("hela re Bhai")
// })

// router.get("/checkuser/:id", verifyUser,(req,res,next)=>{
//     res.send("R u ready to delete ")
// })



// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("R u a Admin ")
// })

router.put('/:id', verifyUser, updateUser)
router.delete('/:id',verifyUser, deleteuser)
router.get('/:id', verifyUser,singleUser)
router.get('/', verifyAdmin,allUsers)




export default router;
