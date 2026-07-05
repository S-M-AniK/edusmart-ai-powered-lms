import express from "express"
import { addToWishlist, getStudentWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js"

const router = express.Router()

router.post("/", addToWishlist)
router.get("/student/:student_id", getStudentWishlist)
router.delete("/:student_id/:course_id", removeFromWishlist)

export default router