
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import studentRoute from './routes/studentRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/students", studentRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server Successfully connected http://localhost:${PORT}`)
})
