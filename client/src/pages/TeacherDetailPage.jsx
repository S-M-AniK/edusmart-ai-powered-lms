import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import API from "../api/axios"
import { getTeacherCourses } from "../api/courses"

export default function TeacherDetailPage() {
  const { id } = useParams()
  const [teacher, setTeacher] = useState(null)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get(`/users/${id}`).then(res => { setTeacher(res.data.user); setLoading(false) }).catch(() => setLoading(false))
    getTeacherCourses(id).then(res => setCourses(res.data.courses)).catch(() => {})
  }, [id])

  if (loading) return <div style={{ textAlign: "center", padding: "100px", fontFamily: "sans-serif" }}>Loading...</div>
  if (!teacher) return <div style={{ textAlign: "center", padding: "100px", fontFamily: "sans-serif" }}>Teacher not found</div>

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

      <section style={{ background: "linear-gradient(135deg, #6c63ff, #3b37d4)", padding: "60px", textAlign: "center", color: "#fff" }}>
        <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>👨‍🏫</div>
        <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "8px" }}>{teacher.name}</h1>
        <p style={{ opacity: 0.9 }}>{teacher.email}</p>
      </section>

      <section style={{ padding: "60px", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "24px" }}>Courses by {teacher.name}</h2>
        {courses.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {courses.map(course => (
              <Link to={`/courses/${course.id}`} key={course.id} style={{ background: "#fff", borderRadius: "16px", textDecoration: "none", color: "#1a1a2e", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                <div style={{ height: "120px", background: "linear-gradient(135deg, #6c63ff, #3b37d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "40px" }}>📚</span>
                </div>
                <div style={{ padding: "16px" }}>
                  <div style={{ fontWeight: "700", marginBottom: "8px" }}>{course.title}</div>
                  <div style={{ color: "#6c63ff", fontWeight: "700" }}>৳{course.price}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>No courses yet</div>
        )}
      </section>

      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}