import mongoose from 'mongoose';

// Define the schema for the AppUser model
const AppUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  completedOrder : [{
    type : mongoose.Schema.Types.ObjectId , ref : "AppUser"
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  otp: { type: String },
  otpExpires: { type: Date },
}, { timestamps: true });

const AppUser = mongoose.models.AppUser || mongoose.model('AppUser', AppUserSchema);
export default AppUser;
