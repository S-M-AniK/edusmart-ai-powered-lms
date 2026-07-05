import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./config/db.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import courseRoutes from "./routes/course.routes.js"
import enrollmentRoutes from "./routes/enrollment.routes.js"
import reviewRoutes from "./routes/review.routes.js"
import wishlistRoutes from "./routes/wishlist.routes.js"
import blogRoutes from "./routes/blog.routes.js"
import contactRoutes from "./routes/contact.routes.js"
import analyticsRoutes from "./routes/analytics.routes.js"
import chatRoutes from "./routes/chat.routes.js"

dotenv.config()

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "EduSmart backend is running!" })
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/courses", courseRoutes)
app.use("/api/enrollments", enrollmentRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/blogs", blogRoutes)
app.use("/api/contacts", contactRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/chat", chatRoutes)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
