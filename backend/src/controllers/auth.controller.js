import bcrypt from "bcryptjs"
import pool from "../config/db.js"

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" })
    }

    const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [email])

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, message: "Email already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at",
      [name, email, hashedPassword, role || "student"]
    )

    res.status(201).json({ success: true, user: result.rows[0] })
  } catch (err) {
    console.error("Register error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}