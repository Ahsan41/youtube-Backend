import { createError } from "../error.js"
import comments from "../models/comments.js"
import video from "../models/video.js"
export const addComment =async (req,res,next)=>{
    const newComment = new comments({...req.body,userId:req.user.id})
   try {
    const savedComment = await newComment.save()
    res.status(200).send(savedComment) 
   } catch (error) {
    next(error)
   }
}


export const deleteComment = async (req,res,next)=>{
    try {
        const Comment = await comments.findById(req.params.id)
        const videos = await video.findById(req.params.id)
        if(req.user.id === Comment.userId || req.user.id === videos.userId){

            await comments.findByIdAndDelete(req.params.id)
            res.status(200).json("the comment has been deleted. ")
        }else{
            return res.send(createError(403,"you can delete only your comment"))
        }
    
    } catch (error) {
     next(error)
    }
}


export const getComment =async (req,res,next)=>{
    console.log("chl gya");
    try {
     const comment = await comments.find({videoId:req.params.videoId})
     res.send(comment).status(200)
    } catch (error) {
     next(error)
    }
 }