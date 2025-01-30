import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';


import authRoutes from './routes/auth.route.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

//test
//website Routes
import webStatisticsRoutes from './routes/statistics.route.js';
import webProductRoutes from './routes/products.route.js';
import webOrderHistoryRoutes from "./routes/orderHistory.route.js"
import webViewOrderRoutes from "./routes/viewOrder.route.js"

//App routes
import viewOrderRoutes from './routes/App/viewOrder.route.js';
import orderHistoryRoutes from './routes/App/ordersHistory.route.js';
import productRoutes from "./routes/App/products.route.js";
import appAuthRoutes from "./routes/App/auth.route.js"
import appProfileRoutes from './routes/App/profile.route.js';
import appPaymentRoutes from './routes/App/payment.route.js';
import fooditemRoutes from './routes/App/FoodItem.route.js';
import tokenroutes from './routes/App/token.route.js';


import protectRoute from './middleware/protectRoute.js';
// import viewOrderRoutes from './routes/viewOrder.route.js';
// import statisticsRoutes from './routes/statistics.route.js';
// import orderHistoryRoutes from './routes/ordersHistory.route.js';
// import productRoutes from './routes/products.route.js';
import updateStatus from './routes/orderRoutes.js';


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
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:8081', '*']; // Add specific origins and '*'
    
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

// Set up routes
app.use("/api/v1/auth", authRoutes);

app.use('/api/v1', webStatisticsRoutes);
app.use("/api/v1" , webOrderHistoryRoutes)
app.use("/api/v1" ,webProductRoutes )
app.use("/api/v1" ,webViewOrderRoutes )
// app routes
app.use("/app/api/v1/auth" , appAuthRoutes)
app.use('/app/api/v1', viewOrderRoutes); //
app.use('/app/api/v1', orderHistoryRoutes);//
app.use('/app/api/v1', productRoutes);//
app.use('/app/api/v1' , appProfileRoutes);//
app.use('/app/api/v1' , appPaymentRoutes);//
app.use("/app/api/v1" , fooditemRoutes)
app.use('/app/api/tokens', tokenroutes);


//website routes
app.use('/api/v1', webStatisticsRoutes);
app.use('/api/v1', webViewOrderRoutes); 
app.use('/api/v1',  webOrderHistoryRoutes);
app.use('/api/v1', webProductRoutes);
app.use('/api/v1', updateStatus);

// app.use('/api/v1', foodItemRoutes);
// Test routes
app.use('/api/orders', orderRoutes);//
app.use('/api/users', userRoutes);//
app.use('/api', foodRoutes);//

app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT);
  connectDB();
});
