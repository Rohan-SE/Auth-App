import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authJWT = (req,res,next)=>{
    const token = req.cookies.token;
    if(token){
        jwt.verify(token,process.env.SECRET,(err,user)=>{
            if(err) return res.status(403).json({message:"Something went wrong"})
            req.user = user;
            next()
        })
    }else{
        res.redirect('/login')
    }
}
const checkUserIsLogged = (req,res,next)=>{
    const token = req.cookies.token
    if(token){
        jwt.verify(token,process.env.SECRET,(err,user)=>{
            if(err) return next()
            return res.redirect('/home');
        })
    }else{
        next()
    }
}

const auth = {authJWT,checkUserIsLogged}
export default auth