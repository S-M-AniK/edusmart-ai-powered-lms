import pool from "../config/db.js"

export async function addToWishlist(req, res) {
  try {
    const { student_id, course_id } = req.body

    if (!student_id || !course_id) {
      return res.status(400).json({ success: false, message: "Student ID and Course ID required" })
    }

    const existing = await pool.query(
      "SELECT * FROM wishlist WHERE student_id = $1 AND course_id = $2",
      [student_id, course_id]
    )
    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Course already in wishlist" })
    }

    const result = await pool.query(
      "INSERT INTO wishlist (student_id, course_id) VALUES ($1, $2) RETURNING *",
      [student_id, course_id]
    )

    res.status(201).json({ success: true, wishlist: result.rows[0] })
  } catch (err) {
    console.error("Add wishlist error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getStudentWishlist(req, res) {
  try {
    const { student_id } = req.params

    const result = await pool.query(
      `SELECT w.*, c.title, c.description, c.category, c.thumbnail, c.level, c.price, c.duration, u.name as teacher_name
       FROM wishlist w
       JOIN courses c ON w.course_id = c.id
       JOIN users u ON c.teacher_id = u.id
       WHERE w.student_id = $1
       ORDER BY w.added_at DESC`,
      [student_id]
    )

    res.json({ success: true, wishlist: result.rows })
  } catch (err) {
    console.error("Get wishlist error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function removeFromWishlist(req, res) {
  try {
    const { student_id, course_id } = req.params

    const result = await pool.query(
      "DELETE FROM wishlist WHERE student_id = $1 AND course_id = $2 RETURNING *",
      [student_id, course_id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Wishlist item not found" })
    }

    res.json({ success: true, message: "Removed from wishlist" })
  } catch (err) {
    console.error("Remove wishlist error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}