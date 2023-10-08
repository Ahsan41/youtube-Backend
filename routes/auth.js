import  Express, { Router }  from "express";
import { signin, signup  } from "../controller/auth.js";



const authRouter = Express.Router()


authRouter.post("/signup", signup)
authRouter.post("/signin",signin)



export default authRouter