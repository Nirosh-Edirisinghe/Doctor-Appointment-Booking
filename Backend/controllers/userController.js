import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../model/userModel.js'
import { v2 as cloudinary} from 'cloudinary'
import doctorModel from '../model/doctorsModel.js'
import { json } from 'express'
import appointmentModel from '../model/appoinmentModel.js'

// api to register user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Misssing Details' })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'enter a valid email' })
    }

    if (password.length < 8) {
      return res.json({ success: false, message: 'enter a strong password' })
    }

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashedPassword
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ success: true, token })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}


// api for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "User does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid credential" })
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

// api to get set profile
const getProfile = async (req,res) => {
  try {
    // const {userId} = req.body
    const userId = req.user.id;
    const userData = await userModel.findById(userId).select('-password')

    res.json({success:true,userData})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

// api to update user profile
const updateProfile = async (req,res) => {
  try {
    const userId = req.user.id;
    const {name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    if(!name || !phone || !dob || !gender){
      return res.json({success:true,message:'Data Missing'})
    }

    await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

    if(imageFile){
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
      
      const imageURL = imageUpload.secure_url

      await userModel.findByIdAndUpdate(userId,{image:imageURL})
    }

    res.json({success:true,message:'profile updated'})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

// api for book appoinment
const bookAppointment = async (req,res) => {
  try {
    const userId = req.user.id;
    const {docId,slotDate,slotTime} = req.body

    const docData = await doctorModel.findById(docId).select('-password')

    if(!docData.available){
      return res,json({success:true, message:'doctor not available'})
    }

    let slots_booked = docData.slots_booked

    // checking  for slot availbale
    if (slots_booked[slotDate]){
      if(slots_booked[slotDate].includes(slotTime)){
        return res.json({success:false,message:'Slot not available'})
      }else{
        slots_booked[slotDate].push(slotTime)
      }
    }else{
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    const userData = await  userModel.findById(userId).select('-password')

    delete docData.slots_booked

    const appoinmentData = {
      userId,
      docId,
      userData,
      docData,
      amount:docData.fees,
      slotTime,
      slotDate,
      date:Date.now()
    }

    const newAppointment = new appointmentModel(appoinmentData)
    await newAppointment.save()

    // save new slots  data in docData
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({success:true,message:'Apponment Bookekd'})
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

// api to get user appoinment for frontend my appoinment page  

const listAppoinment = async (req,res) =>{
  try {
    const userId = req.user.id;
    const appoinments = await appointmentModel.find({userId})

    res.json({success:true,appoinments})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

export { registerUser, loginUser, getProfile, updateProfile,bookAppointment,listAppoinment}