import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

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

export default function AboutPage() {
  const team = [
    { name: "Dr. Ahmed Rahman", role: "CEO & Founder", emoji: "👨‍💼" },
    { name: "Sarah Khan", role: "Head of Education", emoji: "👩‍🏫" },
    { name: "Rahim Uddin", role: "CTO", emoji: "👨‍💻" },
    { name: "Fatema Akter", role: "Lead Designer", emoji: "👩‍🎨" },
  ]

  return (
    <div style={{ fontFamily: "sans-serif", color: "#1a1a2e" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 60px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 }}>
        <Link to="/" className="animate-fadeInLeft" style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", textDecoration: "none" }}>Edu<span style={{ color: "#1a1a2e" }}>Smart</span></Link>
        <div style={{ display: "flex", gap: "28px", fontSize: "15px", fontWeight: "500" }}>
          {[["Home", "/"], ["Courses", "/courses"], ["Teachers", "/teachers"], ["Blog", "/blog"], ["About", "/about"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={label} to={path} style={{ textDecoration: "none", color: path === "/about" ? "#6c63ff" : "#1a1a2e", fontWeight: path === "/about" ? "700" : "500", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#6c63ff"}
              onMouseLeave={e => e.currentTarget.style.color = path === "/about" ? "#6c63ff" : "#1a1a2e"}>
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
        <h1 className="animate-fadeInUp" style={{ fontSize: "48px", fontWeight: "800", marginBottom: "16px" }}>About EduSmart</h1>
        <p className="animate-fadeInUp delay-2" style={{ fontSize: "18px", opacity: 0.9, maxWidth: "600px", margin: "0 auto" }}>Empowering learners worldwide with AI-powered education</p>
      </section>

      <section style={{ padding: "80px 60px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "60px" }}>
          {[
            ["Our Story", "EduSmart was founded in 2023 with a vision to make quality education accessible to everyone. We combine expert teaching with AI technology to create personalized learning experiences."],
            ["Our Mission", "To democratize education by providing affordable, high-quality courses with AI-powered assistance that adapts to each student's learning style."],
            ["Our Vision", "A world where anyone, anywhere can access world-class education and achieve their dreams through the power of technology."],
            ["Our Values", "Excellence, Innovation, Accessibility, and Community. We believe in creating an inclusive learning environment for all."]
          ].map(([title, text], i) => (
            <AnimatedSection key={title} className={`delay-${i + 1}`}>
              <div className="card-hover" style={{ background: "#f8f9ff", padding: "32px", borderRadius: "16px" }}>
                <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px", color: "#6c63ff" }}>{title}</h3>
                <p style={{ color: "#666", lineHeight: 1.7 }}>{text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>


        <AnimatedSection>
          <h2 style={{ fontSize: "36px", fontWeight: "700", textAlign: "center", marginBottom: "40px" }}>Meet Our Team</h2>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
          {team.map((member, i) => (
            <AnimatedSection key={member.name} className={`delay-${i + 1}`}>
              <div className="card-hover" style={{ background: "#fff", padding: "24px", borderRadius: "16px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                <div className="animate-float" style={{ fontSize: "48px", marginBottom: "12px" }}>{member.emoji}</div>
                <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "4px" }}>{member.name}</div>
                <div style={{ color: "#6c63ff", fontSize: "14px" }}>{member.role}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <footer style={{ background: "#1a1a2e", color: "#fff", padding: "40px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#6c63ff", marginBottom: "16px" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
        <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginBottom: "24px" }}>
          {[["About", "/about"], ["Courses", "/courses"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={label} to={path} style={{ color: "#aaa", textDecoration: "none" }}>{label}</Link>
          ))}
        </div>
        <div style={{ color: "#666", fontSize: "14px" }}>© 2025 EduSmart. All rights reserved.</div>
      </footer>
    </div>
  )
}