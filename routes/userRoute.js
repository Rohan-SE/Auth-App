import express from 'express'
import userController from '../controller/userController.js'
import auth from '../middlewares/isAuth.js'
const router = express.Router()

router.get('/signup',auth.checkUserIsLogged,userController.userRegPage)
router.post('/signupPost',userController.userReg)
router.get('/home',auth.authJWT,userController.welcomePage)
router.get('/login',auth.checkUserIsLogged,userController.userLogPage)
router.post('/loginPost',userController.userLog)
router.get('/logout',auth.authJWT,userController.logout)

export default router