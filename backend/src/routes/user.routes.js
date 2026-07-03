import express from "express"
import { createTeacher, getTeachers, deleteTeacher } from "../controllers/user.controller.js"

const router = express.Router()

router.post("/teachers", createTeacher)
router.get("/teachers", getTeachers)
router.delete("/teachers/:id", deleteTeacher)

export default router