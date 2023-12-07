require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')
const rentalInvoiceRouter = require('./routes/rentalInvoice')
const carRouter = require('./routes/car')
const accountRouter = require('./routes/account')

const cors = require('cors')

const connectDB = async () => {
    try { 
        mongoose.set("strictQuery", false)
        mongoose.connect(   
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@hiringcar.bc2rvzj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        })    

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('Hi!, welcome to my api'))

app.use('/api/auth', authRouter)
app.use('/api/rent', rentalInvoiceRouter)
app.use('/api/cars', carRouter)
app.use('/api/account', accountRouter)

const PORT = 4001

app.listen(process.env.PORT, () => {
    console.log(`Server started on port http://localhost:${process.env.PORT}`)
})
