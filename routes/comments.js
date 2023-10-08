import  Express, { Router }  from "express";
import { addComment, deleteComment, getComment } from "../controller/comments.js"
import { verifyToken } from "../verifyToken.js";



const commentRouter = Express.Router()

commentRouter.post("/", verifyToken , addComment)
commentRouter.post("/:id", verifyToken , deleteComment)
commentRouter.get("/:videoId", verifyToken , getComment)


export default commentRouter