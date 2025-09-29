import doctorModel from "../model/doctorsModel.js";

const chnageAvailability = async (req,res) =>{
  try {
    const {docId} = req.body

    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
    res.json({success:true,message:'Avalability Changed'})
  } catch (error) {
    console.log(error);
    return({success:false,message:error.message})
  }
}

const donctorList = async (req,res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password','-email'])
    res.json({success:true,doctors})
  } catch (error) {
    console.log(error);
    return({success:false,message:error.message})
  }
}

export {chnageAvailability,donctorList}