import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./config/db.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "EduSmart backend is running!" })
})

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()")
    res.json({ success: true, time: result.rows[0] })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})