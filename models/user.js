import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        max:30,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        min:6,
        max:12,
    },
    subcriber:{
        type:Number,
        default:0
    },
    subscribeUsers:{
        type:[String],
    },
    fromGoogle:{
        type:Boolean,
        default:false,
    }
   
},
 { timestamps:true},
);
export default mongoose.model('Users', userSchema);