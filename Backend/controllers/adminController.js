import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../model/doctorsModel.js'
import jwt  from 'jsonwebtoken'

// Api for adding doctors

const addDoctors = async (req,res) => {
  try {
    const{name, email, password, image, speciality, degree, experience, about, fees, address } = req.body
    const imageFile = req.file

    if(!name || !email || !password || !image || !speciality || !degree || !experience || !about || !fees || !address){
      return res.json({success:false, message:'Missing Details'})
    }

    if(!validator.isEmail(email)){
      return res.json({success:false, message:'Please enter a valid email'})
    }

    if(password.length < 8){
     return res.json({success:false, message:'Please  enter a strong password'})
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
    const imageUrl = imageUpload.secure_url

    const doctorData = {
      name,
      email,
      password:hashedPassword,
      image:imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address:JSON.parse(address),
      date:Date.now()
    }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

    return({success:true,message:'Doctor added'})
    
  } catch (error) {
    console.log(error);
    return({success:false,message:error.message})
  }
}


// Api fro admin Login
const loginAdmin = async (req,res) => {
  try {
    const {email, password} = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

      const token = jwt.sign(email+password,process.env.JWT_SECRET)
      res.json({success:true,token})

    }else{
      res.json({success:false,message:"Invalid credential"})
    }
    
  } catch (error) {
     console.log(error);
    return({success:false,message:error.message})
  }
}

export {addDoctors,loginAdmin}