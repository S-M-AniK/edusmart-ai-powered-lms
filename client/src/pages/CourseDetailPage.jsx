import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { getCourseById } from "../api/courses"
import { enrollCourse } from "../api/enrollments"
import { getCourseReviews } from "../api/reviews"
import toast from "react-hot-toast"

function luhnCheck(num) {
  const digits = num.replace(/[^0-9]/g, "").split("").reverse().map(Number)
  const sum = digits.reduce((acc, d, i) => {
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9 }
    return acc + d
  }, 0)
  return sum % 10 === 0
}

function PaymentModal({ course, onClose, onSuccess }) {
  const [step, setStep] = useState(1)
  const [processing, setProcessing] = useState(false)
  const [payMethod, setPayMethod] = useState("card")
  const [form, setForm] = useState({ cardName: "", cardNumber: "", expiry: "", cvv: "", bankAccount: "", bankName: "", bkashNumber: "", bkashPin: "" })
  const [errors, setErrors] = useState({})

  function formatCardNumber(val) {
    return val.replace(/[^0-9]/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()
  }
  function formatExpiry(val) {
    const clean = val.replace(/[^0-9]/g, "").slice(0, 4)
    if (clean.length >= 3) return clean.slice(0, 2) + "/" + clean.slice(2)
    return clean
  }

  function validate() {
    const e = {}
    if (payMethod === "card") {
      if (!form.cardName.trim()) e.cardName = "Card holder name required"
      const rawCard = form.cardNumber.replace(/[^0-9]/g, "")
      if (rawCard.length !== 16) e.cardNumber = "Card number must be 16 digits"
      else if (!luhnCheck(rawCard)) e.cardNumber = "Invalid card number"
      const [mm, yy] = (form.expiry || "").split("/")
      const now = new Date()
      const curYear = now.getFullYear() % 100
      const curMonth = now.getMonth() + 1
      if (!mm || !yy || parseInt(mm) > 12 || parseInt(mm) < 1) e.expiry = "Enter valid month (01-12)"
      else if (parseInt(yy) < curYear || (parseInt(yy) === curYear && parseInt(mm) < curMonth)) e.expiry = "Card has expired"
      if (form.cvv.length < 3) e.cvv = "CVV must be 3-4 digits"
    } else if (payMethod === "bank") {
      if (!form.bankName.trim()) e.bankName = "Please select a bank"
      const acc = form.bankAccount.replace(/[^0-9]/g, "")
      if (acc.length < 10 || acc.length > 17) e.bankAccount = "Account number must be 10-17 digits"
    } else if (payMethod === "bkash") {
      const num = form.bkashNumber.replace(/[^0-9]/g, "")
      if (num.length !== 11) e.bkashNumber = "bKash number must be 11 digits"
      else if (!num.startsWith("01")) e.bkashNumber = "Number must start with 01"
      if (form.bkashPin.length < 4) e.bkashPin = "PIN must be at least 4 digits"
    }
    return e
  }

  async function handlePay() {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    setProcessing(true)
    await new Promise(r => setTimeout(r, 2000))
    setProcessing(false)
    setStep(2)
    setTimeout(() => onSuccess(), 1500)
  }

  const tabs = [
    { key: "card", label: "Credit Card", icon: "💳" },
    { key: "bank", label: "Bank Transfer", icon: "🏦" },
    { key: "bkash", label: "bKash", icon: "📱" }
  ]

  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "13px 16px",
    borderRadius: "12px",
    border: hasError ? "1.5px solid #f87171" : "1.5px solid #e2e8f0",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    background: hasError ? "#fff5f5" : "#f8fafc",
    color: "#1e293b",
    transition: "border-color 0.2s, box-shadow 0.2s",
  })

  const labelStyle = {
    fontSize: "12px",
    fontWeight: "700",
    color: "#64748b",
    marginBottom: "7px",
    display: "block",
    letterSpacing: "0.05em",
    textTransform: "uppercase"
  }

  const errorStyle = { color: "#ef4444", fontSize: "11px", marginTop: "5px", display: "flex", alignItems: "center", gap: "4px" }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(6px)" }}>
      <div style={{ background: "#fff", borderRadius: "24px", width: "100%", maxWidth: "480px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.25)", maxHeight: "92vh", overflowY: "auto" }}>

        <div style={{ background: "linear-gradient(135deg, #6c63ff 0%, #3b37d4 100%)", padding: "28px 28px 24px", color: "#fff", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: "200px", height: "200px", background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.65, marginBottom: "6px" }}>Secure Checkout</div>
              <div style={{ fontWeight: "700", fontSize: "17px", lineHeight: 1.3, maxWidth: "300px" }}>{course.title}</div>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backdropFilter: "blur(4px)" }}>×</button>
          </div>
          <div style={{ marginTop: "20px", display: "flex", alignItems: "baseline", gap: "4px" }}>
            <span style={{ fontSize: "14px", opacity: 0.75, fontWeight: "600" }}>৳</span>
            <span style={{ fontSize: "40px", fontWeight: "800", letterSpacing: "-1px" }}>{course.price}</span>
          </div>
          <div style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.12)", borderRadius: "20px", padding: "5px 12px", fontSize: "12px" }}>
            🔒 SSL Secured Payment
          </div>
        </div>

        {step === 1 ? (
          <div style={{ padding: "28px" }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "28px", background: "#f1f5f9", borderRadius: "14px", padding: "5px" }}>
              {tabs.map(({ key, label, icon }) => (
                <button key={key} onClick={() => { setPayMethod(key); setErrors({}) }}
                  style={{ flex: 1, padding: "10px 8px", border: "none", borderRadius: "10px", fontSize: "12px", fontWeight: "700", color: payMethod === key ? (key === "bkash" ? "#e2136e" : "#6c63ff") : "#94a3b8", cursor: "pointer", background: payMethod === key ? "#fff" : "transparent", boxShadow: payMethod === key ? "0 2px 8px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <span style={{ fontSize: "18px" }}>{icon}</span>
                  {label}
                </button>
              ))}
            </div>

            {payMethod === "card" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ background: "linear-gradient(135deg, #1e293b, #334155)", borderRadius: "16px", padding: "20px 22px", color: "#fff", marginBottom: "4px" }}>
                  <div style={{ fontSize: "11px", opacity: 0.5, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>Card Preview</div>
                  <div style={{ fontSize: "17px", letterSpacing: "3px", fontFamily: "monospace", marginBottom: "16px", minHeight: "24px" }}>
                    {form.cardNumber || "•••• •••• •••• ••••"}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <div style={{ fontSize: "10px", opacity: 0.5, marginBottom: "2px" }}>CARD HOLDER</div>
                      <div style={{ fontSize: "13px", fontWeight: "600" }}>{form.cardName || "YOUR NAME"}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", opacity: 0.5, marginBottom: "2px" }}>EXPIRES</div>
                      <div style={{ fontSize: "13px", fontWeight: "600" }}>{form.expiry || "MM/YY"}</div>
                    </div>
                    <div style={{ fontSize: "28px", opacity: 0.6 }}>💳</div>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Card Holder Name</label>
                  <input value={form.cardName} onChange={e => setForm({ ...form, cardName: e.target.value })} placeholder="Please enter your name" style={inputStyle(errors.cardName)} />
                  {errors.cardName && <div style={errorStyle}>⚠ {errors.cardName}</div>}
                </div>
                <div>
                  <label style={labelStyle}>Card Number</label>
                  <input value={form.cardNumber} onChange={e => setForm({ ...form, cardNumber: formatCardNumber(e.target.value) })} placeholder="1234 5678 9012 3456" style={{ ...inputStyle(errors.cardNumber), letterSpacing: "2px", fontFamily: "monospace" }} />
                  {errors.cardNumber && <div style={errorStyle}>⚠ {errors.cardNumber}</div>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={labelStyle}>Expiry Date</label>
                    <input value={form.expiry} onChange={e => setForm({ ...form, expiry: formatExpiry(e.target.value) })} placeholder="MM/YY" style={inputStyle(errors.expiry)} />
                    {errors.expiry && <div style={errorStyle}>⚠ {errors.expiry}</div>}
                  </div>
                  <div>
                    <label style={labelStyle}>CVV</label>
                    <input value={form.cvv} onChange={e => setForm({ ...form, cvv: e.target.value.replace(/[^0-9]/g, "").slice(0, 4) })} placeholder="•••" type="password" style={inputStyle(errors.cvv)} />
                    {errors.cvv && <div style={errorStyle}>⚠ {errors.cvv}</div>}
                  </div>
                </div>
              </div>
            )}

            {payMethod === "bank" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ background: "#f0f9ff", border: "1.5px solid #bae6fd", borderRadius: "14px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ fontSize: "30px" }}>🏦</span>
                  <div>
                    <div style={{ fontWeight: "700", color: "#0369a1", fontSize: "14px" }}>Bank Transfer</div>
                    <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>Funds will be debited from your account</div>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Select Bank</label>
                  <select value={form.bankName} onChange={e => setForm({ ...form, bankName: e.target.value })} style={{ ...inputStyle(errors.bankName), appearance: "none" }}>
                    <option value="">Choose your bank</option>
                    <option>Dutch-Bangla Bank</option>
                    <option>BRAC Bank</option>
                    <option>Islami Bank</option>
                    <option>Sonali Bank</option>
                    <option>Eastern Bank</option>
                    <option>City Bank</option>
                    <option>Mutual Trust Bank</option>
                    <option>Prime Bank</option>
                  </select>
                  {errors.bankName && <div style={errorStyle}>⚠ {errors.bankName}</div>}
                </div>
                <div>
                  <label style={labelStyle}>Account Number</label>
                  <input value={form.bankAccount} onChange={e => setForm({ ...form, bankAccount: e.target.value.replace(/[^0-9]/g, "") })} placeholder="Enter your account number" style={inputStyle(errors.bankAccount)} />
                  {errors.bankAccount && <div style={errorStyle}>⚠ {errors.bankAccount}</div>}
                </div>
              </div>
            )}

            {payMethod === "bkash" && (
              <div style={{ background: "#e2136e", borderRadius: "20px", overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(180deg, #e2136e 0%, #c0115d 100%)", padding: "20px 20px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "36px", height: "36px", background: "#fff", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "20px" }}>b</span>
                      </div>
                      <span style={{ color: "#fff", fontWeight: "800", fontSize: "18px", letterSpacing: "-0.3px" }}>bKash</span>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: "20px", padding: "4px 12px", fontSize: "11px", color: "#fff", fontWeight: "700" }}>🔒 Secured</div>
                  </div>

                  <div style={{ background: "rgba(0,0,0,0.15)", borderRadius: "14px", padding: "16px 18px", marginBottom: "6px" }}>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>Payment To</div>
                    <div style={{ color: "#fff", fontWeight: "700", fontSize: "14px" }}>{course.title}</div>
                    <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", marginTop: "4px" }}>EduSmart Learning</div>
                    <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)" }}>Amount</span>
                      <span style={{ fontSize: "22px", fontWeight: "800", color: "#fff" }}>৳{course.price}</span>
                    </div>
                  </div>
                </div>

                <div style={{ background: "#fff", padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "#9d174d", marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>bKash Account Number</div>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", fontWeight: "700", color: "#e2136e" }}>📱</span>
                      <input
                        value={form.bkashNumber}
                        onChange={e => setForm({ ...form, bkashNumber: e.target.value.replace(/[^0-9]/g, "").slice(0, 11) })}
                        placeholder="01XXXXXXXXX"
                        style={{ width: "100%", padding: "13px 14px 13px 40px", borderRadius: "12px", border: errors.bkashNumber ? "2px solid #f87171" : "2px solid #fce7f3", fontSize: "15px", outline: "none", boxSizing: "border-box", background: errors.bkashNumber ? "#fff5f5" : "#fff5f9", color: "#1e293b", fontWeight: "600" }}
                      />
                    </div>
                    {errors.bkashNumber && <div style={errorStyle}>⚠ {errors.bkashNumber}</div>}
                  </div>

                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "#9d174d", marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>bKash PIN</div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {[0,1,2,3,4].map(i => (
                        <div key={i} style={{ flex: 1, height: "48px", background: form.bkashPin.length > i ? "#e2136e" : "#fff5f9", border: errors.bkashPin ? "2px solid #f87171" : "2px solid #fce7f3", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {form.bkashPin.length > i && <div style={{ width: "10px", height: "10px", background: "#fff", borderRadius: "50%" }} />}
                        </div>
                      ))}
                    </div>
                    <input
                      value={form.bkashPin}
                      onChange={e => setForm({ ...form, bkashPin: e.target.value.replace(/[^0-9]/g, "").slice(0, 5) })}
                      type="password"
                      maxLength={5}
                      placeholder="Enter 5-digit PIN"
                      style={{ width: "100%", marginTop: "8px", padding: "12px 14px", borderRadius: "12px", border: errors.bkashPin ? "2px solid #f87171" : "2px solid #fce7f3", fontSize: "15px", outline: "none", boxSizing: "border-box", background: "#fff5f9", color: "#1e293b", letterSpacing: "6px", fontWeight: "700" }}
                    />
                    {errors.bkashPin && <div style={errorStyle}>⚠ {errors.bkashPin}</div>}
                  </div>

                  <div style={{ background: "#fff5f9", borderRadius: "10px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#9d174d" }}>
                    <span>ℹ️</span> আপনার bKash একাউন্ট থেকে ৳{course.price} কেটে নেওয়া হবে
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: "24px", background: "#f8fafc", borderRadius: "14px", padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>
                <span>Course Price</span><span>৳{course.price}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px dashed #e2e8f0" }}>
                <span>Processing Fee</span><span style={{ color: "#22c55e" }}>FREE</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "800", fontSize: "16px", color: "#1e293b" }}>
                <span>Total</span><span style={{ color: "#6c63ff" }}>৳{course.price}</span>
              </div>
            </div>

            <button onClick={handlePay} disabled={processing}
              style={{ width: "100%", marginTop: "16px", padding: "17px", background: processing ? "#a5b4fc" : "linear-gradient(135deg, #6c63ff, #4f46e5)", color: "#fff", borderRadius: "14px", border: "none", fontWeight: "800", fontSize: "16px", cursor: processing ? "not-allowed" : "pointer", boxShadow: processing ? "none" : "0 8px 20px rgba(108,99,255,0.35)", transition: "all 0.2s", letterSpacing: "0.02em" }}>
              {processing ? "⏳ Processing Payment..." : `🔒 Pay ৳${course.price}`}
            </button>
            <div style={{ textAlign: "center", marginTop: "12px", fontSize: "11px", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <span>🔐</span> 256-bit SSL encrypted · Your data is safe
            </div>
          </div>
        ) : (
          <div style={{ padding: "48px 32px", textAlign: "center" }}>
            <div style={{ width: "80px", height: "80px", background: "linear-gradient(135deg, #22c55e, #16a34a)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", margin: "0 auto 20px" }}>✓</div>
            <div style={{ fontSize: "24px", fontWeight: "800", color: "#1e293b", marginBottom: "10px" }}>Payment Successful!</div>
            <div style={{ color: "#64748b", fontSize: "15px", marginBottom: "6px" }}>You are now enrolled in</div>
            <div style={{ fontWeight: "700", color: "#6c63ff", fontSize: "16px", marginBottom: "20px" }}>{course.title}</div>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "14px 18px", fontSize: "13px", color: "#15803d", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              📧 Confirmation email sent to your inbox
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CourseDetailPage() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [showPayment, setShowPayment] = useState(false)
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "null")
    setUser(u)
    getCourseById(id).then(res => { setCourse(res.data.course); setLoading(false) }).catch(() => setLoading(false))
    getCourseReviews(id).then(res => setReviews(res.data.reviews)).catch(() => {})
  }, [id])

  async function handlePaymentSuccess() {
    try {
      await enrollCourse({ student_id: user.id, course_id: parseInt(id) })
      setEnrolled(true)
      setShowPayment(false)
      toast.success("🎉 Enrolled successfully! Check your email.")
    } catch (err) {
      toast.error(err.response?.data?.message || "Enrollment failed!")
      setShowPayment(false)
    }
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "sans-serif", flexDirection: "column", gap: "16px" }}>
      <div style={{ width: "48px", height: "48px", border: "4px solid #e2e8f0", borderTop: "4px solid #6c63ff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <span style={{ color: "#64748b", fontSize: "15px" }}>Loading course...</span>
    </div>
  )
  if (!course) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "sans-serif", flexDirection: "column", gap: "12px" }}>
      <span style={{ fontSize: "48px" }}>🔍</span>
      <span style={{ color: "#64748b", fontSize: "18px", fontWeight: "600" }}>Course not found</span>
      <Link to="/courses" style={{ color: "#6c63ff", textDecoration: "none", fontWeight: "700" }}>← Browse Courses</Link>
    </div>
  )

  const getInitials = (name) => name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?"
  const avatarColors = ["#6c63ff", "#ec4899", "#f59e0b", "#22c55e", "#3b82f6", "#8b5cf6"]
  const getColor = (name) => avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length]

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: "#1e293b", background: "#f8fafc", minHeight: "100vh" }}>
      {showPayment && <PaymentModal course={course} onClose={() => setShowPayment(false)} onSuccess={handlePaymentSuccess} />}

      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 60px", height: "68px", background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 100 }}>
        <Link to="/" style={{ fontSize: "22px", fontWeight: "800", color: "#6c63ff", textDecoration: "none" }}>Edu<span style={{ color: "#1e293b" }}>Smart</span></Link>
        <div style={{ display: "flex", gap: "32px", fontSize: "14px" }}>
          {[["Home", "/"], ["Courses", "/courses"], ["Teachers", "/teachers"], ["Blog", "/blog"], ["About", "/about"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={label} to={path} style={{ textDecoration: "none", color: "#475569", fontWeight: "500" }}>{label}</Link>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {user ? (
            <Link to="/student/dashboard" style={{ padding: "9px 20px", background: "#6c63ff", borderRadius: "10px", color: "#fff", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>Dashboard</Link>
          ) : (
            <>
              <Link to="/login" style={{ padding: "9px 20px", border: "1.5px solid #6c63ff", borderRadius: "10px", color: "#6c63ff", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>Login</Link>
              <Link to="/register" style={{ padding: "9px 20px", background: "#6c63ff", borderRadius: "10px", color: "#fff", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <section style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)", padding: "64px 60px", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(108,99,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.2) 0%, transparent 40%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: "20px", padding: "4px 14px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>{course.category}</span>
            <span style={{ background: "rgba(108,99,255,0.4)", borderRadius: "20px", padding: "4px 14px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em" }}>{course.level}</span>
          </div>
          <h1 style={{ fontSize: "40px", fontWeight: "800", lineHeight: 1.2, marginBottom: "18px", letterSpacing: "-0.5px" }}>{course.title}</h1>
          <p style={{ fontSize: "17px", opacity: 0.8, marginBottom: "28px", lineHeight: 1.7, maxWidth: "700px" }}>{course.description}</p>
          <div style={{ display: "flex", gap: "28px", alignItems: "center", flexWrap: "wrap", fontSize: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>👨‍🏫</div>
              <span style={{ fontWeight: "600" }}>{course.teacher_name}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#fbbf24" }}>⭐</span>
              <span style={{ fontWeight: "700" }}>4.5</span>
              <span style={{ opacity: 0.65 }}>({reviews.length} reviews)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span>⏱</span><span>{course.duration || "Self-paced"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span>🌐</span><span>{course.language}</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 60px", maxWidth: "1160px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 340px", gap: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {course.what_you_learn && (
            <div style={{ background: "#fff", padding: "32px", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #6c63ff, #4f46e5)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>📖</div>
                <h2 style={{ fontSize: "20px", fontWeight: "800", margin: 0 }}>What You'll Learn</h2>
              </div>
              <p style={{ color: "#475569", lineHeight: 1.8, margin: 0 }}>{course.what_you_learn}</p>
            </div>
          )}

          {course.requirements && (
            <div style={{ background: "#fff", padding: "32px", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #f59e0b, #d97706)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>📋</div>
                <h2 style={{ fontSize: "20px", fontWeight: "800", margin: 0 }}>Requirements</h2>
              </div>
              <p style={{ color: "#475569", lineHeight: 1.8, margin: 0 }}>{course.requirements}</p>
            </div>
          )}

          {reviews.length > 0 && (
            <div style={{ background: "#fff", padding: "32px", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #f59e0b, #fbbf24)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>⭐</div>
                <div>
                  <h2 style={{ fontSize: "20px", fontWeight: "800", margin: 0 }}>Student Reviews</h2>
                  <div style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>{reviews.length} reviews</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {reviews.map(review => (
                  <div key={review.id} style={{ padding: "20px", borderRadius: "14px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "36px", height: "36px", background: getColor(review.student_name), borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "13px", fontWeight: "800" }}>
                          {getInitials(review.student_name)}
                        </div>
                        <span style={{ fontWeight: "700", fontSize: "14px" }}>{review.student_name}</span>
                      </div>
                      <div style={{ display: "flex", gap: "2px" }}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ fontSize: "14px", color: i < review.rating ? "#f59e0b" : "#e2e8f0" }}>★</span>
                        ))}
                      </div>
                    </div>
                    <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ position: "sticky", top: "84px", height: "fit-content" }}>
          <div style={{ background: "#fff", borderRadius: "20px", boxShadow: "0 8px 40px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ height: "190px", overflow: "hidden", position: "relative" }}>
              {course.thumbnail ? (
                <img src={course.thumbnail} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ height: "100%", background: "linear-gradient(135deg, #1e1b4b, #4c1d95)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontSize: "56px" }}>📚</span>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em" }}>COURSE PREVIEW</span>
                </div>
              )}
            </div>

            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "20px" }}>
                <span style={{ fontSize: "13px", color: "#6c63ff", fontWeight: "700" }}>৳</span>
                <span style={{ fontSize: "38px", fontWeight: "800", color: "#6c63ff", letterSpacing: "-1px" }}>{course.price}</span>
              </div>

              {enrolled ? (
                <div style={{ padding: "16px", background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "22px", marginBottom: "4px" }}>✅</div>
                  <div style={{ color: "#16a34a", fontWeight: "800", fontSize: "15px" }}>Enrolled Successfully!</div>
                </div>
              ) : user ? (
                <button onClick={() => setShowPayment(true)}
                  style={{ display: "block", width: "100%", padding: "16px", background: "linear-gradient(135deg, #6c63ff, #4f46e5)", color: "#fff", borderRadius: "12px", border: "none", fontWeight: "800", fontSize: "16px", cursor: "pointer", marginBottom: "12px", boxShadow: "0 6px 20px rgba(108,99,255,0.35)" }}>
                  🚀 Enroll Now
                </button>
              ) : (
                <>
                  <Link to="/register" style={{ display: "block", padding: "16px", background: "linear-gradient(135deg, #6c63ff, #4f46e5)", color: "#fff", borderRadius: "12px", textDecoration: "none", fontWeight: "800", fontSize: "16px", textAlign: "center", marginBottom: "10px", boxShadow: "0 6px 20px rgba(108,99,255,0.35)" }}>
                    🚀 Enroll Now
                  </Link>
                  <Link to="/login" style={{ display: "block", padding: "14px", border: "1.5px solid #6c63ff", color: "#6c63ff", borderRadius: "12px", textDecoration: "none", fontWeight: "700", fontSize: "15px", textAlign: "center" }}>
                    Login to Enroll
                  </Link>
                </>
              )}

              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[["✅", "Full lifetime access"], ["📱", "Mobile & desktop access"], ["🏆", "Certificate of completion"], ["💬", "AI learning assistant"]].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#475569" }}>
                    <span style={{ width: "28px", height: "28px", background: "#f1f5f9", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "20px", padding: "12px 14px", background: "#f8fafc", borderRadius: "10px", textAlign: "center", fontSize: "11px", color: "#94a3b8", fontWeight: "600", letterSpacing: "0.03em" }}>
                🔐 30-day money-back guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: "#0f172a", color: "#fff", padding: "40px 60px", marginTop: "40px" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "22px", fontWeight: "800", color: "#6c63ff" }}>Edu<span style={{ color: "#fff" }}>Smart</span></div>
          <div style={{ color: "#475569", fontSize: "13px" }}>© 2025 EduSmart. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}