import {User} from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokens.js';

export async function signup(req,res) {
    try {
        const {email,password,username} =req.body;

        if(!email || !password || !username) {
            return res.status(400).json({success:false,message:"all fields are required"})
        }
        const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;

        if(!emailRegex.test(email)){
            return res.status(404).json({success:false,message:"invalid email"})
        }

        if(password.length < 6){
            return res.status(400).json({success:false,message:"password should be atleast 6 characters"})
        }

        const existingUserByEmail = await User.findOne({email:email}) 
        if(existingUserByEmail){
            return res.status(400).json({success:false,message:"email already exists"})
        }

        const existingUserByUsername = await User.findOne({username:username}) 
        if(existingUserByUsername){
            return res.status(400).json({success:false,message:"username already exists"})
        }

        const  salt =await bcryptjs.genSalt(10);
        const hashedPassword =await bcryptjs.hash(password,salt);

        const PROFILE_PIC= ["/avatar1.png","avatar2.png","avatar3.png"];

        const Image =PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];

        const newUser =new User({
            email:email,
            password:hashedPassword,
            username:username,
            Image:Image
        });

        
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                success:true,
                user:{
                ...newUser._doc,
                password:""
                },
            });
        
    } catch (error) {
        console.log("error in signup controller",error.message);
        res.status(500).json({success:false,message:"internal server error"})
    }
}

export async function login(req,res) {
    try {
        const {email,password} = req.body;
        if(!email || !password) {
            return res.status(400).json({success:false,message:"all fields are required"});
        }
        const user = await User.findOne({email:email})
        if(!user) {
            return res.status(404).json({success:false,message:"invalid credentials"});
        }
        const isPasswordCorrect = await bcryptjs.compare(password,user.password);
        
        if(!isPasswordCorrect){
            return res.status(404).json({success:false,message:"invalid credentials"});
        }
        generateTokenAndSetCookie(user._id,res);
        
        res.status(200).json({
            success:true,
            user: {
            ...user._doc,
            password:""
            },
        });

    } catch (error) {
        console.log("error in login controller",error.message);
        res.status(500).json({success:false,message:"internal server error"})
    }
}

export async function logout(req,res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true,message:"logged out successfully"});
    } catch (error) {
        console.log("error in logout controller",error.message);
        res.status(500).json({success:false,message:"internal server error"});
    }
}

export async function authCheck(req,res) {
    try {
        console.log("req.user:",req.user);
        res.status(200).json({success:true,user: req.user});
    } catch (error) {
        console.log("error in authCheck controller",error.message);
        res.status(500).json({success:false,message:"internal server error"});
    }
}