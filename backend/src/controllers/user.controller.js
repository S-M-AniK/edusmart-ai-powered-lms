import bcrypt from "bcryptjs"
import pool from "../config/db.js"

export async function createTeacher(req, res) {
  try {
    const { name, email } = req.body

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" })
    }

    const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [email])

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, message: "Email already registered" })
    }

    const defaultPassword = "teacher123"
    const hashedPassword = await bcrypt.hash(defaultPassword, 10)

    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at",
      [name, email, hashedPassword, "teacher"]
    )

    res.status(201).json({ success: true, user: result.rows[0] })
  } catch (err) {
    console.error("Create teacher error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getTeachers(req, res) {
  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE role = 'teacher' ORDER BY created_at DESC"
    )
    res.json({ success: true, teachers: result.rows })
  } catch (err) {
    console.error("Get teachers error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function deleteTeacher(req, res) {
  try {
    const { id } = req.params
    await pool.query("DELETE FROM users WHERE id = $1 AND role = 'teacher'", [id])
    res.json({ success: true, message: "Teacher deleted successfully" })
  } catch (err) {
    console.error("Delete teacher error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getStudents(req, res) {
  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE role = 'student' ORDER BY created_at DESC"
    )
    res.json({ success: true, students: result.rows })
  } catch (err) {
    console.error("Get students error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function createStudent(req, res) {
  try {
    const { name, email } = req.body

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" })
    }

    const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [email])

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, message: "Email already registered" })
    }

    const defaultPassword = "student123"
    const hashedPassword = await bcrypt.hash(defaultPassword, 10)

    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at",
      [name, email, hashedPassword, "student"]
    )

    res.status(201).json({ success: true, user: result.rows[0] })
  } catch (err) {
    console.error("Create student error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function deleteStudent(req, res) {
  try {
    const { id } = req.params
    await pool.query("DELETE FROM users WHERE id = $1 AND role = 'student'", [id])
    res.json({ success: true, message: "Student deleted successfully" })
  } catch (err) {
    console.error("Delete student error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}