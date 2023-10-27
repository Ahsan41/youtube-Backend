import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true,
    },
    tittle:{
        type:String,
        required:true,
    },
    desc: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default:0,
    },
    tags:{
        type:[],
        default:[]
    },
    like:{
        type:[String],
        default:[]
    },dislike:{
        type:[String],
        default:[]
    },
},
 { timestamps:true},
);

export default mongoose.model('Video', videoSchema);