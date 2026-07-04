import bcrypt from "bcryptjs"
import pool from "./config/db.js"
import dotenv from "dotenv"

dotenv.config()

async function seedAdmin() {
  try {
    const existingAdmin = await pool.query(
      "SELECT id FROM users WHERE role = 'admin'"
    )

    if (existingAdmin.rows.length > 0) {
      console.log("Admin account already exists, skipping...")
      process.exit(0)
    }

    const hashedPassword = await bcrypt.hash("admin123", 10)

    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      ["Admin", "admin@edusmart.com", hashedPassword, "admin"]
    )

    console.log("✅ Admin account created successfully!")
    console.log("Email: admin@edusmart.com")
    console.log("Password: admin123")
    console.log("User:", result.rows[0])

    process.exit(0)
  } catch (err) {
    console.error("Seed error:", err)
    process.exit(1)
  }
}

seedAdmin()