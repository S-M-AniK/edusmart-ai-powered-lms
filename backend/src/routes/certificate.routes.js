import express from "express"
import { generateCertificate, getStudentCertificates } from "../controllers/certificate.controller.js"

const router = express.Router()

router.get("/generate/:student_id/:course_id", generateCertificate)
router.get("/student/:student_id", getStudentCertificates)

export default router