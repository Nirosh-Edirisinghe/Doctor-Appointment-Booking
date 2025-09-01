import express from 'express'
import { addDoctors } from '../controllers/adminController.js'
import upload from '../middleware/multer.js'

const adminRouter= express.Router()

adminRouter.post('/add-doctor',upload.single('image'),addDoctors)

export default adminRouter