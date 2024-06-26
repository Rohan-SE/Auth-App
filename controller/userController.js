import user from "../models/userSchema.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userReg = async(req,res)=>{
    try {
        const {name,email,password,age,gender} =req.body
        if(!name,!password,!email,!age,!gender){
            req.flash('error',"Please fill all the fields")
            res.redirect('/signup')
        }else{
            const User = await user.findOne({email})
            if(User){
            req.flash('error',"Already registered")
            res.redirect('/signup')
            }
            else{
                const hashPass = await bcrypt.hash(password,10)
            const userObj = new user({
                name,
                email,
                age,
                gender,
                password:hashPass
            })
            await userObj.save()
            const token = jwt.sign({email},process.env.SECRET,{
                expiresIn: '30m'
            })
            res.cookie('token',token,{
                httpOnly:true,
                secure:true,
            })
            res.redirect('/home')
            }
        }
       
    } catch (error) {
        console.log(error)
    }
}

const userRegPage = (req,res)=>{
        res.render('../views/welcome',{error:req.flash('error')})

    
}

const userLogPage = (req,res)=>{
            res.render('login',{error:req.flash('error')})
}

const userLog = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(!email,!password){
            req.flash('error',"Please fill all the fields")
            res.redirect('/login')
        }else{
            const User = await user.findOne({email})
        if(!User){
            req.flash('error',"Something went wrong")
            res.redirect('/login')
        }else{
            bcrypt.compare(password,User.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({email:User.email},process.env.SECRET,{
                        expiresIn: '30m'
                    })
                    res.cookie('token',token,{
                        httpOnly:true,
                        secure:true,
                    })
                    res.redirect('/home')
                }else{
                   req.flash('error',"Email or Password is incorrect")
                   return res.redirect('/login')
                }
            })
        }
       
        }
        
    } catch (error) {
        console.log(error)
    }
}

const welcomePage = async(req,res)=>{
    let userFind = await user.findOne({email:req.user.email})
    if(!userFind) return res.sendStatus(500)
    res.render('../views/welcome',{user:userFind})
}

const logout = (req,res)=>{
    let token = ""
    res.cookie("token",token)
    res.redirect('/login')
}

const userController = {userReg,userRegPage,welcomePage,userLogPage,logout,userLog}

export default userController