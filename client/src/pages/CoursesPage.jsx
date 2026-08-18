import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { getAllCourses } from "../api/courses"

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

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(true)

  const categories = ["All", "Web Development", "Mobile Development", "UI/UX Design", "AI & Machine Learning", "Cyber Security", "Data Science"]

  useEffect(() => {
    getAllCourses().then(res => { setCourses(res.data.courses); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtered = courses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = !category || category === "All" || c.category === category
    return matchSearch && matchCat
  })

  return (
    <div style={{ fontFamily: "sans-serif", color: "#1a1a2e" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 60px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <Link to="/" className="animate-fadeInLeft" style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", textDecoration: "none" }}>Edu<span style={{ color: "#1a1a2e" }}>Smart</span></Link>
        <div style={{ display: "flex", gap: "28px", fontSize: "15px" }}>
          {[["Home", "/"], ["Courses", "/courses"], ["Teachers", "/teachers"], ["Blog", "/blog"], ["About", "/about"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={label} to={path} style={{ textDecoration: "none", color: path === "/courses" ? "#6c63ff" : "#1a1a2e", fontWeight: path === "/courses" ? "700" : "500", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#6c63ff"}
              onMouseLeave={e => e.currentTarget.style.color = path === "/courses" ? "#6c63ff" : "#1a1a2e"}>
              {label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/login" className="btn-hover" style={{ padding: "8px 20px", border: "2px solid #6c63ff", borderRadius: "8px", color: "#6c63ff", textDecoration: "none", fontWeight: "600" }}>Login</Link>
          <Link to="/register" className="btn-hover" style={{ padding: "8px 20px", background: "#6c63ff", borderRadius: "8px", color: "#fff", textDecoration: "none", fontWeight: "600" }}>Sign Up</Link>
        </div>
      </nav>

      <section style={{ background: "linear-gradient(135deg, #6c63ff, #3b37d4)", padding: "60px", textAlign: "center", color: "#fff" }}>
        <h1 className="animate-fadeInUp" style={{ fontSize: "48px", fontWeight: "800", marginBottom: "24px" }}>All Courses</h1>
        <div className="animate-fadeInUp delay-2">
          <input type="text" placeholder="🔍 Search courses..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding: "14px 24px", borderRadius: "12px", border: "none", fontSize: "16px", width: "400px", outline: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
        </div>
      </section>

      <section style={{ padding: "40px 60px" }}>
        <AnimatedSection>
          <div style={{ display: "flex", gap: "12px", marginBottom: "40px", flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} className="btn-hover"
                style={{ padding: "10px 20px", borderRadius: "25px", border: "2px solid #6c63ff", background: category === cat ? "#6c63ff" : "#fff", color: category === cat ? "#fff" : "#6c63ff", cursor: "pointer", fontWeight: "600", fontSize: "14px", transition: "all 0.2s" }}>
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
            <div className="animate-float" style={{ fontSize: "48px", marginBottom: "16px" }}>📚</div>
            Loading courses...
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {filtered.length > 0 ? filtered.map((course, i) => (
              <AnimatedSection key={course.id} className={`delay-${(i % 3) + 1}`}>
                <Link to={`/courses/${course.id}`} className="card-hover" style={{ background: "#fff", borderRadius: "16px", textDecoration: "none", color: "#1a1a2e", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden", display: "block" }}>
                  <div style={{ height: "160px", overflow: "hidden" }}>
  {course.thumbnail ? (
    <img src={course.thumbnail} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  ) : (
    <div style={{ height: "100%", background: "linear-gradient(135deg, #6c63ff, #3b37d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span className="animate-float" style={{ fontSize: "48px" }}>📚</span>
    </div>
  )}
</div>
                  <div style={{ padding: "20px" }}>
                    <div style={{ fontSize: "12px", color: "#6c63ff", fontWeight: "600", marginBottom: "8px" }}>{course.category}</div>
                    <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "8px" }}>{course.title}</div>
                    <div style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>by {course.teacher_name}</div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#f59e0b" }}>⭐ 4.5</span>
                      <span style={{ fontWeight: "700", color: "#6c63ff" }}>৳{course.price}</span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            )) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px", color: "#888" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
                No courses found
              </div>
            )}
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