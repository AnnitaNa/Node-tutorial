import mongoose from 'mongoose'

export const connectDb = async() => {
    try{
        await mongoose.connect(process.env.DATABASE_MONGO, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    }
    catch(err){
        console.log(err)
    }
}