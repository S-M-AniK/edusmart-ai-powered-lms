import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { getBlogById } from "../api/blogs"

export default function BlogDetailPage() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogById(id).then(res => { setBlog(res.data.blog); setLoading(false) }).catch(() => setLoading(false))
  }, [id])

  if (loading) return <div style={{ textAlign: "center", padding: "100px", fontFamily: "sans-serif" }}>Loading...</div>
  if (!blog) return <div style={{ textAlign: "center", padding: "100px", fontFamily: "sans-serif" }}>Blog not found</div>

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

      <section style={{ background: "linear-gradient(135deg, #f093fb, #f5576c)", padding: "80px 60px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "16px", maxWidth: "800px", margin: "0 auto 16px" }}>{blog.title}</h1>
        <p style={{ opacity: 0.9, marginTop: "16px" }}>by {blog.author_name} • {new Date(blog.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
      </section>

      <section style={{ padding: "60px", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ background: "#fff", padding: "48px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", lineHeight: 1.8, fontSize: "17px", color: "#444", whiteSpace: "pre-wrap" }}>
          {blog.content}
        </div>
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <Link to="/blog" style={{ padding: "14px 32px", background: "#6c63ff", color: "#fff", borderRadius: "10px", textDecoration: "none", fontWeight: "600" }}>
            ← Back to Blog
          </Link>
        </div>
      </section>

      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}