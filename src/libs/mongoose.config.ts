import mongoose from "mongoose";

export const initializeMongoose = async (): Promise<boolean> => {
    mongoose.Promise = Promise;
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        return true;
    } catch (error) {
        console.log("An error occurred while connecting to MongoDB.", error)
        return false;
    }
}
