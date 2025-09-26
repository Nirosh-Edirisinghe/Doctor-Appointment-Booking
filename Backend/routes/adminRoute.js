import express from 'express'
import { addDoctors,allDoctors,loginAdmin } from '../controllers/adminController.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js'
import { chnageAvailability } from '../controllers/doctorController.js'

const adminRouter= express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctors)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,chnageAvailability)

export default adminRouter 