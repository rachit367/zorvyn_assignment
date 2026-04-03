const express=require('express')
const app=express()
const dotenv=require('dotenv')
const path=require('path')

dotenv.config({path:path.join(__dirname,'.env')})
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const {errorHandling}=require('./middlewares/errorHandling')
const {connectDB}=require('./config/db')
const transactionsRouter=require('./routes/transactionsRouter')
const dashboardRouter=require('./routes/dashboardRouter')
const authRouter=require('./routes/authRouter')
const adminRouter=require('./routes/adminRouter')

connectDB()

app.use('/api/auth',authRouter)
app.use('/api/admin',adminRouter)
app.use('/api/transaction',transactionsRouter)
app.use('/api/dashboard',dashboardRouter)


app.use(errorHandling)
module.exports=app
