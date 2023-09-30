import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://admin:Pi314159265%23@test-vector-search-clus.lbeykme.mongodb.net/vector-database";

export const initializeMongoose = async (): Promise<boolean> => {
    mongoose.Promise = Promise;
    try {
        await mongoose.connect(MONGO_URL);
        return true;
    } catch (error) {
        console.log("An error occurred while connecting to MongoDB.", error)
        return false;
    }
}
