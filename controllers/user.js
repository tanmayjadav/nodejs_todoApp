import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req,res)=>{
try {
  
    const {name,email,password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password",400));

    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch) return res.status(404).json({
        success:false,
        message:"Invalid Email or password",
    });

    sendCookies(user,res,`Welcome Back, ${user.name}`,200);
  
} catch (error) {
    next(error)
}};

export const register = async (req,res)=>{
try {
    
    const {name,email,password} = req.body

    let user = await User.findOne({ email }); 

    if (user) return next(new ErrorHandler("user Already Exist",400));

    const hashpass = await bcrypt.hash(password,10);
    user = await User.create({
        name,
        email,
        password:hashpass,
    });
    sendCookies(user,res,"Register Success",201);
} catch (error) {
    next(error)
}
};

export const getMyProfile = async (req,res)=>{
    
     res.status(200).json({
        success:true,
        user:req.user,
     });
     
};

export const logout = async (req,res)=>{


    res.status(200)
    .cookie("token","",{expire:new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "Development"? "lax" : "none", 
        secure:process.env.NODE_ENV === "Development" ? false : true,
    }) 
    .json({
        success:true,
     });
}

// export const updateUserDetail = async (req,res)=>{

//     const {id} = req.params;
//     const users = await User.findById(id);

//     res.json({
//         success:true,
//         message:"User Updated",
//     });
// }

// export const deleteUserDetail = async (req,res)=>{

//     const {id} = req.params;
//     const users = await User.findById(id);

//     await users.deleteOne({ _id: id });

//     res.json({
//         success:true,
//         message:"deleted",
//     });
// }


