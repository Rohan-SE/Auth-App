import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const url = process.env.DB_HOST
mongoose.set('strictQuery',true)

const dbconn = async()=>{
    try {
       const conn = await mongoose.connect(url,{ useNewUrlParser: true,
           useUnifiedTopology: true,
       })
       console.log(`MongoDB connected`)
    } catch (error) {
       console.log(error)
       process.exit(1)
    }
}

export default dbconn