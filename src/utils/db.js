import mongoose from "mongoose";

const connect = async () => {
    try {
        // Check if we already have a connection
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }

        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
        console.log('MongoDB connected successfully');
        
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error(`Connection failed: ${error.message}`);
    }
}

export default connect;
