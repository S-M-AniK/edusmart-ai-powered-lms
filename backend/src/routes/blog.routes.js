import express from "express"
import { createBlog, getBlogs, getAllBlogs, getBlogById, updateBlog, deleteBlog } from "../controllers/blog.controller.js"

const router = express.Router()

router.get("/", getBlogs)
router.get("/all", getAllBlogs)
router.get("/:id", getBlogById)
router.post("/", createBlog)
router.put("/:id", updateBlog)
router.delete("/:id", deleteBlog)

export default router