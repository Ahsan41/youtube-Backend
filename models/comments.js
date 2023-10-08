import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true,
    },
    videoId:{
        type:String,
        require:true,

    }, 
     desc:{
        type:String,
        require:true,
    },
},

 { timestamps:true},
 
);

export default mongoose.model('comments', commentSchema);