import pool from "../config/db.js"

export async function getAdminAnalytics(req, res) {
  try {
    const totalUsers = await pool.query("SELECT COUNT(*) FROM users")
    const totalCourses = await pool.query("SELECT COUNT(*) FROM courses")
    const totalEnrollments = await pool.query("SELECT COUNT(*) FROM enrollments")
    const totalBlogs = await pool.query("SELECT COUNT(*) FROM blogs")
    const totalContacts = await pool.query("SELECT COUNT(*) FROM contacts")
    const pendingCourses = await pool.query("SELECT COUNT(*) FROM courses WHERE status = 'pending'")
    const pendingReviews = await pool.query("SELECT COUNT(*) FROM reviews WHERE approved = false")

    const recentEnrollments = await pool.query(
      `SELECT e.*, u.name as student_name, c.title as course_title
       FROM enrollments e
       JOIN users u ON e.student_id = u.id
       JOIN courses c ON e.course_id = c.id
       ORDER BY e.enrolled_at DESC
       LIMIT 5`
    )

    const coursesByCategory = await pool.query(
      `SELECT category, COUNT(*) as count
       FROM courses
       GROUP BY category
       ORDER BY count DESC`
    )

    const usersByRole = await pool.query(
      `SELECT role, COUNT(*) as count
       FROM users
       GROUP BY role`
    )

    res.json({
      success: true,
      analytics: {
        totalUsers: parseInt(totalUsers.rows[0].count),
        totalCourses: parseInt(totalCourses.rows[0].count),
        totalEnrollments: parseInt(totalEnrollments.rows[0].count),
        totalBlogs: parseInt(totalBlogs.rows[0].count),
        totalContacts: parseInt(totalContacts.rows[0].count),
        pendingCourses: parseInt(pendingCourses.rows[0].count),
        pendingReviews: parseInt(pendingReviews.rows[0].count),
        recentEnrollments: recentEnrollments.rows,
        coursesByCategory: coursesByCategory.rows,
        usersByRole: usersByRole.rows
      }
    })
  } catch (err) {
    console.error("Admin analytics error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getTeacherAnalytics(req, res) {
  try {
    const { teacher_id } = req.params

    const totalCourses = await pool.query(
      "SELECT COUNT(*) FROM courses WHERE teacher_id = $1",
      [teacher_id]
    )

    const totalEnrollments = await pool.query(
      `SELECT COUNT(*) FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       WHERE c.teacher_id = $1`,
      [teacher_id]
    )

    const totalReviews = await pool.query(
      `SELECT COUNT(*) FROM reviews r
       JOIN courses c ON r.course_id = c.id
       WHERE c.teacher_id = $1`,
      [teacher_id]
    )

    const avgRating = await pool.query(
      `SELECT ROUND(AVG(r.rating), 1) as avg_rating
       FROM reviews r
       JOIN courses c ON r.course_id = c.id
       WHERE c.teacher_id = $1 AND r.approved = true`,
      [teacher_id]
    )

    const courseStats = await pool.query(
      `SELECT c.title, c.status, COUNT(e.id) as enrollments
       FROM courses c
       LEFT JOIN enrollments e ON c.id = e.course_id
       WHERE c.teacher_id = $1
       GROUP BY c.id, c.title, c.status
       ORDER BY enrollments DESC`,
      [teacher_id]
    )

    res.json({
      success: true,
      analytics: {
        totalCourses: parseInt(totalCourses.rows[0].count),
        totalEnrollments: parseInt(totalEnrollments.rows[0].count),
        totalReviews: parseInt(totalReviews.rows[0].count),
        avgRating: avgRating.rows[0].avg_rating || 0,
        courseStats: courseStats.rows
      }
    })
  } catch (err) {
    console.error("Teacher analytics error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

export async function getStudentAnalytics(req, res) {
  try {
    const { student_id } = req.params

    const totalEnrollments = await pool.query(
      "SELECT COUNT(*) FROM enrollments WHERE student_id = $1",
      [student_id]
    )

    const completedCourses = await pool.query(
      "SELECT COUNT(*) FROM enrollments WHERE student_id = $1 AND completed = true",
      [student_id]
    )

    const totalWishlist = await pool.query(
      "SELECT COUNT(*) FROM wishlist WHERE student_id = $1",
      [student_id]
    )

    const avgProgress = await pool.query(
      "SELECT ROUND(AVG(progress), 1) as avg_progress FROM enrollments WHERE student_id = $1",
      [student_id]
    )

    res.json({
      success: true,
      analytics: {
        totalEnrollments: parseInt(totalEnrollments.rows[0].count),
        completedCourses: parseInt(completedCourses.rows[0].count),
        totalWishlist: parseInt(totalWishlist.rows[0].count),
        avgProgress: avgProgress.rows[0].avg_progress || 0
      }
    })
  } catch (err) {
    console.error("Student analytics error:", err)
    res.status(500).json({ success: false, message: "Server error" })
  }
}