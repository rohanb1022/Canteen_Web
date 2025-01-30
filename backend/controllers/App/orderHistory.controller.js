import AppUser from "../../models/appuser.model.js";

export const getOrderHistory = async (req , res) => {
    const studentId = req.user._id;
    try {
        const student = AppUser.findById(studentId);
        if(!student){
            res.status(400).json({message : "User not found"})
        }
        const completedOrder = student.completedOrder;
        if(!completedOrder){
            return res.json({message : "No Completed orders found"})
        }
        res.json(completedOrder);
    } catch (error) {
        console.log(error.message , "The error is coming from getOrderHistory function of app side");
        return res.status(501).json({message : "Internal server error"})
    }
}