import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import API from "../api/axios"

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get("/users").then(res => {
      const t = res.data.users?.filter(u => u.role === "teacher") || []
      setTeachers(t)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ fontFamily: "sans-serif", color: "#1a1a2e" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 60px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <Link to="/" style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", textDecoration: "none" }}>Edu<span style={{ color: "#1a1a2e" }}>Smart</span></Link>
        <div style={{ display: "flex", gap: "28px", fontSize: "15px" }}>
          {[["Home", "/"], ["Courses", "/courses"], ["Teachers", "/teachers"], ["Blog", "/blog"], ["About", "/about"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={label} to={path} style={{ textDecoration: "none", color: path === "/teachers" ? "#6c63ff" : "#1a1a2e", fontWeight: path === "/teachers" ? "700" : "500" }}>{label}</Link>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/login" style={{ padding: "8px 20px", border: "2px solid #6c63ff", borderRadius: "8px", color: "#6c63ff", textDecoration: "none", fontWeight: "600" }}>Login</Link>
          <Link to="/register" style={{ padding: "8px 20px", background: "#6c63ff", borderRadius: "8px", color: "#fff", textDecoration: "none", fontWeight: "600" }}>Sign Up</Link>
        </div>
      </nav>

      <section style={{ background: "linear-gradient(135deg, #6c63ff, #3b37d4)", padding: "80px 60px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "800", marginBottom: "16px" }}>Our Teachers</h1>
        <p style={{ fontSize: "18px", opacity: 0.9 }}>Learn from the best industry professionals</p>
      </section>

      <section style={{ padding: "80px 60px", maxWidth: "1100px", margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>Loading teachers...</div>
        ) : teachers.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {teachers.map(teacher => (
              <Link to={`/teachers/${teacher.id}`} key={teacher.id} style={{ background: "#fff", borderRadius: "16px", textDecoration: "none", color: "#1a1a2e", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", padding: "32px", textAlign: "center", display: "block" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #6c63ff, #3b37d4)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>👨‍🏫</div>
                <div style={{ fontWeight: "700", fontSize: "18px", marginBottom: "4px" }}>{teacher.name}</div>
                <div style={{ color: "#6c63ff", fontSize: "14px", marginBottom: "8px" }}>{teacher.email}</div>
                <div style={{ color: "#888", fontSize: "13px" }}>Expert Instructor</div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>👨‍🏫</div>
            <div style={{ fontSize: "20px", fontWeight: "600" }}>No teachers found</div>
          </div>
        )}
      </section>

      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}