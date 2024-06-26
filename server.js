import express from 'express'
import cors from 'cors'
import dbconn from './config/dbconfig.js';
import router from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash'
import session from 'express-session';
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.set('view engine', 'ejs');
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

app.use(flash())
app.use(router)
const port = 7000
dbconn().then(()=>{app.listen(port,()=>{
   
})})