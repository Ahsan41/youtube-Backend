import  Express, { Router }  from "express";
// import { } from "../controller/auth.js"
import { verifyToken } from "../verifyToken.js";
import { addVideo, addView, getByTag, getVideo, random, search, sub, trend } from "../controller/video.js";





const videoRouter = Express.Router()

videoRouter.post("/",verifyToken,addVideo)
videoRouter.put("/:id",verifyToken,addVideo)
videoRouter.delete("/:id",verifyToken,addVideo)
videoRouter.get("/find/:id",getVideo)
videoRouter.put("/view/:id",addView)
videoRouter.get("/trend",trend)
videoRouter.get("/random", random)
videoRouter.get("/sub",verifyToken,sub)
videoRouter.get("/tags" , getByTag)
videoRouter.get("/search" , search)



export default videoRouter