import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { getAllCourses } from "../api/courses"
import { getBlogs } from "../api/blogs"

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

export default function HomePage() {
  const [courses, setCourses] = useState([])
  const [blogs, setBlogs] = useState([])

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
        <div className="animate-fadeInLeft" style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff" }}>Edu<span style={{ color: "#1a1a2e" }}>Smart</span></div>
        <div style={{ display: "flex", gap: "28px", fontSize: "15px", fontWeight: "500" }}>
          {[["Home", "/"], ["Courses", "/courses"], ["Teachers", "/teachers"], ["Blog", "/blog"], ["About", "/about"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={label} to={path} style={{ textDecoration: "none", color: "#1a1a2e", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#6c63ff"}
              onMouseLeave={e => e.currentTarget.style.color = "#1a1a2e"}>
              {label}
            </Link>
          ))}
        </div>
        <div className="animate-fadeInRight" style={{ display: "flex", gap: "12px" }}>
          <Link to="/login" className="btn-hover" style={{ padding: "8px 20px", border: "2px solid #6c63ff", borderRadius: "8px", color: "#6c63ff", textDecoration: "none", fontWeight: "600" }}>Login</Link>
          <Link to="/register" className="btn-hover" style={{ padding: "8px 20px", background: "#6c63ff", borderRadius: "8px", color: "#fff", textDecoration: "none", fontWeight: "600" }}>Sign Up</Link>
        </div>
      </nav>

      {/* Hero */}
    {/* Featured Courses */}
<section style={{ padding: "80px 60px", textAlign: "center" }}>
  <AnimatedSection>
    <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px" }}>Featured Courses</h2>
    <p style={{ color: "#666", marginBottom: "48px" }}>Learn from our most popular courses</p>
  </AnimatedSection>
  <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", padding: "0 60px" }}>
    <button onClick={() => {
      document.getElementById('course-slider').scrollBy({ left: -320, behavior: 'smooth' })
    }} style={{ position: "absolute", left: "-0px", top: "50%", transform: "translateY(-50%)", zIndex: 10, width: "44px", height: "44px", borderRadius: "50%", background: "#6c63ff", color: "#fff", border: "none", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(108,99,255,0.3)" }}>‹</button>
    <div id="course-slider" style={{ display: "flex", gap: "24px", overflowX: "hidden", scrollBehavior: "smooth", padding: "10px 4px 20px 4px" }}>
      {courses.length > 0 ? courses.map((course, i) => (
        <Link to={`/courses/${course.id}`} key={course.id} className="card-hover" style={{ background: "#fff", borderRadius: "2px solid #6c63ff", textDecoration: "none", color: "#6c63ff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden", display: "block", minWidth: "300px", maxWidth: "300px" }}>
          <div style={{ height: "160px", background: "linear-gradient(135deg, #6c63ff, #3b37d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="animate-float" style={{ fontSize: "48px" }}>📚</span>
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
        <div style={{ color: "#888", padding: "40px", width: "100%" }}>No courses available yet</div>
      )}
    </div>
    <button onClick={() => {
      document.getElementById('course-slider').scrollBy({ left: 320, behavior: 'smooth' })
    }} style={{ position: "absolute", right: "-0px", top: "50%", transform: "translateY(-50%)", zIndex: 10, width: "44px", height: "44px", borderRadius: "50%", background: "#6c63ff", color: "#fff", border: "none", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(108,99,255,0.3)" }}>›</button>
  </div>
  <AnimatedSection>
    <Link to="/courses" className="btn-hover" style={{ display: "inline-block", marginTop: "40px", padding: "14px 36px", background: "#6c63ff", color: "#fff", borderRadius: "10px", textDecoration: "none", fontWeight: "600" }}>View All Courses</Link>
  </AnimatedSection>
</section>

      {/* Categories */}
      <section style={{ padding: "80px 60px", background: "#f8f9ff", textAlign: "center" }}>
        <AnimatedSection>
          <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px" }}>Browse Categories</h2>
          <p style={{ color: "#666", marginBottom: "48px" }}>Explore our wide range of course categories</p>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "900px", margin: "0 auto" }}>
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.name} className={`delay-${i + 1}`}>
              <Link to={`/courses?category=${cat.name}`} className="card-hover" style={{ background: "#fff", padding: "32px", borderRadius: "16px", textDecoration: "none", color: "#1a1a2e", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "block" }}>
                <div className="animate-float" style={{ fontSize: "40px", marginBottom: "12px" }}>{cat.icon}</div>
                <div style={{ fontWeight: "600", fontSize: "16px" }}>{cat.name}</div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section style={{ padding: "80px 60px", textAlign: "center" }}>
        <AnimatedSection>
          <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px" }}>Featured Courses</h2>
          <p style={{ color: "#666", marginBottom: "48px" }}>Learn from our most popular courses</p>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
          {courses.length > 0 ? courses.map((course, i) => (
            <AnimatedSection key={course.id} className={`delay-${i + 1}`}>
              <Link to={`/courses/${course.id}`} className="card-hover" style={{ background: "#fff", borderRadius: "16px", textDecoration: "none", color: "#1a1a2e", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden", display: "block" }}>
                <div style={{ height: "160px", background: "linear-gradient(135deg, #6c63ff, #3b37d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="animate-float" style={{ fontSize: "48px" }}>📚</span>
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
            </AnimatedSection>
          )) : (
            <div style={{ gridColumn: "1/-1", color: "#888", padding: "40px" }}>No courses available yet</div>
          )}
        </div>
        <AnimatedSection>
          <Link to="/courses" className="btn-hover" style={{ display: "inline-block", marginTop: "40px", padding: "14px 36px", background: "#6c63ff", color: "#fff", borderRadius: "10px", textDecoration: "none", fontWeight: "600" }}>View All Courses</Link>
        </AnimatedSection>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "80px 60px", background: "#f8f9ff", textAlign: "center" }}>
        <AnimatedSection>
          <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px" }}>Why Choose EduSmart?</h2>
          <p style={{ color: "#666", marginBottom: "48px" }}>We provide the best learning experience</p>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
          {[["🎓", "Expert Teachers", "Learn from industry professionals"], ["⏰", "Flexible Learning", "Study at your own pace"], ["📜", "Certification", "Get recognized certificates"], ["🤖", "AI Assistant", "Personalized learning support"]].map(([icon, title, desc], i) => (
            <AnimatedSection key={title} className={`delay-${i + 1}`}>
              <div className="card-hover" style={{ background: "#fff", padding: "32px 24px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <div className="animate-float" style={{ fontSize: "40px", marginBottom: "16px" }}>{icon}</div>
                <div style={{ fontWeight: "700", fontSize: "18px", marginBottom: "8px" }}>{title}</div>
                <div style={{ color: "#888", fontSize: "14px" }}>{desc}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section style={{ padding: "80px 60px", textAlign: "center" }}>
        <AnimatedSection>
          <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px" }}>Latest Blogs</h2>
          <p style={{ color: "#666", marginBottom: "48px" }}>Stay updated with our latest articles</p>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
          {blogs.length > 0 ? blogs.map((blog, i) => (
            <AnimatedSection key={blog.id} className={`delay-${i + 1}`}>
              <div className="card-hover" style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden", textAlign: "left" }}>
                <div style={{ height: "160px", background: "linear-gradient(135deg, #f093fb, #f5576c)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="animate-float" style={{ fontSize: "48px" }}>📝</span>
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "8px" }}>{blog.title}</div>
                  <div style={{ fontSize: "13px", color: "#888" }}>by {blog.author_name}</div>
                </div>
              </div>
            </AnimatedSection>
          )) : (
            <div style={{ gridColumn: "1/-1", color: "#888", padding: "40px" }}>No blogs yet</div>
          )}
        </div>
        <AnimatedSection>
          <Link to="/blog" className="btn-hover" style={{ display: "inline-block", marginTop: "40px", padding: "14px 36px", background: "#6c63ff", color: "#fff", borderRadius: "10px", textDecoration: "none", fontWeight: "600" }}>View All Blogs</Link>
        </AnimatedSection>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 60px", background: "#f8f9ff" }}>
        <AnimatedSection>
          <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px", textAlign: "center" }}>Frequently Asked Questions</h2>
          <p style={{ color: "#666", marginBottom: "48px", textAlign: "center" }}>Got questions? We have answers</p>
        </AnimatedSection>
        <div style={{ maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} className={`delay-${i + 1}`}>
              <FAQItem q={faq.q} a={faq.a} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: "80px 60px", background: "linear-gradient(135deg, #6c63ff, #3b37d4)", textAlign: "center", color: "#fff" }}>
        <AnimatedSection>
          <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "12px" }}>Stay Updated</h2>
          <p style={{ marginBottom: "32px", opacity: 0.9 }}>Subscribe to our newsletter for the latest courses and updates</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", maxWidth: "500px", margin: "0 auto" }}>
            <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: "14px 20px", borderRadius: "10px", border: "none", fontSize: "16px" }} />
            <button className="btn-hover" style={{ padding: "14px 28px", background: "#ffd700", color: "#1a1a2e", borderRadius: "10px", border: "none", fontWeight: "700", cursor: "pointer", fontSize: "16px" }}>Subscribe</button>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginBottom: "24px" }}>
          {[["About", "/about"], ["Courses", "/courses"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={label} to={path} style={{ color: "#aaa", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#6c63ff"}
              onMouseLeave={e => e.currentTarget.style.color = "#aaa"}>
              {label}
            </Link>
          ))}
        </div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", transition: "box-shadow 0.3s" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", textAlign: "left", fontWeight: "600", fontSize: "16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {q}
        <span style={{ transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
      </button>
      {open && (
        <div className="animate-fadeInUp" style={{ padding: "0 24px 20px", color: "#666" }}>{a}</div>
      )}
    </div>
  )
}