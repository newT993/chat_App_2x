import mongoose from "mongoose";
let isConnected = false;
const connectDb = async() =>{
    if(isConnected){
        console.log('Already connected')
        return   
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI) 
        console.log("MongoDB Connected");
        isConnected = true;
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDb;