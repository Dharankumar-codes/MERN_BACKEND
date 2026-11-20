import express from 'express'
import { addDatas, deleteDatas, fetchDatas, updateDatas } from '../controllers/crudController.js'



const routes = express.Router()

// http://localhost:5000/api/crud/insert
// http://localhost:5000/api/crud/get

// http://localhost:5000/api/crud/updatenewdata
// http://localhost:5000/api/crud/deletedatas

routes.post("/insert",addDatas)
routes.get("/get",fetchDatas)
routes.put("/updatenewdata/:userid",updateDatas)
routes.delete("/deletedatas/:userid",deleteDatas)
export default routes