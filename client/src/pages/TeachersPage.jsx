import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import API from "../api/axios"

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

function AnimatedSection({ children, className = "" }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`${inView ? "animate-fadeInUp" : "opacity-0"} ${className}`}>
      {children}
    </div>
  )
}

const avatarColors = [
  "linear-gradient(135deg, #6c63ff, #3b37d4)",
  "linear-gradient(135deg, #f093fb, #f5576c)",
  "linear-gradient(135deg, #4facfe, #00f2fe)",
  "linear-gradient(135deg, #43e97b, #38f9d7)",
  "linear-gradient(135deg, #fa709a, #fee140)",
  "linear-gradient(135deg, #a18cd1, #fbc2eb)",
]

const teacherDetails = {
  5: { rating: 4.7, students: "980+" },
  6: { rating: 4.9, students: "3,100+" },
  7: { rating: 4.6, students: "720+" },
  8: { rating: 4.5, students: "1,200+" },
  9: { rating: 4.7, students: "500+" },
  2: { rating: 4.9, students: "2,400+" },
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get("/users/teachers/").then(res => {
      setTeachers(res.data.teachers || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ fontFamily: "sans-serif", color: "#1a1a2e", background: "#f8f9ff", minHeight: "100vh" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 60px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <Link to="/" style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", textDecoration: "none" }}>Edu<span style={{ color: "#1a1a2e" }}>Smart</span></Link>
        <div style={{ display: "flex", gap: "28px", fontSize: "15px" }}>
          {[["Home", "/"], ["Courses", "/courses"], ["Teachers", "/teachers"], ["Blog", "/blog"], ["About", "/about"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={label} to={path} style={{ textDecoration: "none", color: path === "/teachers" ? "#6c63ff" : "#1a1a2e", fontWeight: path === "/teachers" ? "700" : "500", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#6c63ff"}
              onMouseLeave={e => e.currentTarget.style.color = path === "/teachers" ? "#6c63ff" : "#1a1a2e"}>
              {label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/login" style={{ padding: "8px 20px", border: "2px solid #6c63ff", borderRadius: "8px", color: "#6c63ff", textDecoration: "none", fontWeight: "600" }}>Login</Link>
          <Link to="/register" style={{ padding: "8px 20px", background: "#6c63ff", borderRadius: "8px", color: "#fff", textDecoration: "none", fontWeight: "600" }}>Sign Up</Link>
        </div>
      </nav>

      <section style={{ background: "linear-gradient(135deg, #1a1a2e, #2d1b69)", padding: "80px 60px", textAlign: "center", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20px", left: "10%", width: "12px", height: "12px", background: "#f97316", borderRadius: "3px", transform: "rotate(45deg)" }}></div>
        <div style={{ position: "absolute", bottom: "30px", right: "15%", width: "8px", height: "8px", background: "#06b6d4", borderRadius: "3px", transform: "rotate(45deg)" }}></div>
        <div style={{ position: "absolute", top: "40px", right: "25%", fontSize: "16px", color: "#fbbf24" }}>★</div>
        <h1 style={{ fontSize: "52px", fontWeight: "800", marginBottom: "16px" }}>Meet Our Instructors</h1>
        <p style={{ fontSize: "18px", opacity: 0.8, maxWidth: "500px", margin: "0 auto" }}>Learn from experienced professionals who are passionate about teaching.</p>
      </section>

      <section style={{ padding: "80px 60px", maxWidth: "1200px", margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>Loading teachers...</div>
        ) : teachers.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
            {teachers.map((teacher, i) => (
              <AnimatedSection key={teacher.id}>
                <Link to={`/teachers/${teacher.id}`} style={{ textDecoration: "none", color: "#1a1a2e", display: "block" }}>
                  <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(108,99,255,0.15)" }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)" }}>
                    <div style={{ height: "120px", background: avatarColors[i % avatarColors.length], display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", fontWeight: "800", color: "#fff" }}>
                        {teacher.name.charAt(0)}
                      </div>
                    </div>
                    <div style={{ padding: "24px", textAlign: "center" }}>
                      <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "6px" }}>{teacher.name}</h3>
                      <p style={{ color: "#6c63ff", fontSize: "13px", marginBottom: "12px" }}>Expert Instructor</p>
                      <div style={{ display: "flex", justifyContent: "center", gap: "16px", fontSize: "13px", color: "#888", marginBottom: "16px" }}>
                        <span>⭐ {teacherDetails[teacher.id]?.rating || 4.5}</span>
                        <span>👥 {teacherDetails[teacher.id]?.students || "500+"} students</span>
                      </div>
                      <div style={{ padding: "8px 20px", background: "#6c63ff", color: "#fff", borderRadius: "20px", fontSize: "13px", fontWeight: "600", display: "inline-block" }}>View Profile</div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
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