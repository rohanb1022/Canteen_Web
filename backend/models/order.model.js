import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'AppUser', required: true },
  foodItems: [
    {
      foodItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      status: { type: String, enum: ['accepted', 'rejected','pending'], default: 'pending' }
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'accepted', 'rejected', 'prepared'], 
    default: 'pending'
  },
  orderDate: { type: Date, default: Date.now },
  paymentId: {type:String , required : true},
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
