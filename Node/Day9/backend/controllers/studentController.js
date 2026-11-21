
import {
    addStudentService,
    getStudentsService,
    updateStudentService,
    deleteStudentService
} from '../services/studentService.js'


// POST - Create Student
export const addStudent = async (req, res) => {

    try {

        const { name, mobile, course } = req.body

        if (!name || !mobile || !course) {
            return res.status(400).json({
                msg: "Please Fill the Form"
            })
        }

        let student = await addStudentService({
            name,
            mobile,
            course
        })

        res.status(201).json({
            msg: "Student Added Successfully",
            student
        })

    } catch (error) {
        console.log("Error:", error.message)

        res.status(500).json({
            msg: "Server Error"
        })
    }
}


// GET - All Students
export const getStudents = async (req, res) => {

    try {

        let students = await getStudentsService()

        res.status(200).json({
            msg: "Success",
            students
        })

    } catch (error) {
        console.log("Error:", error.message)

        res.status(500).json({
            msg: "Server Error"
        })
    }
}


// PUT - Update Student
export const updateStudent = async (req, res) => {

    try {

        const { id, name, mobile, course } = req.body

        if (id === undefined || id === null) {
            return res.status(400).json({
                msg: "Student ID is required"
            })
        }

        let student = await updateStudentService({
            id,
            name,
            mobile,
            course
        })

        if (!student) {
            return res.status(404).json({
                msg: "Student Not Found"
            })
        }

        res.status(200).json({
            msg: "Student Updated Successfully",
            student
        })

    } catch (error) {
        console.log("Error:", error.message)

        res.status(500).json({
            msg: "Server Error"
        })
    }
}


// DELETE - Delete Student
export const deleteStudent = async (req, res) => {

    try {

        const { id } = req.body

        if (id === undefined || id === null) {
            return res.status(400).json({
                msg: "Student ID is required"
            })
        }

        let student = await deleteStudentService({ id })

        if (!student) {
            return res.status(404).json({
                msg: "Student Not Found"
            })
        }

        res.status(200).json({
            msg: "Student Deleted Successfully",
            student
        })

    } catch (error) {
        console.log("Error:", error.message)

        res.status(500).json({
            msg: "Server Error"
        })
    }
}
