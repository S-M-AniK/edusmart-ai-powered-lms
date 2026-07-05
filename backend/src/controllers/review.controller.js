import pool from "../config/db.js"

export async function createReview(req, res) {
  try {
    const { student_id, course_id, rating, comment } = req.body

    if (!student_id || !course_id || !rating) {
      return res.status(400).json({ success: false, message: "Student ID, Course ID and rating required" })
    }

    const enrollCheck = await pool.query(
      "SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2",
      [student_id, course_id]
    )
    if (enrollCheck.rows.length === 0) {
      return res.status(403).json({ success: false, message: "You must be enrolled to review this course" })
    }

    const existing = await pool.query(
      "SELECT * FROM reviews WHERE student_id = $1 AND course_id = $2",
      [student_id, course_id]
    )
    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, message: "You have already reviewed this course" })
    }

    const result = await pool.query(
      "INSERT INTO reviews (student_id, course_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
      [student_id, course_id, rating, comment || null]
    )

    res.status(201).json({ success: true, review: result.rows[0] })
  } catch (err) {
    console.error("Create review error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getCourseReviews(req, res) {
  try {
    const { course_id } = req.params

    const result = await pool.query(
      `SELECT r.*, u.name as student_name
       FROM reviews r
       JOIN users u ON r.student_id = u.id
       WHERE r.course_id = $1 AND r.approved = true
       ORDER BY r.created_at DESC`,
      [course_id]
    )

    res.json({ success: true, reviews: result.rows })
  } catch (err) {
    console.error("Get reviews error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getAllReviews(req, res) {
  try {
    const result = await pool.query(
      `SELECT r.*, u.name as student_name, c.title as course_title
       FROM reviews r
       JOIN users u ON r.student_id = u.id
       JOIN courses c ON r.course_id = c.id
       ORDER BY r.created_at DESC`
    )

    res.json({ success: true, reviews: result.rows })
  } catch (err) {
    console.error("Get all reviews error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function approveReview(req, res) {
  try {
    const { id } = req.params
    const { approved } = req.body

    const result = await pool.query(
      "UPDATE reviews SET approved = $1 WHERE id = $2 RETURNING *",
      [approved, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Review not found" })
    }

    res.json({ success: true, review: result.rows[0] })
  } catch (err) {
    console.error("Approve review error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function deleteReview(req, res) {
  try {
    const { id } = req.params

    const result = await pool.query(
      "DELETE FROM reviews WHERE id = $1 RETURNING *",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Review not found" })
    }

    res.json({ success: true, message: "Review deleted successfully" })
  } catch (err) {
    console.error("Delete review error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}