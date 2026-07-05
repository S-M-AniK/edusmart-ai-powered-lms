import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { getCourseById } from "../api/courses"
import { getCourseReviews } from "../api/reviews"

export default function CourseDetailPage() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCourseById(id).then(res => { setCourse(res.data.course); setLoading(false) }).catch(() => setLoading(false))
    getCourseReviews(id).then(res => setReviews(res.data.reviews)).catch(() => {})
  }, [id])

  if (loading) return <div style={{ textAlign: "center", padding: "100px", fontFamily: "sans-serif" }}>Loading...</div>
  if (!course) return <div style={{ textAlign: "center", padding: "100px", fontFamily: "sans-serif" }}>Course not found</div>

  return (
    <div style={{ fontFamily: "sans-serif", color: "#1a1a2e" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 60px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <Link to="/" style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", textDecoration: "none" }}>Edu<span style={{ color: "#1a1a2e" }}>Smart</span></Link>
        <div style={{ display: "flex", gap: "28px", fontSize: "15px" }}>
          {[["Home", "/"], ["Courses", "/courses"], ["Teachers", "/teachers"], ["Blog", "/blog"], ["About", "/about"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={label} to={path} style={{ textDecoration: "none", color: "#1a1a2e", fontWeight: "500" }}>{label}</Link>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/login" style={{ padding: "8px 20px", border: "2px solid #6c63ff", borderRadius: "8px", color: "#6c63ff", textDecoration: "none", fontWeight: "600" }}>Login</Link>
          <Link to="/register" style={{ padding: "8px 20px", background: "#6c63ff", borderRadius: "8px", color: "#fff", textDecoration: "none", fontWeight: "600" }}>Sign Up</Link>
        </div>
      </nav>

      <section style={{ background: "linear-gradient(135deg, #6c63ff, #3b37d4)", padding: "60px", color: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ fontSize: "14px", marginBottom: "12px", opacity: 0.8 }}>{course.category} • {course.level}</div>
          <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "16px" }}>{course.title}</h1>
          <p style={{ fontSize: "18px", opacity: 0.9, marginBottom: "24px" }}>{course.description}</p>
          <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
            <span>👨‍🏫 {course.teacher_name}</span>
            <span>⭐ 4.5 ({reviews.length} reviews)</span>
            <span>⏱ {course.duration || "Self-paced"}</span>
            <span>🌐 {course.language}</span>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px", maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 320px", gap: "40px" }}>
        <div>
          {course.what_you_learn && (
            <div style={{ background: "#f8f9ff", padding: "32px", borderRadius: "16px", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "16px" }}>What You'll Learn</h2>
              <p style={{ color: "#666", lineHeight: 1.7 }}>{course.what_you_learn}</p>
            </div>
          )}
          {course.requirements && (
            <div style={{ background: "#fff", padding: "32px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "16px" }}>Requirements</h2>
              <p style={{ color: "#666", lineHeight: 1.7 }}>{course.requirements}</p>
            </div>
          )}
          {reviews.length > 0 && (
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "16px" }}>Student Reviews</h2>
              {reviews.map(review => (
                <div key={review.id} style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontWeight: "700" }}>{review.student_name}</span>
                    <span style={{ color: "#f59e0b" }}>{"⭐".repeat(review.rating)}</span>
                  </div>
                  <p style={{ color: "#666" }}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ position: "sticky", top: "90px", height: "fit-content" }}>
          <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 8px 40px rgba(0,0,0,0.12)", overflow: "hidden" }}>
            <div style={{ height: "180px", background: "linear-gradient(135deg, #6c63ff, #3b37d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "64px" }}>📚</span>
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ fontSize: "36px", fontWeight: "800", color: "#6c63ff", marginBottom: "20px" }}>৳{course.price}</div>
              <Link to="/register" style={{ display: "block", padding: "16px", background: "#6c63ff", color: "#fff", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "16px", textAlign: "center", marginBottom: "12px" }}>
                Enroll Now
              </Link>
              <Link to="/login" style={{ display: "block", padding: "16px", border: "2px solid #6c63ff", color: "#6c63ff", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "16px", textAlign: "center" }}>
                Login to Enroll
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}