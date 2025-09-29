import  express from 'express'
import { donctorList } from '../controllers/doctorController.js'

const doctorRoter = express.Router()

doctorRoter.get('/list',donctorList)

export default doctorRoter