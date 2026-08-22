import { Link } from "react-router-dom"

export default function TermsPage() {
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
        <h1 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "12px" }}>Terms and Conditions</h1>
        <p style={{ fontSize: "16px", opacity: 0.9 }}>Last updated: January 2025</p>
      </section>

      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>1. Acceptance of Terms</h2>
        <p style={{ color: "#444", lineHeight: 1.9, marginBottom: "32px", fontSize: "15px" }}>By accessing or using EduSmart, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform.</p>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>2. User Accounts</h2>
        <ul style={{ color: "#444", lineHeight: 2.2, paddingLeft: "24px", marginBottom: "32px", fontSize: "15px" }}>
          <li>You must provide accurate and complete information when creating an account.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You must be at least 13 years old to use our platform.</li>
          <li>One person may not maintain more than one account.</li>
        </ul>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>3. Course Enrollment</h2>
        <p style={{ color: "#444", lineHeight: 1.9, marginBottom: "32px", fontSize: "15px" }}>When you enroll in a course, you get a limited, non-exclusive, non-transferable license to access and view the course content for personal, non-commercial purposes. You may not share your account or course access with others.</p>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>4. Prohibited Activities</h2>
        <ul style={{ color: "#444", lineHeight: 2.2, paddingLeft: "24px", marginBottom: "32px", fontSize: "15px" }}>
          <li>Copying, redistributing, or sharing course content without permission.</li>
          <li>Using the platform for any unlawful or fraudulent purpose.</li>
          <li>Attempting to gain unauthorized access to any part of the platform.</li>
          <li>Uploading or sharing harmful, offensive, or inappropriate content.</li>
          <li>Impersonating any person or entity.</li>
        </ul>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>5. Intellectual Property</h2>
        <p style={{ color: "#444", lineHeight: 1.9, marginBottom: "32px", fontSize: "15px" }}>All content on EduSmart, including courses, videos, text, graphics, and logos, is the property of EduSmart or its content creators and is protected by applicable intellectual property laws.</p>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>6. Termination</h2>
        <p style={{ color: "#444", lineHeight: 1.9, marginBottom: "32px", fontSize: "15px" }}>We reserve the right to suspend or terminate your account at any time for violation of these terms, without prior notice. You may also terminate your account at any time by contacting our support team.</p>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>7. Limitation of Liability</h2>
        <p style={{ color: "#444", lineHeight: 1.9, marginBottom: "32px", fontSize: "15px" }}>EduSmart shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of or inability to use the platform or its content.</p>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>8. Changes to Terms</h2>
        <p style={{ color: "#444", lineHeight: 1.9, marginBottom: "32px", fontSize: "15px" }}>We reserve the right to modify these terms at any time. We will notify users of significant changes via email or platform notification. Continued use of the platform after changes constitutes acceptance of the new terms.</p>

        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>9. Contact Us</h2>
        <p style={{ color: "#444", lineHeight: 1.9, fontSize: "15px" }}>For any questions regarding these Terms and Conditions, please contact us at <a href="mailto:support@edusmart.com" style={{ color: "#6c63ff" }}>support@edusmart.com</a>.</p>
      </section>

      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}