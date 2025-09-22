import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import rateLimit from "express-rate-limit"
import connectDb from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import bookRouter from './routes/book.routes'
import analyticsRouter from './routes/analytics.routes.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

const limiter = rateLimit({
    windowMs : 1 * 60 * 1000,
    max : 100
})

app.use(limiter)

app.use("/api/auth",authRoutes)
app.use("/api/books",bookRouter)
app.use("/api/analytics",analyticsRouter)

const PORT = process.env.PORT

app.listen(PORT , async () =>{
    connectDb()
    console.log(`Server is running on PORT : ${PORT}`)
})