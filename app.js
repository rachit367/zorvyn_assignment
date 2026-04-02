const express=require('express')
const app=express()
const dotenv=require('dotenv')
const path=require('path')

dotenv.config({path:path.join(__dirname,'.env')})
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const {errorHandling}=require('./middlewares/errorHandling')



app.use(errorHandling)
module.exports=app
