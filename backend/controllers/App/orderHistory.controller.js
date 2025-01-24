import AppUser from "../../models/appuser.model.js";

export const getOrderHistory = async (req , res) => {
    const studentId = req.params.id;
    try {
        const student = AppUser.findById(studentId);
        if(!student){
            return res.status(400).json({message : "User is not fount"})
        }
    } catch (error) {
        
    }
}