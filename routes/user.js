import  Express  from "express";
import { update , deleteUser, getUser, subcribe, unsubscribe, like, dislike} from "../controller/user.js";
import { verifyToken } from "../verifyToken.js";


const userRouter = Express.Router()

// 
userRouter.put("/update/:id", verifyToken, update)
userRouter.delete("/delete/:id", verifyToken, deleteUser)
userRouter.get("/find/:id",getUser)
userRouter.put("/sub/:id",verifyToken,subcribe)
//unsubscribe a user
userRouter.put("/unsub/:id", verifyToken, unsubscribe);

// like a video
userRouter.put("/like/:videoId", verifyToken, like);

//dislike a video
userRouter.put("/dislike/:videoId", verifyToken, dislike);

export default userRouter
