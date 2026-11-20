import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import crudRoutes from './routes/curdRoutes.js'
import ConnectDb from './config/db.js'


const app = express()

dotenv.config()

ConnectDb()

app.use(cors())
app.use(express.json())
app.use("/api/crud",crudRoutes)


const PORT = process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log(`servre connected http://localhost:${PORT}`);
    
})

// http://localhost:5000/api/crud