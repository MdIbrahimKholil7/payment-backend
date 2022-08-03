const express = require('express');
const app=express()
const cors = require('cors');
const port =process.env.PORT || 5000
require('dotenv').config()
app.use(express.json())
// cors url 
app.use(cors({
    origin:['http://localhost:3000','https://payment-task-aa389.web.app'],
    credentials:true,
    optionSuccessStatus:200,
}))

// payment api 
const paymentApi=require('./api/paymentApi.js')


app.get('/',(req,res)=>{
    res.send({
        message:'server running'
    })
})

app.use('/api',paymentApi)
app.listen(port,()=> console.log('server is running on port', port))