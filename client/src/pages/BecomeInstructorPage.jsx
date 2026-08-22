import { useState } from "react"
import { Link } from "react-router-dom"

export default function BecomeInstructorPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", experience: "", expertise: "", linkedin: "", motivation: "" })
  const [errors, setErrors] = useState({})

  const benefits = [
    { icon: "💰", title: "Earn Money", desc: "Get paid for every student who enrolls in your course." },
    { icon: "🌍", title: "Global Reach", desc: "Teach students from all around the world." },
    { icon: "🕐", title: "Flexible Schedule", desc: "Teach at your own pace and on your own time." },
    { icon: "🤖", title: "AI Support", desc: "Get help from our AI tools to create better content." },
    { icon: "📊", title: "Analytics", desc: "Track your course performance with detailed insights." },
    { icon: "🎓", title: "Community", desc: "Join a growing community of expert instructors." },
  ]

  const steps = [
    { step: "01", title: "Create an Account", desc: "Sign up as a teacher on EduSmart." },
    { step: "02", title: "Set Up Your Profile", desc: "Add your bio, expertise, and profile photo." },
    { step: "03", title: "Create Your Course", desc: "Upload videos, add curriculum, and set your price." },
    { step: "04", title: "Publish & Earn", desc: "Go live and start earning from your students." },
  ]

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  function handleSubmit() {
    const newErrors = {}
    if (!form.name) newErrors.name = "This field needs to be filled out"
    if (!form.email) newErrors.email = "This email field needs to be filled out"
    if (!form.phone) newErrors.phone = "This phone field needs to be filled out"
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setSubmitted(true)
  }

  const inputStyle = (field) => ({
    width: "100%", padding: "12px 16px", borderRadius: "10px",
    border: errors[field] ? "1px solid red" : "1px solid #e0e0e0",
    fontSize: "15px", background: "#fff", boxSizing: "border-box"
  })

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

      <section style={{ background: "linear-gradient(135deg, #6c63ff, #3b37d4)", padding: "80px 60px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "800", marginBottom: "16px" }}>Become an Instructor</h1>
        <p style={{ fontSize: "18px", opacity: 0.9, marginBottom: "36px", maxWidth: "600px", margin: "0 auto 36px" }}>Share your knowledge, inspire learners, and earn money doing what you love.</p>
        <a href="#apply" style={{ padding: "16px 40px", background: "#ffd700", color: "#1a1a2e", borderRadius: "50px", textDecoration: "none", fontWeight: "700", fontSize: "16px" }}>Apply Now</a>
      </section>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", textAlign: "center", marginBottom: "48px" }}>Why Teach on EduSmart?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "80px" }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ background: "#f8f9ff", borderRadius: "16px", padding: "28px", textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>{b.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>{b.title}</h3>
              <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.7 }}>{b.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "32px", fontWeight: "700", textAlign: "center", marginBottom: "48px" }}>How It Works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "80px" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: "800", color: "#6c63ff", marginBottom: "12px" }}>{s.step}</div>
              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px" }}>{s.title}</h3>
              <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div id="apply" style={{ background: "#f8f9ff", borderRadius: "20px", padding: "48px", maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}>Want to be an EduSmart Instructor?</h2>
          <p style={{ color: "#666", marginBottom: "32px", fontSize: "15px" }}>Fill out the form below and take the first step toward becoming an instructor.</p>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <div style={{ fontSize: "60px", marginBottom: "16px" }}>🎉</div>
              <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "12px" }}>Application Submitted!</h3>
              <p style={{ color: "#666", fontSize: "15px" }}>Thank you for applying. Our team will review your application and contact you within 3-5 business days.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>Full Name <span style={{ color: "red" }}>*</span></label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" style={inputStyle("name")} />
                {errors.name && <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.name}</p>}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>Email <span style={{ color: "red" }}>*</span></label>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="your@gmail.com" style={inputStyle("email")} />
                  {errors.email && <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.email}</p>}
                </div>
                <div>
                  <label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>Phone Number <span style={{ color: "red" }}>*</span></label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="01XXXXXXXXX" style={inputStyle("phone")} />
                  {errors.phone && <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.phone}</p>}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>Years of Experience</label>
                  <input name="experience" value={form.experience} onChange={handleChange} placeholder="2 years"
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #e0e0e0", fontSize: "15px", background: "#fff", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>Area of Expertise</label>
                  <input name="expertise" value={form.expertise} onChange={handleChange} placeholder="Web Development"
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #e0e0e0", fontSize: "15px", background: "#fff", boxSizing: "border-box" }} />
                </div>
              </div>
              <div>
                <label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>LinkedIn / Portfolio URL (Optional)</label>
                <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/yourname"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #e0e0e0", fontSize: "15px", background: "#fff", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>Why do you want to teach at EduSmart?</label>
                <textarea name="motivation" value={form.motivation} onChange={handleChange} placeholder="Share your motivation for becoming an instructor..." rows={4}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #e0e0e0", fontSize: "15px", background: "#fff", boxSizing: "border-box", resize: "none" }} />
              </div>
              <button onClick={handleSubmit}
                style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, #6c63ff, #3b37d4)", color: "#fff", borderRadius: "10px", border: "none", fontWeight: "700", fontSize: "16px", cursor: "pointer", letterSpacing: "1px" }}>
                APPLY AS AN INSTRUCTOR →
              </button>
              <p style={{ textAlign: "center", color: "#888", fontSize: "13px" }}>We'll review your profile and get back to you shortly.</p>
            </div>
          )}
        </div>
      </section>

      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}