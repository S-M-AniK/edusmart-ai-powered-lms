import pool from "../config/db.js"

export async function enrollCourse(req, res) {
  try {
    const { student_id, course_id } = req.body

    if (!student_id || !course_id) {
      return res.status(400).json({ success: false, message: "Student ID and Course ID required" })
    }

    const courseCheck = await pool.query("SELECT * FROM courses WHERE id = $1 AND status = 'approved'", [course_id])
    if (courseCheck.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Course not found or not approved" })
    }

    const existing = await pool.query(
      "SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2",
      [student_id, course_id]
    )
    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Already enrolled in this course" })
    }

    const result = await pool.query(
      "INSERT INTO enrollments (student_id, course_id) VALUES ($1, $2) RETURNING *",
      [student_id, course_id]
    )

    res.status(201).json({ success: true, enrollment: result.rows[0] })
  } catch (err) {
    console.error("Enroll error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getStudentEnrollments(req, res) {
  try {
    const { student_id } = req.params

    const result = await pool.query(
      `SELECT e.*, c.title, c.description, c.category, c.thumbnail, c.level, c.duration, u.name as teacher_name
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       JOIN users u ON c.teacher_id = u.id
       WHERE e.student_id = $1
       ORDER BY e.enrolled_at DESC`,
      [student_id]
    )

    res.json({ success: true, enrollments: result.rows })
  } catch (err) {
    console.error("Get enrollments error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getCourseEnrollments(req, res) {
  try {
    const { course_id } = req.params

    const result = await pool.query(
      `SELECT e.*, u.name as student_name, u.email
       FROM enrollments e
       JOIN users u ON e.student_id = u.id
       WHERE e.course_id = $1
       ORDER BY e.enrolled_at DESC`,
      [course_id]
    )

    res.json({ success: true, enrollments: result.rows })
  } catch (err) {
    console.error("Get course enrollments error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function updateProgress(req, res) {
  try {
    const { student_id, course_id } = req.params
    const { progress } = req.body

    const completed = progress >= 100

    const result = await pool.query(
      `UPDATE enrollments SET progress = $1, completed = $2
       WHERE student_id = $3 AND course_id = $4
       RETURNING *`,
      [progress, completed, student_id, course_id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Enrollment not found" })
    }

    res.json({ success: true, enrollment: result.rows[0] })
  } catch (err) {
    console.error("Update progress error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function unenrollCourse(req, res) {
  try {
    const { student_id, course_id } = req.params

    const result = await pool.query(
      "DELETE FROM enrollments WHERE student_id = $1 AND course_id = $2 RETURNING *",
      [student_id, course_id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Enrollment not found" })
    }

    res.json({ success: true, message: "Unenrolled successfully" })
  } catch (err) {
    console.error("Unenroll error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}