import  Express, { Router }  from "express";
import { googleAuth, signin, signup  } from "../controller/auth.js";



const authRouter = Express.Router()


authRouter.post("/signup", signup)
authRouter.post("/signin",signin)
authRouter.post("/google",googleAuth)



export default authRouter