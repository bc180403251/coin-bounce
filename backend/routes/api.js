const express= require('express')
const authController=require('../controllers/authController')
const router=express.Router();

// user login
router.post('/login', authController.login);
// user signup
router.post('/register', authController.register);
// refresh
// logout
// blog cruds

//comments cruds

router.get('/test', (req, res)=> res.json({msg:'Working1!!'}))



module.exports= router