
import express from 'express'

import {
    addStudent,
    getStudents,
    updateStudent,
    deleteStudent
} from '../controllers/studentController.js'

const routes = express.Router()

routes.post("/", addStudent)

routes.get("/", getStudents)

routes.put("/", updateStudent)

routes.delete("/", deleteStudent)

export default routes
