import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { createContact } from "../api/contacts"
import toast from "react-hot-toast"

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
      toast.success("Message sent successfully!")
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch {
      toast.error("Something went wrong!")
    }
    setLoading(false)
  }

  return (
    <div style={{ fontFamily: "sans-serif", color: "#1a1a2e" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 60px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <Link to="/" className="animate-fadeInLeft" style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", textDecoration: "none" }}>Edu<span style={{ color: "#1a1a2e" }}>Smart</span></Link>
        <div style={{ display: "flex", gap: "28px", fontSize: "15px" }}>
          {[["Home", "/"], ["Courses", "/courses"], ["Teachers", "/teachers"], ["Blog", "/blog"], ["About", "/about"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={label} to={path} style={{ textDecoration: "none", color: path === "/contact" ? "#6c63ff" : "#1a1a2e", fontWeight: path === "/contact" ? "700" : "500", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#6c63ff"}
              onMouseLeave={e => e.currentTarget.style.color = path === "/contact" ? "#6c63ff" : "#1a1a2e"}>
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
        <h1 className="animate-fadeInUp" style={{ fontSize: "48px", fontWeight: "800", marginBottom: "16px" }}>Contact Us</h1>
        <p className="animate-fadeInUp delay-2" style={{ fontSize: "18px", opacity: 0.9 }}>We'd love to hear from you!</p>
      </section>

      <section style={{ padding: "80px 60px", maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
        <AnimatedSection className="animate-fadeInLeft">
          <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "32px" }}>Send a Message</h2>
          {success && (
            <div className="animate-scaleIn" style={{ background: "#d1fae5", color: "#065f46", padding: "16px", borderRadius: "10px", marginBottom: "24px", fontWeight: "600" }}>
              ✅ Message sent! We'll get back to you soon.
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[["text", "Your Name", "name"], ["email", "Your Email", "email"], ["text", "Subject", "subject"]].map(([type, placeholder, field]) => (
              <input key={field} type={type} placeholder={placeholder} value={form[field]}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                required={field !== "subject"}
                style={{ padding: "14px 18px", borderRadius: "10px", border: "2px solid #e5e7eb", fontSize: "15px", outline: "none", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "#6c63ff"}
                onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
            ))}
            <textarea placeholder="Your Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={6}
              style={{ padding: "14px 18px", borderRadius: "10px", border: "2px solid #e5e7eb", fontSize: "15px", outline: "none", resize: "vertical", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = "#6c63ff"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
            <button type="submit" disabled={loading} className="btn-hover"
              style={{ padding: "16px", background: "#6c63ff", color: "#fff", borderRadius: "10px", border: "none", fontWeight: "700", fontSize: "16px", cursor: "pointer" }}>
              {loading ? "Sending..." : "Send Message 🚀"}
            </button>
          </form>
        </AnimatedSection>

        <AnimatedSection className="animate-fadeInRight">
          <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "32px" }}>Get In Touch</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {[["📧", "Email", "support@edusmart.com"], ["📞", "Phone", "+880 1234 567890"], ["📍", "Address", "Dhaka, Bangladesh"], ["⏰", "Working Hours", "Mon - Fri: 9AM - 6PM"]].map(([icon, label, value], i) => (
              <div key={label} className={`animate-fadeInRight delay-${i + 1}`} style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "#f8f9ff", padding: "20px", borderRadius: "12px" }}>
                <div className="animate-float" style={{ fontSize: "32px" }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: "700", marginBottom: "4px" }}>{label}</div>
                  <div style={{ color: "#666" }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}