import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
export const app = express()

config({
    path : "./data/config.env"
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET','POST','PUT','DELETE'],
    credentials: true,
}));

//using routes
app.use("/users",userRouter);
app.use("/task",taskRouter);

app.get("/",(req,res)=>{
    res.send("Nice and working");
});

app.use(errorMiddleware)
 
function comments(){

    // app.get("/userid/:id", async (req,res)=>{
    
    //     const {id} = req.query;
    //     const users = await User.findById(id);
    
    //     res.json({
    //         success:true,
    //         users,
    //     });
    // });
    
    // app.post("/user/new", async (req,res)=>{
    
    //     const {name,email,password} = req.body
    
    //     await User.create({
    //         name,
    //         email,
    //         password,
    //     });
        
        // await User.create({
        //     name:"Tanmay",
        //     email:"tanmayjadav12@gmail.com",
        //     password:"password",
        // });
    
    //     res.status(201).cookie("temp","lol").json({
    //         success:true,
    //         message:"Successful",
    //     });
    // });
    }