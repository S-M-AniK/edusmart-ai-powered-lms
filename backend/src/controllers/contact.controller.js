import pool from "../config/db.js"

export async function createContact(req, res) {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email and message required" })
    }

    const result = await pool.query(
      "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    )

    res.status(201).json({ success: true, contact: result.rows[0] })
  } catch (err) {
    console.error("Create contact error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getContacts(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    )

    res.json({ success: true, contacts: result.rows })
  } catch (err) {
    console.error("Get contacts error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function deleteContact(req, res) {
  try {
    const { id } = req.params

    const result = await pool.query(
      "DELETE FROM contacts WHERE id = $1 RETURNING *",
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Contact not found" })
    }

    res.json({ success: true, message: "Contact deleted successfully" })
  } catch (err) {
    console.error("Delete contact error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}