import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt  from "bcrypt"
import { createError } from "../error.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


export const signup =async (req,res,next)=>{
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);  
    const newUser = new User({...req.body,password:hash})

    await newUser.save();
   await res.status(200).json("user has been created" );

  } catch (err) {
    res.send(createError(404, err.message))
  }
}

// export const signin =async (req,res)=>{
//   try {
//     const user = await Users.findOne({email:req.body.name})
//     if(!user) return res.send(createError(404,"user not found"))
//    const isCorrect = await bcrypt.compare(req.body.password , user.password)
  
//    if(!isCorrect) return res.send(createError(400 , "wrong credentials"))
//    const token = jwt.sign({id:user._id}, process.env.jwt )
//   const{password, ...others} = user._doc;
//    res.cookie("access_token", token,{
//     httpOnly:true,
//    }).status(200)
//    .json(others)
   
//   } catch (err) {
//     res.send(err)
//   }
// }

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.name });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: user._id }, "qwertyuiop");
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({...others,token});
  } catch (err) {
    next(err);
  }
};