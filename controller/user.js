import { createError } from "../error.js"
import User from "../models/user.js"
import video from "../models/video.js";

// export const update =async (req,res,next)=>{
//     if(req.params.id === req.user.id){
//         try {
//             const updateUser = await user.findByIdAndUpdate(req.params.id,{
//                 $set:res.body
//             })
//             res.status(200).json(updateUser)
//         } catch (error) {

//         }
//     }else{
//         return next(createError(403,"you can update only your account!"))
//     }
// }

export const update = async (req, res, next) => {
  console.log(req.params.id);
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

export const deleteUser = async (req,res,next)=>{
  console.log(req.params.id);
  if (req.params.id === req.user.id) {
    try {
    await User.findByIdAndDelete(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json("user has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
}

export const getUser = async (req,res,)=>{
 try {
 const user = await User.findById(req.params.id)
  res.status(200).json(user)
 } catch (error) {
  res.send(error)
 }
}

export const subcribe = async (req,res,next)=>{
  try {
   await User.findByIdAndUpdate(req.user.id,{
    $push:{subscribedUsers:req.params.id}
   })
   await User.findByIdAndUpdate(req.params.id ,{
    $inc:{subscribers:1}
   })
   res.status(200).json("subrcription successfull")
  } catch (error) {
  res.send(error)
 }
}

export const unsubscribe = async (req,res,next)=>{
   try {
    await User.findByIdAndUpdate(req.params.id,{
      $pull:{subscribedUsers:req.params.id}
    })
    await User.findByIdAndUpdate(req.params.id ,{
      $inc:{subscribers:-1}
     })
   } catch (error) {
    res.send(error)
   }

}


export const like = async(req,res,next)=>{
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await video.findByIdAndUpdate(videoId,{
      $addToSet:{like:id},
      $pull:{dislike:id}
    })
  } catch (error) {
   next(error) 
  }
}


export const dislike = async(req,res,next)=>{
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await video.findByIdAndUpdate(videoId,{
      $addToSet:{dislike:id},
      $pull:{like:id}
    })
  } catch (error) {
   next(error) 
  }
}