import mongoose from "mongoose"

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("mongodb connected successfully")
    } catch (error) {
        console.log("mongodb connection error. error: ", error);
        process.exit(1);
    }
}

export { connectDB }