import pool from "../config/db.js"

export async function getCourses(req, res) {
  try {
    const result = await pool.query(
      `SELECT c.*, u.name as teacher_name
       FROM courses c
       LEFT JOIN users u ON c.teacher_id = u.id
       ORDER BY c.created_at DESC`
    )
    res.json({ success: true, courses: result.rows })
  } catch (err) {
    console.error("Get courses error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getCourseById(req, res) {
  try {
    const { id } = req.params
    const result = await pool.query(
      `SELECT c.*, u.name as teacher_name
       FROM courses c
       LEFT JOIN users u ON c.teacher_id = u.id
       WHERE c.id = $1`,
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Course not found" })
    }
    res.json({ success: true, course: result.rows[0] })
  } catch (err) {
    console.error("Get course error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function createCourse(req, res) {
  try {
    const { title, description, category, price, teacher_id, thumbnail, duration, level, language, requirements, what_you_learn } = req.body

    if (!title) {
      return res.status(400).json({ success: false, message: "Course title is required" })
    }

    const result = await pool.query(
      `INSERT INTO courses 
        (title, description, category, price, teacher_id, status, thumbnail, duration, level, language, requirements, what_you_learn) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
       RETURNING *`,
      [title, description, category, price || 0, teacher_id || null, "pending", thumbnail || null, duration || null, level || "beginner", language || "English", requirements || null, what_you_learn || null]
    )

    res.status(201).json({ success: true, course: result.rows[0] })
  } catch (err) {
    console.error("Create course error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function updateCourse(req, res) {
  try {
    const { id } = req.params
    const { title, description, category, price, thumbnail, duration, level, language, requirements, what_you_learn } = req.body

    const result = await pool.query(
      `UPDATE courses SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        category = COALESCE($3, category),
        price = COALESCE($4, price),
        thumbnail = COALESCE($5, thumbnail),
        duration = COALESCE($6, duration),
        level = COALESCE($7, level),
        language = COALESCE($8, language),
        requirements = COALESCE($9, requirements),
        what_you_learn = COALESCE($10, what_you_learn),
        updated_at = NOW()
       WHERE id = $11
       RETURNING *`,
      [title, description, category, price, thumbnail, duration, level, language, requirements, what_you_learn, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Course not found" })
    }

    res.json({ success: true, course: result.rows[0] })
  } catch (err) {
    console.error("Update course error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function updateCourseStatus(req, res) {
  try {
    const { id } = req.params
    const { status } = req.body

    const result = await pool.query(
      "UPDATE courses SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [status, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Course not found" })
    }

    res.json({ success: true, course: result.rows[0] })
  } catch (err) {
    console.error("Update course status error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function deleteCourse(req, res) {
  try {
    const { id } = req.params
    const result = await pool.query("DELETE FROM courses WHERE id = $1 RETURNING *", [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Course not found" })
    }

    res.json({ success: true, message: "Course deleted successfully" })
  } catch (err) {
    console.error("Delete course error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getTeacherCourses(req, res) {
  try {
    const { teacher_id } = req.params
    const result = await pool.query(
      `SELECT c.*, u.name as teacher_name
       FROM courses c
       LEFT JOIN users u ON c.teacher_id = u.id
       WHERE c.teacher_id = $1
       ORDER BY c.created_at DESC`,
      [teacher_id]
    )
    res.json({ success: true, courses: result.rows })
  } catch (err) {
    console.error("Get teacher courses error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}