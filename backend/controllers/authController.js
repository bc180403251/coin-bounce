   const Joi=require('joi');
   const User= require('../modals/user');
   const bcrypt= require('bcrypt')
//    const userDto= require('../dto/userDto');
const UserDto = require('../dto/userDto');

   const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
   
   
   const authController={
        // user registration function 
        async register(req, res, next){
            // 1. validate the user inputs

            const userRegisterSchema=Joi.object({
                username:Joi.string().min(5).max(30).required(),
                name: Joi.string().max(30).required(),
                email: Joi.string().email().required(),
                password:Joi.string().pattern(passwordPattern).required(),
                // confirmPassword:Joi.string().ref('password')
            })

            const{error}= userRegisterSchema.validate(req.body);

            // 2. if error in validation -> return vie middleware

            if(error){
                return next(error);
            }

            // 3. if email and user is already registered -> return an error
            // console.log(req.body)
            const {email, username, name, password}=req.body

            try {

                const emainInUse= await User.findOne({email})

                const usernameInUse= await User.findOne({username})

                if(emainInUse){
                    const error={
                        status:409,
                        message:'Email is Already Registered, Use Another Email'
                    }

                    return next(error)
                }

                if(usernameInUse){
                    const error={
                        status:409,
                        message:'Username is not available, use another username'

                    }
                    return next(error)
                }


                
            } catch (error) {

                return next(error)
                
            }

            // create an hashpassword
            const hashpassword= await bcrypt.hash(password, 10 );

            // store the user in database 
            const usertoRegister=new User({
                email,
                username,
                name,
                password: hashpassword
            })

           const user= await usertoRegister.save();

           const userDto= new UserDto(user)

            // response send 

            return res.status(201).json({
                userDto
            })

        },


        // user login function
        async login(req, res, next){

            const userSchema=Joi.object({
                username: Joi.string().min(5).max(30),
                email: Joi.string().email(),
                password:Joi.string().pattern(passwordPattern)
            }).xor('username', 'email')

            const {error, value}=userSchema.validate(req.body)

            if(error){
                return next(error)
            }

            const {email, username, password}= req.body;
            try {

                let query= {}

                if(value.username){
                    query.username= value.username;
                } else if( value.email){
                    query.email= value.email

                }

                const user =  await User.findOne(query);

                if(!user){
                    const error={
                        status: 404,
                        message:'Invalid Username/email'
                    }

                   return next(error)
                }
                if(user){
                    const match= bcrypt.compareSync(password, user.password)

                    if(!match){
                        const error={
                            status:401,
                            message:'Incurrect Password/ Invalid Password'
                        }

                        return next(error)
                    }

                    const userDto= new UserDto(user)

                    return res.status(200).json({
                        message: 'login succesfully!',
                        user: userDto
                    })

                }
            } catch (error) {

                return next(error)
                
            }

        }
    }

    module.exports= authController;