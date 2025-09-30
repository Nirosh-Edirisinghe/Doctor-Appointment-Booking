import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../model/userModel.js'

// api to register user

const registerUser = async (req, res) => {
  try {
    const {name, email, password} = req.body

    if(!name || !email || !password){
      return res.json({success:false, message:'Misssing Details'})
    }

    if(!validator.isEmail(email)){
      return res.json({success:false, message:'enter a valid email'})
    }

    if(password.length < 8){
      return res.json({success:false, message:'enter a strong password'})
    }

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const userData  = {
      name,
      email,
      password : hashedPassword
    }

    const newUser = new userModel(userData)
    const user = await  newUser.save()

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.json({success:true,token})

  } catch (error) {
    console.log(error);
    return({success:false,message:error.message})
  }
}

export {registerUser}