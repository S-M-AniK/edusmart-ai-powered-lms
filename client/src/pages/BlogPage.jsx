import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogs().then(res => { setBlogs(res.data.blogs); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ fontFamily: "sans-serif", color: "#1a1a2e" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 60px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <Link to="/" className="animate-fadeInLeft" style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", textDecoration: "none" }}>Edu<span style={{ color: "#1a1a2e" }}>Smart</span></Link>
        <div style={{ display: "flex", gap: "28px", fontSize: "15px" }}>
          {[["Home", "/"], ["Courses", "/courses"], ["Teachers", "/teachers"], ["Blog", "/blog"], ["About", "/about"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={label} to={path} style={{ textDecoration: "none", color: path === "/blog" ? "#6c63ff" : "#1a1a2e", fontWeight: path === "/blog" ? "700" : "500", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#6c63ff"}
              onMouseLeave={e => e.currentTarget.style.color = path === "/blog" ? "#6c63ff" : "#1a1a2e"}>
              {label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/login" className="btn-hover" style={{ padding: "8px 20px", border: "2px solid #6c63ff", borderRadius: "8px", color: "#6c63ff", textDecoration: "none", fontWeight: "600" }}>Login</Link>
          <Link to="/register" className="btn-hover" style={{ padding: "8px 20px", background: "#6c63ff", borderRadius: "8px", color: "#fff", textDecoration: "none", fontWeight: "600" }}>Sign Up</Link>
        </div>
      </nav>

      <section style={{ background: "linear-gradient(135deg, #6c63ff, #3b37d4)", padding: "80px 60px", textAlign: "center", color: "#fff" }}>
        <h1 className="animate-fadeInUp" style={{ fontSize: "48px", fontWeight: "800", marginBottom: "16px" }}>Our Blog</h1>
        <p className="animate-fadeInUp delay-2" style={{ fontSize: "18px", opacity: 0.9 }}>Stay updated with the latest in education and technology</p>
      </section>

      <section style={{ padding: "80px 60px", maxWidth: "1100px", margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
            <div className="animate-float" style={{ fontSize: "48px", marginBottom: "16px" }}>📝</div>
            Loading blogs...
          </div>
        ) : blogs.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {blogs.map((blog, i) => (
              <AnimatedSection key={blog.id} className={`delay-${(i % 3) + 1}`}>
                <div className="card-hover" style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                  <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                    {blog.cover_image ? (
                      <img src={blog.cover_image} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ height: "100%", background: "linear-gradient(135deg, #f093fb, #f5576c)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="animate-float" style={{ fontSize: "56px" }}>📝</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "24px" }}>
                    <div style={{ fontWeight: "700", fontSize: "18px", marginBottom: "12px" }}>{blog.title}</div>
                    <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" }}>{blog.content?.substring(0, 100)}...</p>
                    <Link to={`/blog/${blog.id}`} style={{ display: "inline-block", padding: "10px 20px", background: "#6c63ff", color: "#fff", borderRadius: "8px", textDecoration: "none", fontWeight: "600" }}>Read More</Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <AnimatedSection>
            <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
              <div className="animate-float" style={{ fontSize: "48px", marginBottom: "16px" }}>📝</div>
              <div style={{ fontSize: "20px", fontWeight: "600" }}>No blogs published yet</div>
            </div>
          </AnimatedSection>
        )}
      </section>

      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}