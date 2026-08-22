import { Link } from "react-router-dom"

export default function PrivacyPage() {
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
        <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "12px" }}>Privacy Policy</h1>
        <p style={{ fontSize: "16px", opacity: 0.9 }}>Last updated: January 2025</p>
      </section>

      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "60px 24px" }}>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>1. Information We Collect</h2>
        <p style={{ color: "#444", lineHeight: 1.9, marginBottom: "32px", fontSize: "15px" }}>
          We collect information you provide directly to us, such as your name, email address, password, and payment information when you register or enroll in a course. We also collect usage data such as pages visited, courses accessed, and time spent on the platform.
        </p>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>2. How We Use Your Information</h2>
        <ul style={{ color: "#444", lineHeight: 2.2, paddingLeft: "24px", marginBottom: "32px", fontSize: "15px" }}>
          <li>To provide, maintain, and improve our services.</li>
          <li>To process transactions and send related information.</li>
          <li>To send promotional communications (you can opt out anytime).</li>
          <li>To personalize your learning experience using AI.</li>
          <li>To monitor and analyze usage trends and activities.</li>
        </ul>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>3. Information Sharing</h2>
        <p style={{ color: "#444", lineHeight: 1.9, marginBottom: "32px", fontSize: "15px" }}>
          We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our platform, subject to confidentiality agreements.
        </p>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>4. Data Security</h2>
        <p style={{ color: "#444", lineHeight: 1.9, marginBottom: "32px", fontSize: "15px" }}>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>5. Cookies</h2>
        <p style={{ color: "#444", lineHeight: 1.9, marginBottom: "32px", fontSize: "15px" }}>
          We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>6. Your Rights</h2>
        <ul style={{ color: "#444", lineHeight: 2.2, paddingLeft: "24px", marginBottom: "32px", fontSize: "15px" }}>
          <li>Access and update your personal information at any time.</li>
          <li>Request deletion of your account and associated data.</li>
          <li>Opt out of marketing communications.</li>
          <li>Request a copy of your personal data.</li>
        </ul>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>7. Contact Us</h2>
        <p style={{ color: "#444", lineHeight: 1.9, fontSize: "15px" }}>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@edusmart.com" style={{ color: "#6c63ff" }}>support@edusmart.com</a>.
        </p>

      </section>

      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}