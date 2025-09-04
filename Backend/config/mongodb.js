import mongoose from "mongoose";

// const connectDB = async () => {
//   mongoose.connection.on('connected', ()=> console.log('Database Connected'))
//   await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
// }


const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database Connected");
  } catch (error) {
    console.error("❌ Database Connection Error:", error.message);
    process.exit(1);
  }
};


export default connectDB