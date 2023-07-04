const express = require ('express')
const send = require('send')
const colors = require('colors')
const dotenv = require ('dotenv').config()
const PORT = process.env.PORT || 8000
const connectDB = require('./config/db')
const {errorHandler } = require('./middleware/errorMiddleWare')

connectDB() 

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors())

app.get(('/'),(req,res)=>{
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.status(200).json({message:'Welcome to Support Desk'})
})

//Routes
app.use('/api/users', require('./routes/userRoutes.js'))

app.use('/api/tickets',require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(PORT,()=>console.log(`Server has started on port ${PORT}`))
