import express from "express"
import { getCourses, getCourseById, createCourse, updateCourse, updateCourseStatus, deleteCourse, getTeacherCourses } from "../controllers/course.controller.js"

const router = express.Router()

router.get("/", getCourses)
router.get("/teacher/:teacher_id", getTeacherCourses)
router.get("/:id", getCourseById)
router.post("/", createCourse)
router.put("/:id", updateCourse)
router.patch("/:id/status", updateCourseStatus)
router.delete("/:id", deleteCourse)

export default router