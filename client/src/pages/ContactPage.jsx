import { useState } from "react"
import { Link } from "react-router-dom"
import { createContact } from "../api/contacts"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createContact(form)
      setSuccess(true)
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch (err) {
      alert("Something went wrong!")
    }
    setLoading(false)
  }

  return (
    <div style={{ fontFamily: "sans-serif", color: "#1a1a2e" }}>
      {/* Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 60px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <Link to="/" style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", textDecoration: "none" }}>Edu<span style={{ color: "#1a1a2e" }}>Smart</span></Link>
        <div style={{ display: "flex", gap: "28px", fontSize: "15px", fontWeight: "500" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#1a1a2e" }}>Home</Link>
          <Link to="/courses" style={{ textDecoration: "none", color: "#1a1a2e" }}>Courses</Link>
          <Link to="/teachers" style={{ textDecoration: "none", color: "#1a1a2e" }}>Teachers</Link>
          <Link to="/blog" style={{ textDecoration: "none", color: "#1a1a2e" }}>Blog</Link>
          <Link to="/about" style={{ textDecoration: "none", color: "#1a1a2e" }}>About</Link>
          <Link to="/contact" style={{ textDecoration: "none", color: "#6c63ff", fontWeight: "700" }}>Contact</Link>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/login" style={{ padding: "8px 20px", border: "2px solid #6c63ff", borderRadius: "8px", color: "#6c63ff", textDecoration: "none", fontWeight: "600" }}>Login</Link>
          <Link to="/register" style={{ padding: "8px 20px", background: "#6c63ff", borderRadius: "8px", color: "#fff", textDecoration: "none", fontWeight: "600" }}>Sign Up</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #6c63ff, #3b37d4)", padding: "80px 60px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "800", marginBottom: "16px" }}>Contact Us</h1>
        <p style={{ fontSize: "18px", opacity: 0.9 }}>We'd love to hear from you. Send us a message!</p>
      </section>

      {/* Contact Form + Info */}
      <section style={{ padding: "80px 60px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
        {/* Form */}
        <div>
          <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "32px" }}>Send a Message</h2>
          {success && (
            <div style={{ background: "#d1fae5", color: "#065f46", padding: "16px", borderRadius: "10px", marginBottom: "24px", fontWeight: "600" }}>
              ✅ Message sent successfully! We'll get back to you soon.
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              style={{ padding: "14px 18px", borderRadius: "10px", border: "2px solid #e5e7eb", fontSize: "15px", outline: "none" }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              style={{ padding: "14px 18px", borderRadius: "10px", border: "2px solid #e5e7eb", fontSize: "15px", outline: "none" }}
            />
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              style={{ padding: "14px 18px", borderRadius: "10px", border: "2px solid #e5e7eb", fontSize: "15px", outline: "none" }}
            />
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
              rows={6}
              style={{ padding: "14px 18px", borderRadius: "10px", border: "2px solid #e5e7eb", fontSize: "15px", outline: "none", resize: "vertical" }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{ padding: "16px", background: "#6c63ff", color: "#fff", borderRadius: "10px", border: "none", fontWeight: "700", fontSize: "16px", cursor: "pointer" }}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Info */}
        <div>
          <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "32px" }}>Get In Touch</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {[["📧", "Email", "support@edusmart.com"],["📞", "Phone", "+880 1234 567890"],["📍", "Address", "Dhaka, Bangladesh"],["⏰", "Working Hours", "Mon - Fri: 9AM - 6PM"]].map(([icon, label, value]) => (
              <div key={label} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ fontSize: "32px" }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: "700", marginBottom: "4px" }}>{label}</div>
                  <div style={{ color: "#666" }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}