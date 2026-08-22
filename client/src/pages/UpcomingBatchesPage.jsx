import { Link } from "react-router-dom"

export default function UpcomingBatchesPage() {
  const batches = [
    { title: "Complete Web Development Bootcamp", instructor: "Arif Chowdhury", start: "February 1, 2025", duration: "3 months", seats: 30, price: "৳4,999" },
    { title: "Flutter Mobile App Development", instructor: "Sarah Khan", start: "February 10, 2025", duration: "2 months", seats: 25, price: "৳3,999" },
    { title: "Data Science with Python", instructor: "Rahim Uddin", start: "February 15, 2025", duration: "4 months", seats: 20, price: "৳5,999" },
    { title: "UI/UX Design Masterclass", instructor: "Fatema Akter", start: "March 1, 2025", duration: "2 months", seats: 15, price: "৳3,499" },
    { title: "AI & Machine Learning", instructor: "Tanvir Ahmed", start: "March 10, 2025", duration: "5 months", seats: 20, price: "৳7,999" },
    { title: "Cyber Security Fundamentals", instructor: "Mou Akhter", start: "March 15, 2025", duration: "3 months", seats: 18, price: "৳4,499" },
  ]

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
        <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "12px" }}>Upcoming Batches</h1>
        <p style={{ fontSize: "16px", opacity: 0.9 }}>Enroll now and secure your seat before it's too late!</p>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {batches.map((batch, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", padding: "28px", border: "1px solid #eee" }}>
              <div style={{ background: "#6c63ff", color: "#fff", fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "20px", display: "inline-block", marginBottom: "14px" }}>UPCOMING</div>
              <h3 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "10px" }}>{batch.title}</h3>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>by {batch.instructor}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "#555", marginBottom: "20px" }}>
                <span>📅 Starts: {batch.start}</span>
                <span>⏱ Duration: {batch.duration}</span>
                <span>👥 Seats: {batch.seats} available</span>
                <span style={{ fontWeight: "700", color: "#6c63ff", fontSize: "16px" }}>{batch.price}</span>
              </div>
              <Link to="/register" style={{ display: "block", textAlign: "center", padding: "12px", background: "#6c63ff", color: "#fff", borderRadius: "10px", textDecoration: "none", fontWeight: "600" }}>Enroll Now</Link>
            </div>
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