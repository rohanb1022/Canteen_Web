import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from "cors"

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


app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

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


app.listen(PORT,() => {
    console.log('server started at http://localhost:'+PORT);
    connectDB();
});