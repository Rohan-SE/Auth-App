import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
    },
    password:String,
    age:String,
    gender:String
})

const user = mongoose.model('User',userSchema,'Users')

export default user