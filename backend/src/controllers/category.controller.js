import pool from "../config/db.js"

export async function getCategories(req, res) {
  try {
    const result = await pool.query(
      `SELECT c.*, COUNT(co.id) as course_count
       FROM categories c
       LEFT JOIN courses co ON co.category = c.name
       GROUP BY c.id
       ORDER BY c.name ASC`
    )
    res.json({ success: true, categories: result.rows })
  } catch (err) {
    console.error("Get categories error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function createCategory(req, res) {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ success: false, message: "Name is required" })

    const result = await pool.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [name]
    )
    res.status(201).json({ success: true, category: result.rows[0] })
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ success: false, message: "Category already exists" })
    }
    console.error("Create category error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function updateCategory(req, res) {
  try {
    const { id } = req.params
    const { name } = req.body

    const result = await pool.query(
      "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Category not found" })
    }

    res.json({ success: true, category: result.rows[0] })
  } catch (err) {
    console.error("Update category error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params

    const result = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Category not found" })
    }

    res.json({ success: true, message: "Category deleted successfully" })
  } catch (err) {
    console.error("Delete category error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}