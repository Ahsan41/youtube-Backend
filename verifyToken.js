import  Jwt  from "jsonwebtoken";
import { createError } from "./error.js";

// export const verifyToken = (req,res,next) =>{
//     const token = req.cookies.access_token
//     console.log(req.cookies.access_token)

//     if(!token) return res.send(createError(401,"you are not authenticated! "))

//     Jwt.verify(token, "qwertyuiop", (err,user)=>{
//         if(err) return res.send(createError(403,"token is not valid! "))
//         req.user = user
//         next()
//     })
// }



export const verifyToken = (req, res, next) => {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1]
    // console.log(token);
      if (!token) return res.send(createError(401, "You are not authenticated!"));

      Jwt.verify(token, "qwertyuiop", (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next()
      });
};
