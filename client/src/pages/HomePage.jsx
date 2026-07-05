import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllCourses } from "../api/courses"
import { getBlogs } from "../api/blogs"

export default function HomePage() {
  const [courses, setCourses] = useState([])
  const [blogs, setBlogs] = useState([])
  const [stats, setStats] = useState({ courses: 0, teachers: 0, students: 0 })

  useEffect(() => {
    getAllCourses().then(res => setCourses(res.data.courses.slice(0, 6))).catch(() => {})
    getBlogs().then(res => setBlogs(res.data.blogs.slice(0, 3))).catch(() => {})
  }, [])

  const categories = [
    { name: "Web Development", icon: "🌐" },
    { name: "Mobile Development", icon: "📱" },
    { name: "UI/UX Design", icon: "🎨" },
    { name: "AI & Machine Learning", icon: "🤖" },
    { name: "Cyber Security", icon: "🔒" },
    { name: "Data Science", icon: "📊" },
  ]

  const faqs = [
    { q: "How do I enroll in a course?", a: "Simply create an account, browse courses, and click Enroll." },
    { q: "Can I get a certificate?", a: "Yes! Complete a course to receive your certificate." },
    { q: "Is there a free trial?", a: "Yes, many courses offer free preview lessons." },
    { q: "How do I become a teacher?", a: "Register as a teacher and start creating courses." },
  ]

  return (
    <div style={{ fontFamily: "sans-serif", color: "#1a1a2e" }}>

      {/* Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 60px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff" }}>Edu<span style={{ color: "#1a1a2e" }}>Smart</span></div>
        <div style={{ display: "flex", gap: "28px", fontSize: "15px", fontWeight: "500" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#1a1a2e" }}>Home</Link>
          <Link to="/courses" style={{ textDecoration: "none", color: "#1a1a2e" }}>Courses</Link>
          <Link to="/teachers" style={{ textDecoration: "none", color: "#1a1a2e" }}>Teachers</Link>
          <Link to="/blog" style={{ textDecoration: "none", color: "#1a1a2e" }}>Blog</Link>
          <Link to="/about" style={{ textDecoration: "none", color: "#1a1a2e" }}>About</Link>
          <Link to="/contact" style={{ textDecoration: "none", color: "#1a1a2e" }}>Contact</Link>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/login" style={{ padding: "8px 20px", border: "2px solid #6c63ff", borderRadius: "8px", color: "#6c63ff", textDecoration: "none", fontWeight: "600" }}>Login</Link>
          <Link to="/register" style={{ padding: "8px 20px", background: "#6c63ff", borderRadius: "8px", color: "#fff", textDecoration: "none", fontWeight: "600" }}>Sign Up</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #6c63ff 0%, #3b37d4 100%)", color: "#fff", padding: "100px 60px", textAlign: "center" }}>
        <h1 style={{ fontSize: "56px", fontWeight: "800", marginBottom: "20px", lineHeight: 1.2 }}>Learn Smarter with <br /><span style={{ color: "#ffd700" }}>AI-Powered</span> Education</h1>
        <p style={{ fontSize: "20px", marginBottom: "40px", opacity: 0.9 }}>Join thousands of students learning from expert teachers with personalized AI assistance.</p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <Link to="/courses" style={{ padding: "16px 40px", background: "#ffd700", color: "#1a1a2e", borderRadius: "12px", textDecoration: "none", fontWeight: "700", fontSize: "18px" }}>Explore Courses</Link>
          <Link to="/register" style={{ padding: "16px 40px", background: "rgba(255,255,255,0.2)", color: "#fff", borderRadius: "12px", textDecoration: "none", fontWeight: "700", fontSize: "18px", border: "2px solid rgba(255,255,255,0.5)" }}>Get Started Free</Link>
        </div>
        <div style={{ display: "flex", gap: "60px", justifyContent: "center", marginTop: "60px" }}>
          {[["10,000+", "Students"], ["500+", "Courses"], ["100+", "Teachers"], ["95%", "Satisfaction"]].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontSize: "36px", fontWeight: "800" }}>{num}</div>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "80px 60px", background: "#f8f9ff", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px" }}>Browse Categories</h2>
        <p style={{ color: "#666", marginBottom: "48px" }}>Explore our wide range of course categories</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "900px", margin: "0 auto" }}>
          {categories.map(cat => (
            <Link to={`/courses?category=${cat.name}`} key={cat.name} style={{ background: "#fff", padding: "32px", borderRadius: "16px", textDecoration: "none", color: "#1a1a2e", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", transition: "transform 0.2s", display: "block" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>{cat.icon}</div>
              <div style={{ fontWeight: "600", fontSize: "16px" }}>{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section style={{ padding: "80px 60px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px" }}>Featured Courses</h2>
        <p style={{ color: "#666", marginBottom: "48px" }}>Learn from our most popular courses</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
          {courses.length > 0 ? courses.map(course => (
            <Link to={`/courses/${course.id}`} key={course.id} style={{ background: "#fff", borderRadius: "16px", textDecoration: "none", color: "#1a1a2e", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden", display: "block" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ height: "160px", background: "linear-gradient(135deg, #6c63ff, #3b37d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "48px" }}>📚</span>
              </div>
              <div style={{ padding: "20px", textAlign: "left" }}>
                <div style={{ fontSize: "12px", color: "#6c63ff", fontWeight: "600", marginBottom: "8px" }}>{course.category}</div>
                <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "8px" }}>{course.title}</div>
                <div style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>by {course.teacher_name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#f59e0b" }}>⭐ 4.5</span>
                  <span style={{ fontWeight: "700", color: "#6c63ff" }}>৳{course.price}</span>
                </div>
              </div>
            </Link>
          )) : (
            <div style={{ gridColumn: "1/-1", color: "#888", padding: "40px" }}>No courses available yet</div>
          )}
        </div>
        <Link to="/courses" style={{ display: "inline-block", marginTop: "40px", padding: "14px 36px", background: "#6c63ff", color: "#fff", borderRadius: "10px", textDecoration: "none", fontWeight: "600" }}>View All Courses</Link>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "80px 60px", background: "#f8f9ff", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px" }}>Why Choose EduSmart?</h2>
        <p style={{ color: "#666", marginBottom: "48px" }}>We provide the best learning experience</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
          {[["🎓", "Expert Teachers", "Learn from industry professionals"], ["⏰", "Flexible Learning", "Study at your own pace"], ["📜", "Certification", "Get recognized certificates"], ["🤖", "AI Assistant", "Personalized learning support"]].map(([icon, title, desc]) => (
            <div key={title} style={{ background: "#fff", padding: "32px 24px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>{icon}</div>
              <div style={{ fontWeight: "700", fontSize: "18px", marginBottom: "8px" }}>{title}</div>
              <div style={{ color: "#888", fontSize: "14px" }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section style={{ padding: "80px 60px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px" }}>Latest Blogs</h2>
        <p style={{ color: "#666", marginBottom: "48px" }}>Stay updated with our latest articles</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
          {blogs.length > 0 ? blogs.map(blog => (
            <div key={blog.id} style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden", textAlign: "left" }}>
              <div style={{ height: "160px", background: "linear-gradient(135deg, #f093fb, #f5576c)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "48px" }}>📝</span>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "8px" }}>{blog.title}</div>
                <div style={{ fontSize: "13px", color: "#888" }}>by {blog.author_name}</div>
              </div>
            </div>
          )) : (
            <div style={{ gridColumn: "1/-1", color: "#888", padding: "40px" }}>No blogs yet</div>
          )}
        </div>
        <Link to="/blog" style={{ display: "inline-block", marginTop: "40px", padding: "14px 36px", background: "#6c63ff", color: "#fff", borderRadius: "10px", textDecoration: "none", fontWeight: "600" }}>View All Blogs</Link>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 60px", background: "#f8f9ff" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px", textAlign: "center" }}>Frequently Asked Questions</h2>
        <p style={{ color: "#666", marginBottom: "48px", textAlign: "center" }}>Got questions? We have answers</p>
        <div style={{ maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: "80px 60px", background: "linear-gradient(135deg, #6c63ff, #3b37d4)", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px" }}>Stay Updated</h2>
        <p style={{ marginBottom: "32px", opacity: 0.9 }}>Subscribe to our newsletter for the latest courses and updates</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", maxWidth: "500px", margin: "0 auto" }}>
          <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: "14px 20px", borderRadius: "10px", border: "none", fontSize: "16px" }} />
          <button style={{ padding: "14px 28px", background: "#ffd700", color: "#1a1a2e", borderRadius: "10px", border: "none", fontWeight: "700", cursor: "pointer", fontSize: "16px" }}>Subscribe</button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginBottom: "24px" }}>
          <Link to="/about" style={{ color: "#aaa", textDecoration: "none" }}>About</Link>
          <Link to="/courses" style={{ color: "#aaa", textDecoration: "none" }}>Courses</Link>
          <Link to="/blog" style={{ color: "#aaa", textDecoration: "none" }}>Blog</Link>
          <Link to="/contact" style={{ color: "#aaa", textDecoration: "none" }}>Contact</Link>
        </div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", textAlign: "left", fontWeight: "600", fontSize: "16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {q} <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && <div style={{ padding: "0 24px 20px", color: "#666" }}>{a}</div>}
    </div>
  )
}