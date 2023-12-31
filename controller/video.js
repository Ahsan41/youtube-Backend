import { createError } from "../error.js";
import user from "../models/user.js";
import video from "../models/video.js";
import Video from "../models/video.js";


export const addVideo = async (req,res,next)=>{
    const newVideo = new Video({userId:req.user.id,...req.body});
    try {
        const savedVideo = await newVideo.save()
        res.json(savedVideo).status(200)
    } catch (error) {
        next(error)
    }
}

export const updateVideo = async (req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404,"video not found"))
        if(req.user.id === video.userId){
            const updatedvideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body,
                },
                {new:true}
            );
            res.status(200).json(updatedvideo)
        }else{
            return next(createError(403,"you can updated only your video"))
        }
     } catch (error) {
        next(error)
    }
}

export const deleteVideo = async (req, res, next)=>{
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404,"video not found"))
        if(req.user.id === video.userId){
           await Video.findByIdAndDelete(
                req.params.id,
            );
            res.status(200).json("the video has been deleted")
        }else{
            return next(createError(403,"you can delete only your video"))
        }
     } catch (error) {
        next(error)
    }
}

export const getVideo = async (req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}

export const addView = async (req,res,next)=>{
    try {
        const video = await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        res.status(200).json("the view has been increase")
    } catch (error) {
        next(error)
    }
}

export const random = async (req,res,next)=>{
    try {
        const videos = await Video.aggregate([{$sample: {size:40}}])
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const trend = async (req,res,next)=>{
    try {
        const videos = await Video.find().sort({views:-1})
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

// export const sub = async (req,res,next)=>{
//     try {
//     const User = await user.findById(req.user.id)
//     const subcribedChannels = user.subcribedUsers;

//     const list =await Promise.all(
//         subcribedChannels.map(channelId=>{
//             return Video.find({userId:channelId})
//         })
//     )
//     res.status(200).json(list)
        
//     } catch (error) {
//         next(error)
//     }
// }

// export const sub = async (req, res, next) => {
//     try {
//       const User = await user.findById(req.user.id);
//       const subscribedChannels = user.subscribedUsers;
  
//       const list = await Promise.all(
//         subscribedChannels.map(async (channelId) => {
//           return await Video.find({ userId: channelId });
//         })
//       );
  
//       res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
//     } catch (err) {
//       next(err);
//     }
//   };

export const sub = async (req, res) => {
    try {
        const User = await user.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map(async (channelId) => {
                return await Video.find({ userId: channelId });
            })
        );
        res.status(200).send({
            status: "Success",
            message: "All subscribed videos",
            data: list.flat().sort((a, b) => b.createdAt - a.createdAt)
        });
    } catch (error) {
        res.status(500).send({
            status: "Fail",
            message: error.message
        })
    }
}

  export const getByTag = async (req,res,next)=>{
      const tags = req.query.tags.split(",");
      console.log(tags);
    try {
        const videos = await video.find({tags:{$in:tags }}).limit(20)
        res.status(200).json(videos)
    } catch (error) {
         next(error)
    }
  }


export const search = async (req,res,next)=>{
    const query = req.query.q
    try {
        const videos = await video.find({tittle :{ $regex:query, $options:"i" }}).limit(40)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }   
}
