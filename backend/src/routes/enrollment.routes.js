import express from "express"
import { enrollCourse, getStudentEnrollments, getCourseEnrollments, updateProgress, unenrollCourse } from "../controllers/enrollment.controller.js"

const router = express.Router()

router.post("/", enrollCourse)
router.get("/student/:student_id", getStudentEnrollments)
router.get("/course/:course_id", getCourseEnrollments)
router.patch("/progress/:student_id/:course_id", updateProgress)
router.delete("/:student_id/:course_id", unenrollCourse)

export default router