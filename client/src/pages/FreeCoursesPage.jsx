import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllCourses } from "../api/courses"

export default function FreeCoursesPage() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getAllCourses().then(res => {
      const free = res.data.courses.filter(c => c.price == 0 || c.price === "0" || c.price === null)
      setCourses(free)
    }).catch(() => {})
  }, [])

  const fallback = [
    { id: 1, title: "HTML & CSS Basics", teacher_name: "Sarah Khan", thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400", category: "Web Development" },
    { id: 2, title: "Intro to Python", teacher_name: "Rahim Uddin", thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400", category: "Programming" },
    { id: 3, title: "Git for Beginners", teacher_name: "Tanvir Ahmed", thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400", category: "DevOps" },
  ]

  const display = courses.length > 0 ? courses : fallback

  return (
    <div style={{ fontFamily: "sans-serif", color: "#1a1a2e" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 60px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <Link to="/" style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", textDecoration: "none" }}>Edu<span style={{ color: "#1a1a2e" }}>Smart</span></Link>
        <div style={{ display: "flex", gap: "28px", fontSize: "15px", fontWeight: "500" }}>
          {[["Home", "/"], ["Courses", "/courses"], ["Teachers", "/teachers"], ["Blog", "/blog"], ["About", "/about"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={label} to={path} style={{ textDecoration: "none", color: "#1a1a2e", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#6c63ff"}
              onMouseLeave={e => e.currentTarget.style.color = "#1a1a2e"}>
              {label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/login" style={{ padding: "8px 20px", border: "2px solid #6c63ff", borderRadius: "8px", color: "#6c63ff", textDecoration: "none", fontWeight: "600" }}>Login</Link>
          <Link to="/register" style={{ padding: "8px 20px", background: "#6c63ff", borderRadius: "8px", color: "#fff", textDecoration: "none", fontWeight: "600" }}>Sign Up</Link>
        </div>
      </nav>

      <section style={{ background: "linear-gradient(135deg, #6c63ff, #3b37d4)", padding: "60px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "12px" }}>Free Courses</h1>
        <p style={{ fontSize: "16px", opacity: 0.9 }}>Start learning today — completely free!</p>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {display.map((course, i) => (
            <Link to="/register"  key={i} style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden", textDecoration: "none", color: "#1a1a2e", border: "1px solid #eee" }}>
              <div style={{ height: "160px", overflow: "hidden" }}>
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ height: "100%", background: "linear-gradient(135deg, #6c63ff, #3b37d4)" }}></div>
                )}
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ fontSize: "12px", color: "#6c63ff", fontWeight: "600", marginBottom: "8px" }}>{course.category}</div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px" }}>{course.title}</h3>
                <p style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>by {course.teacher_name}</p>
                <span style={{ background: "#e8f5e9", color: "#2e7d32", fontWeight: "700", padding: "4px 12px", borderRadius: "20px", fontSize: "13px" }}>FREE</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}