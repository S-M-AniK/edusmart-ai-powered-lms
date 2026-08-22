import { Link } from "react-router-dom"

export default function LiveWorkshopPage() {
  const workshops = [
    { title: "React.js Advanced Patterns", instructor: "Arif Chowdhury", date: "January 28, 2025", time: "7:00 PM - 9:00 PM", seats: 50, tag: "FREE" },
    { title: "System Design for Beginners", instructor: "Rahim Uddin", date: "February 2, 2025", time: "8:00 PM - 10:00 PM", seats: 40, tag: "FREE" },
    { title: "Figma to Code with Tailwind", instructor: "Fatema Akter", date: "February 5, 2025", time: "7:00 PM - 9:00 PM", seats: 35, tag: "FREE" },
    { title: "Node.js REST API Masterclass", instructor: "Tanvir Ahmed", date: "February 12, 2025", time: "8:00 PM - 10:00 PM", seats: 45, tag: "FREE" },
    { title: "Python for Data Analysis", instructor: "Mou Akhter", date: "February 18, 2025", time: "7:00 PM - 9:00 PM", seats: 30, tag: "FREE" },
    { title: "Docker & DevOps Basics", instructor: "Sarah Khan", date: "February 25, 2025", time: "8:00 PM - 10:00 PM", seats: 25, tag: "FREE" },
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
        <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "12px" }}>Live Workshops</h1>
        <p style={{ fontSize: "16px", opacity: 0.9 }}>Join our free live sessions with expert instructors.</p>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {workshops.map((w, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", padding: "28px", border: "1px solid #eee" }}>
              <div style={{ background: "#e8f5e9", color: "#2e7d32", fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "20px", display: "inline-block", marginBottom: "14px" }}>{w.tag}</div>
              <h3 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "10px" }}>{w.title}</h3>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>by {w.instructor}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "#555", marginBottom: "20px" }}>
                <span>📅 {w.date}</span>
                <span>🕖 {w.time}</span>
                <span>👥 {w.seats} seats available</span>
              </div>
              <Link to="/register" style={{ display: "block", textAlign: "center", padding: "12px", background: "#6c63ff", color: "#fff", borderRadius: "10px", textDecoration: "none", fontWeight: "600" }}>Register Free</Link>
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