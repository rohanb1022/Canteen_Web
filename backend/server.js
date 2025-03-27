import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

//test
import authRoutes from './routes/auth.route.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

//test
//website Routes
import webStatisticsRoutes from './routes/statistics.route.js';
import webProductRoutes from './routes/products.route.js';
import webOrderHistoryRoutes from "./routes/orderHistory.route.js"
import webViewOrderRoutes from "./routes/viewOrder.route.js"
import updateOrderStatusRoute  from './routes/updateOrderStatus.route.js';
import orderRoute from "./routes/orderRoutes.js";

//App routes
import viewOrderRoutes from './routes/App/viewOrder.route.js';
import orderHistoryRoutes from './routes/App/ordersHistory.route.js';
import productRoutes from "./routes/App/products.route.js";
import appAuthRoutes from "./routes/App/auth.route.js"
import appProfileRoutes from './routes/App/profile.route.js';
import appPaymentRoutes from './routes/App/payment.route.js';
import fooditemRoutes from './routes/App/FoodItem.route.js';
import tokenroutes from './routes/App/token.route.js';
import forgotpass from './routes/App/forgotpass.route.js'
import resetpass from './routes/App/resetpass.route.js';
import protectRoute from './middleware/protectRoute.js';
import updateStatus from './routes/orderRoutes.js';
import { getOrderStatus } from './controllers/orderStatus.controller.js';
import getOrderStatusRoutes from './routes/App/getOrderStatus.route.js'
import ContactUs from './routes/App/ContactUs.route.js';
import Review from './routes/App/Review.route.js';
// Test routes
import orderRoutes from './routes/test/order.route.js';
import userRoutes from './routes/test/user.route.js';
import foodRoutes from "./routes/test/fooditem.route.js"


const app = express();
const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

// Configure CORS with proper settings
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:8081','https://vesitbite-five.vercel.app/', '*']; // Add specific origins and '*'
    
    if (!origin || allowedOrigins.includes(origin) || origin === '*') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers)
}));


app.use(express.json());
app.use(cookieParser());

app.get('/app/api/v1/test', (req, res) => {
  res.send('Test route is working');
});



// Set up routes
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1' ,webStatisticsRoutes);
app.use("/api/v1" ,webOrderHistoryRoutes)
app.use("/api/v1" ,webProductRoutes)
app.use("/api/v1" ,webViewOrderRoutes)

// app routes
app.use("/app/api/v1/auth" , appAuthRoutes)
app.use('/app/api/v1', viewOrderRoutes); //
app.use('/app/api/v1', orderHistoryRoutes);//
app.use('/app/api/v1', productRoutes);//
app.use('/app/api/v1' , appProfileRoutes);//
app.use('/app/api/v1' , appPaymentRoutes);//
app.use("/app/api/v1" , fooditemRoutes)
app.use('/app/api/v1', tokenroutes);
app.use('/app/api/forgotpassword', forgotpass);
app.use('/app/api/resetpassword', resetpass);
app.use('/app/api/v1', getOrderStatusRoutes);  // Mount the route correctly
app.use('/app/api/v1', ContactUs);
app.use('/app/api/v1', Review);


//website routes
app.use('/api/v1', webStatisticsRoutes);
app.use('/api/v1', webViewOrderRoutes); 
app.use('/api/v1', webOrderHistoryRoutes);
app.use('/api/v1', updateStatus);
app.use("/api/v1", updateOrderStatusRoute);
app.use("/api/v1" , orderRoute);

// Test routes
app.use('/api/orders', orderRoutes);//
app.use('/api/users', userRoutes);//
app.use('/api', foodRoutes);//

app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT);
  connectDB();
});
