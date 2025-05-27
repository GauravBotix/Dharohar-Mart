import mongoose from "mongoose";

if (process.env.MONGODB_URI) {
    throw new Error('Please connect to the database by providing the correct database uri.')
}

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB.');
        
    } catch (error) {
        console.log('MongoDb connection error occured:', error);
        process.exit(1);
        
    }
}

export default connectDb;