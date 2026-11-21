
let students = []

// POST - Create Student
export const addStudentService = async (data) => {
    let obj = {
        ...data,
        id: Date.now()
    }

    students.push(obj)
    return obj
}

// GET - All Students
export const getStudentsService = async () => {
    return students
}

// PUT - Update Student
export const updateStudentService = async (data) => {
    const { id, ...updates } = data

    let student = students.find(
        (item) => item.id === id
    )

    if (!student) {
        return null
    }

    Object.assign(student, updates)
    return student
}

// DELETE - Delete Student
export const deleteStudentService = async (data) => {
    console.log("DELETE ID:", data.id)
    console.log("STUDENTS BEFORE DELETE:", students)

    let index = students.findIndex(
        (item) => item.id === data.id
    )

    console.log("FOUND INDEX:", index)

    if (index === -1) {
        return null
    }

    let deletedStudent = students.splice(index, 1)

    return deletedStudent[0]
}
