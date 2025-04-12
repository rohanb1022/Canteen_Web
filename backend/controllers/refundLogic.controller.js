import Order from "../models/order.model";

export const rejectedOrder = async (req , res) => {
    try {
        const order = Order.find({ status : "rejected" })
        if(!order){
            return res.json{message : "No rejected order found"}
        }
        return res.json(order)
    } catch (error) {
        console.log(error.message);
        res.status(501).json({message : "Internal server error"})
    }
}

export const rejectedFoodItem = async (req, res) => {
    try {
        const order = Order.find({status : "accepted"})
        if(!order){
            return res.json({message : "No order found"});
        }

        const rejectedFoodItem = order.foodItems;
        
    } catch (error) {
        console.log(error.message);
    }
}