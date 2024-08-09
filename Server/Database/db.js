import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config()

mongoose.set('strictQuery', false);





const Connection = async (url) => {

    try {
        await mongoose.connect(url)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("Error while connecting", error)
    }
}

export default Connection