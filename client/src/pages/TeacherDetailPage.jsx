import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import API from "../api/axios"
import { getTeacherCourses } from "../api/courses"

const avatarColors = [
  "linear-gradient(135deg, #6c63ff, #3b37d4)",
  "linear-gradient(135deg, #f093fb, #f5576c)",
  "linear-gradient(135deg, #4facfe, #00f2fe)",
  "linear-gradient(135deg, #43e97b, #38f9d7)",
  "linear-gradient(135deg, #fa709a, #fee140)",
  "linear-gradient(135deg, #a18cd1, #fbc2eb)",
]

const teacherDetails = {
  2: { rating: 4.9, students: "2,400+", courses: 5, bio: "Sarah is a passionate web developer and educator with over 8 years of industry experience. She specializes in JavaScript, React, and modern web technologies." },
  5: { rating: 4.7, students: "980+", courses: 3, bio: "Arif is an expert backend developer with deep knowledge in Node.js, databases, and system architecture. He loves simplifying complex concepts." },
  6: { rating: 4.9, students: "3,100+", courses: 4, bio: "Rahim is a data scientist and machine learning enthusiast with a PhD in Computer Science. He makes AI accessible to everyone." },
  7: { rating: 4.6, students: "720+", courses: 2, bio: "Fatema is a UI/UX designer and frontend developer who believes great design changes lives. She has worked with top startups across Asia." },
  8: { rating: 4.5, students: "1,200+", courses: 6, bio: "Tanvir is an AI researcher and educator who has trained thousands of students in machine learning, deep learning, and data analysis." },
  9: { rating: 4.7, students: "500+", courses: 3, bio: "Mou is a cybersecurity expert with certifications in ethical hacking and network security. She makes security fun and approachable." },
}

export default function TeacherDetailPage() {
  const { id } = useParams()
  const [teacher, setTeacher] = useState(null)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get(`/users/teachers/${id}`).then(res => { setTeacher(res.data.teacher); setLoading(false) }).catch(() => setLoading(false))
    getTeacherCourses(id).then(res => setCourses(res.data.courses || [])).catch(() => {})
  }, [id])

  if (loading) return <div style={{ textAlign: "center", padding: "100px", fontFamily: "sans-serif" }}>Loading...</div>
  if (!teacher) return <div style={{ textAlign: "center", padding: "100px", fontFamily: "sans-serif" }}>Teacher not found</div>

  const details = teacherDetails[parseInt(id)] || { rating: 4.5, students: "500+", courses: 2, bio: "An experienced instructor passionate about teaching and helping students grow." }
  const colorIndex = (parseInt(id) - 1) % avatarColors.length

  return (
    <div style={{ fontFamily: "sans-serif", color: "#1a1a2e", background: "#f8f9ff", minHeight: "100vh" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 60px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <Link to="/" style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", textDecoration: "none" }}>Edu<span style={{ color: "#1a1a2e" }}>Smart</span></Link>
        <div style={{ display: "flex", gap: "28px", fontSize: "15px" }}>
          {[["Home", "/"], ["Courses", "/courses"], ["Teachers", "/teachers"], ["Blog", "/blog"], ["About", "/about"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={label} to={path} style={{ textDecoration: "none", color: "#1a1a2e", fontWeight: "500", transition: "color 0.2s" }}
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

      <section style={{ background: "linear-gradient(135deg, #1a1a2e, #2d1b69)", padding: "60px", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", alignItems: "center", gap: "48px" }}>
          <div style={{ width: "140px", height: "140px", borderRadius: "50%", background: avatarColors[colorIndex], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "56px", fontWeight: "800", color: "#fff", border: "4px solid rgba(255,255,255,0.3)", flexShrink: 0 }}>
            {teacher.name.charAt(0)}
          </div>
          <div>
            <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "8px" }}>{teacher.name}</h1>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "20px", fontSize: "15px" }}>{teacher.email}</p>
            <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.7, maxWidth: "600px", fontSize: "15px", marginBottom: "24px" }}>{details.bio}</p>
            <div style={{ display: "flex", gap: "32px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "800", color: "#ffd700" }}>{details.rating}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Rating</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "800", color: "#ffd700" }}>{details.students}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Students</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "800", color: "#ffd700" }}>{details.courses}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>Courses</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "32px" }}>Courses by {teacher.name}</h2>
        {courses.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {courses.map(course => (
              <Link to={`/courses/${course.id}`} key={course.id} style={{ background: "#fff", borderRadius: "16px", textDecoration: "none", color: "#1a1a2e", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden", transition: "transform 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ height: "140px", overflow: "hidden" }}>
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ height: "100%", background: avatarColors[colorIndex], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px" }}>📚</div>
                  )}
                </div>
                <div style={{ padding: "16px" }}>
                  <div style={{ fontSize: "12px", color: "#6c63ff", fontWeight: "600", marginBottom: "6px" }}>{course.category}</div>
                  <div style={{ fontWeight: "700", fontSize: "15px", marginBottom: "8px" }}>{course.title}</div>
                  <div style={{ color: "#6c63ff", fontWeight: "700", fontSize: "16px" }}>৳{course.price}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px", color: "#888", background: "#fff", borderRadius: "16px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📚</div>
            <div style={{ fontSize: "18px", fontWeight: "600" }}>No courses yet</div>
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