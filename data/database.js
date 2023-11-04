import mongoose from "mongoose";

export const connectDB = () =>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"backendapi",
        
    })
    .then(()=> console.log("DataBase Connected"))
    .catch((e)=>console.log(e));
};