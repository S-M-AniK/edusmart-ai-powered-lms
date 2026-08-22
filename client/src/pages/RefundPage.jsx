import { Link } from "react-router-dom"

export default function RefundPage() {
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
        <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "12px" }}>Refund and Cancellation Policy</h1>
        <p style={{ fontSize: "16px", opacity: 0.9 }}>Please read our refund policy carefully before enrolling.</p>
      </section>

      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "60px 24px" }}>

        <h2 style={{ fontSize: "26px", fontWeight: "700", marginBottom: "16px" }}>Refund Policy</h2>
        <ul style={{ color: "#444", lineHeight: 2.2, paddingLeft: "24px", marginBottom: "40px", fontSize: "15px" }}>
          <li>If you enroll in any EduSmart course, you cannot request a refund (full or partial) before the main class or batch begins.</li>
          <li>After the main class or batch starts, you will not receive any refund until the first module (or one week) is completed.</li>
          <li>After completing 1 module or one (1) week of the course, you may request a refund subject to conditions.</li>
          <li>You will have only 1 week (7 days) to claim this refund. After that, no refund requests will be accepted.</li>
          <li>If you enrolled without applying a promo code, you cannot claim a refund equivalent to the promo code discount.</li>
          <li>To request a refund, email us at <a href="mailto:support@edusmart.com" style={{ color: "#6c63ff" }}>support@edusmart.com</a></li>
        </ul>

        <h2 style={{ fontSize: "26px", fontWeight: "700", marginBottom: "16px" }}>Refund Eligibility Conditions</h2>
        <p style={{ fontWeight: "600", marginBottom: "12px", color: "#333", fontSize: "15px" }}>In addition to the above, the following conditions must also be met:</p>
        <ul style={{ color: "#444", lineHeight: 2.2, paddingLeft: "24px", fontSize: "15px" }}>
          <li>Your course payment must be completed in full to be eligible for a refund request.</li>
          <li>A valid and justified reason must be provided when applying for a refund.</li>
          <li>Refunds will only be considered if the issue is caused by EduSmart's service failure.</li>
          <li>You will have only 1 week (7 days) to submit your refund claim after eligibility. No requests will be accepted after this period.</li>
        </ul>

      </section>

      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}