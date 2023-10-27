import  Express  from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
// import cookieParser from "cookieparser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors"
import userRouter from "./routes/user.js";
import videoRouter from "./routes/video.js";
import commentRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";




// dotenv.config();


const port = 4000;
const app = Express()

  
const url = "mongodb+srv://ahsanazeem706:JAh6qr2S310oQkFU@cluster0.ntbrqio.mongodb.net/"

const connect = () => {
    mongoose
        .connect(url)
        .then(() => {
            console.log(`connected to DB`);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
}; 

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message,
    })
})

app.use(Express.json())
app.use(cors());

    
app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/video", videoRouter)
app.use("/comment", commentRouter)



app.use(Express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cookieParser())


app.listen(port,()=>{
    connect();
    console.log("Backend server");
});