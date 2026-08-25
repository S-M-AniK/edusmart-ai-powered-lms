import express from "express"
import {
  createTeacher,
  getTeachers,
  getTeacherById,
  deleteTeacher,
  getStudents,
  createStudent,
  deleteStudent,
} from "../controllers/user.controller.js"

const router = express.Router()

router.post("/teachers", createTeacher)
router.get("/teachers", getTeachers)
router.get("/teachers/:id", getTeacherById)
router.delete("/teachers/:id", deleteTeacher)

router.get("/students", getStudents)
router.post("/students", createStudent)
router.delete("/students/:id", deleteStudent)

export default router