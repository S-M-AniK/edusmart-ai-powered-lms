import express from "express"
import { createReview, getCourseReviews, getAllReviews, approveReview, deleteReview } from "../controllers/review.controller.js"

const router = express.Router()

router.post("/", createReview)
router.get("/course/:course_id", getCourseReviews)
router.get("/", getAllReviews)
router.patch("/:id/approve", approveReview)
router.delete("/:id", deleteReview)

export default router