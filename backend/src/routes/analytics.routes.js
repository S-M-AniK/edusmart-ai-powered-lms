import express from "express"
import { getAdminAnalytics, getTeacherAnalytics, getStudentAnalytics } from "../controllers/analytics.controller.js"

const router = express.Router()

router.get("/admin", getAdminAnalytics)
router.get("/teacher/:teacher_id", getTeacherAnalytics)
router.get("/student/:student_id", getStudentAnalytics)

export default router