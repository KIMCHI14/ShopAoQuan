const express = require('express')
    
const bodyParser = require('body-parser')
const app = express()
const PORT  = 5000

const authRoute =require('./routes/authRoute')
const productRoute =require('./routes/productRoute')
const brandRoute =require('./routes/brandRoute')
const categoryRoute =require('./routes/categoryRoute')
const uploadRoute =require('./routes/uploadRoute')
const cors = require('cors')
const dbConnect = require('./config/dbConnect')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

dbConnect()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(cookieParser())

app.use('/api/auth',authRoute)
app.use('/api/product',productRoute)
app.use('/api/brand',brandRoute)
app.use('/api/category',categoryRoute)
app.use('/api/upload',uploadRoute)

app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`)
})