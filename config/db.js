const mongoose=require('mongoose')
async function connectDB() {
    try{
        const URL=process.env.MONGO_URI
        await mongoose.connect(URL)
        console.log('MongoDB connected')
    }catch(err){
        console.error("DB Error:", err.message)
        process.exit(1) 
    }
}

module.exports={connectDB}