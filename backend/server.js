import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

import authRoutes from "./routes/auth.route.js";
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import  protectRoute  from './middleware/protectRoute.js';
import viewOrderRoutes from './routes/viewOrder.route.js'
import statisticsRoutes from './routes/statistics.route.js';
import orderHistoryRoutes from './routes/ordersHistory.route.js'; 

//test
import orderRoutes from './routes/test/order.route.js';
import userRoutes from './routes/test/user.route.js';
import foodItemRoutes from './routes/test/fooditem.route.js';

const app=express();
const PORT=ENV_VARS.PORT
const __dirname = path.resolve();
app.use(cors());


app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth",authRoutes);
app.use('/api/v1', statisticsRoutes);
app.use('/api/v1', viewOrderRoutes); 
app.use('/api/v1', orderHistoryRoutes);

//test
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/fooditems', foodItemRoutes);
//test

// if(ENV_VARS.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, "/frontend/dist")));

//     app.get("*",(req,res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//     })
// }

// if (ENV_VARS.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, "frontend", "dist")));  // Remove the leading slash before "frontend"
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//     });
//   }

app.listen(PORT,() => {
    console.log('server started at http://localhost:'+PORT);
    connectDB();
});