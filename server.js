const dotenv=require('dotenv')
const path=require('path')
dotenv.config({path:path.join(__dirname,'.env')})

const app=require('./app')
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log('server started on:',PORT)
})