import pool from "../config/db.js"

export async function createBlog(req, res) {
  try {
    const { author_id, title, content, cover_image } = req.body

    if (!author_id || !title || !content) {
      return res.status(400).json({ success: false, message: "Author ID, title and content required" })
    }

    const result = await pool.query(
      "INSERT INTO blogs (author_id, title, content, cover_image) VALUES ($1, $2, $3, $4) RETURNING *",
      [author_id, title, content, cover_image || null]
    )

    res.status(201).json({ success: true, blog: result.rows[0] })
  } catch (err) {
    console.error("Create blog error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getBlogs(req, res) {
  try {
    const result = await pool.query(
      `SELECT b.*, u.name as author_name
       FROM blogs b
       JOIN users u ON b.author_id = u.id
       WHERE b.published = true
       ORDER BY b.created_at DESC`
    )

    res.json({ success: true, blogs: result.rows })
  } catch (err) {
    console.error("Get blogs error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getAllBlogs(req, res) {
  try {
    const result = await pool.query(
      `SELECT b.*, u.name as author_name
       FROM blogs b
       JOIN users u ON b.author_id = u.id
       ORDER BY b.created_at DESC`
    )

    res.json({ success: true, blogs: result.rows })
  } catch (err) {
    console.error("Get all blogs error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getBlogById(req, res) {
  try {
    const { id } = req.params

    const result = await pool.query(
      `SELECT b.*, u.name as author_name
       FROM blogs b
       JOIN users u ON b.author_id = u.id
       WHERE b.id = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Blog not found" })
    }

    res.json({ success: true, blog: result.rows[0] })
  } catch (err) {
    console.error("Get blog error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function updateBlog(req, res) {
  try {
    const { id } = req.params
    const { title, content, cover_image, published } = req.body

    const result = await pool.query(
      `UPDATE blogs SET
        title = COALESCE($1, title),
        content = COALESCE($2, content),
        cover_image = COALESCE($3, cover_image),
        published = COALESCE($4, published),
        updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [title, content, cover_image, published, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Blog not found" })
    }

    res.json({ success: true, blog: result.rows[0] })
  } catch (err) {
    console.error("Update blog error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function deleteBlog(req, res) {
  try {
    const { id } = req.params

    const result = await pool.query(
      "DELETE FROM blogs WHERE id = $1 RETURNING *",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Blog not found" })
    }

    res.json({ success: true, message: "Blog deleted successfully" })
  } catch (err) {
    console.error("Delete blog error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}