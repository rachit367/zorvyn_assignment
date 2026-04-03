const dotenv=require('dotenv')
const path=require('path')
dotenv.config({path:path.join(__dirname,'.env')})

const app=require('./app')
const { seedUsers } = require('./utils/seedUsers');

const PORT=process.env.PORT
app.listen(PORT, async () => {
    console.log('server started on:',PORT)
    await seedUsers()
})