import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllReviews } from "../api/reviews"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllReviews().then(res => { setReviews(res.data.reviews.filter(r => r.approved)); setLoading(false) }).catch(() => setLoading(false))
  }, [])

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

      <section style={{ background: "linear-gradient(135deg, #6c63ff, #3b37d4)", padding: "80px 60px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "800", marginBottom: "16px" }}>Student Reviews</h1>
        <p style={{ fontSize: "18px", opacity: 0.9 }}>What our students say about us</p>
      </section>

      <section style={{ padding: "80px 60px", maxWidth: "1000px", margin: "0 auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>Loading reviews...</div>
        ) : reviews.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {reviews.map(review => (
              <div key={review.id} style={{ background: "#fff", padding: "28px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "16px" }}>{review.student_name}</div>
                    <div style={{ color: "#888", fontSize: "13px" }}>{review.course_title}</div>
                  </div>
                  <div style={{ color: "#f59e0b", fontSize: "18px" }}>{"⭐".repeat(review.rating)}</div>
                </div>
                <p style={{ color: "#666", lineHeight: 1.6 }}>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⭐</div>
            <div style={{ fontSize: "20px", fontWeight: "600" }}>No reviews yet</div>
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