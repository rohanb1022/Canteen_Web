import mongoose from 'mongoose';

// Define the schema for the AppUser model
const AppUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent overwriting the model if it already exists
const AppUser = mongoose.models.AppUser || mongoose.model('AppUser', AppUserSchema);

export default AppUser;
