import mongoose from 'mongoose';

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://mnadhif:9841185n@cluster0.jp7etyc.mongodb.net/mynotes',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    } catch (error) {
        console.log(error);
    }
};
