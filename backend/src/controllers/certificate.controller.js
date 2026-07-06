import pool from "../config/db.js"
import PDFDocument from "pdfkit"

export async function generateCertificate(req, res) {
  try {
    const { student_id, course_id } = req.params

    const enrollCheck = await pool.query(
      "SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2 AND completed = true",
      [student_id, course_id]
    )

    if (enrollCheck.rows.length === 0) {
      return res.status(403).json({ success: false, message: "Course not completed yet" })
    }

    const studentRes = await pool.query("SELECT name, email FROM users WHERE id = $1", [student_id])
    const courseRes = await pool.query(
      `SELECT c.title, u.name as teacher_name FROM courses c
       JOIN users u ON c.teacher_id = u.id
       WHERE c.id = $1`,
      [course_id]
    )

    if (studentRes.rows.length === 0 || courseRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Student or course not found" })
    }

    const student = studentRes.rows[0]
    const course = courseRes.rows[0]
    const issueDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

    const doc = new PDFDocument({ size: "A4", layout: "landscape" })

    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", `attachment; filename=certificate-${student_id}-${course_id}.pdf`)

    doc.pipe(res)

    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f8f9ff")

    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
      .lineWidth(3)
      .stroke("#6c63ff")

    doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60)
      .lineWidth(1)
      .stroke("#6c63ff")

    doc.fontSize(48)
      .fillColor("#6c63ff")
      .font("Helvetica-Bold")
      .text("EduSmart", 0, 60, { align: "center" })

    doc.fontSize(14)
      .fillColor("#888")
      .font("Helvetica")
      .text("AI-Powered Learning Platform", 0, 115, { align: "center" })

    doc.moveTo(100, 145).lineTo(doc.page.width - 100, 145).stroke("#6c63ff")

    doc.fontSize(22)
      .fillColor("#1a1a2e")
      .font("Helvetica")
      .text("CERTIFICATE OF COMPLETION", 0, 160, { align: "center" })

    doc.fontSize(14)
      .fillColor("#666")
      .text("This is to certify that", 0, 210, { align: "center" })

    doc.fontSize(36)
      .fillColor("#1a1a2e")
      .font("Helvetica-Bold")
      .text(student.name, 0, 235, { align: "center" })

    doc.fontSize(14)
      .fillColor("#666")
      .font("Helvetica")
      .text("has successfully completed the course", 0, 285, { align: "center" })

    doc.fontSize(24)
      .fillColor("#6c63ff")
      .font("Helvetica-Bold")
      .text(course.title, 0, 310, { align: "center" })

    doc.fontSize(12)
      .fillColor("#888")
      .font("Helvetica")
      .text(`Instructor: ${course.teacher_name}`, 0, 355, { align: "center" })

    doc.moveTo(100, 380).lineTo(doc.page.width - 100, 380).stroke("#ddd")

    doc.fontSize(11)
      .fillColor("#aaa")
      .text(`Issue Date: ${issueDate}`, 100, 395)
      .text(`Certificate ID: EDU-${student_id}-${course_id}-${Date.now()}`, doc.page.width - 350, 395)

    doc.end()

    await pool.query(
      `INSERT INTO certificates (student_id, course_id) VALUES ($1, $2)
       ON CONFLICT (student_id, course_id) DO NOTHING`,
      [student_id, course_id]
    )

  } catch (err) {
    console.error("Certificate error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getStudentCertificates(req, res) {
  try {
    const { student_id } = req.params

    const result = await pool.query(
      `SELECT cert.*, c.title as course_title, u.name as teacher_name
       FROM certificates cert
       JOIN courses c ON cert.course_id = c.id
       JOIN users u ON c.teacher_id = u.id
       WHERE cert.student_id = $1
       ORDER BY cert.issued_at DESC`,
      [student_id]
    )

    res.json({ success: true, certificates: result.rows })
  } catch (err) {
    console.error("Get certificates error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}