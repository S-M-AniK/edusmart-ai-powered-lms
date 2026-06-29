import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react"

function RegisterPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const errors = {}
    if (!name.trim()) errors.name = "This name field needs to be filled out"
    if (!email.trim()) errors.email = "This email field needs to be filled out"
    if (!password.trim()) errors.password = "This password field needs to be filled out"
    if (!confirmPassword.trim()) errors.confirmPassword = "This confirm password field needs to be filled out"
    return errors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      await axios.post("http://localhost:8000/api/auth/register", {
        name,
        email,
        password,
      })
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function labelClass(field) {
    return `block text-sm font-medium mb-1.5 ${fieldErrors[field] ? "text-rose-500" : "text-slate-700"}`
  }

  return (
    <div className="min-h-screen flex bg-[#FAFAF8]">
      <div className="hidden lg:flex lg:w-1/2 bg-[#1E1B4B] text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl bg-[#F59E0B]"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <span className="w-9 h-9 rounded-lg bg-white text-[#1E1B4B] flex items-center justify-center font-bold">
              E
            </span>
            EduSmart
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Start learning something new today.
          </h1>
          <p className="text-white/60 text-base leading-relaxed">
            Create a free student account to enroll in courses, track your
            progress, and earn certificates.
          </p>
        </div>

        <div className="relative z-10 text-white/40 text-sm">
          AI Powered Learning Management System
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 text-xl font-semibold text-[#1E1B4B] mb-8">
            <span className="w-9 h-9 rounded-lg bg-[#1E1B4B] text-white flex items-center justify-center font-bold">
              E
            </span>
            EduSmart
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h2>
          <p className="text-slate-500 mb-8">Join as a student and start learning.</p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-rose-50 text-rose-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label className={labelClass("name")}>
                Full name {fieldErrors.name && <span className="text-rose-500">*</span>}
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition-shadow"
                />
              </div>
              {fieldErrors.name && (
                <p className="text-sm text-rose-500 mt-1.5">{fieldErrors.name}</p>
              )}
            </div>

            <div>
              <label className={labelClass("email")}>
                Email address {fieldErrors.email && <span className="text-rose-500">*</span>}
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition-shadow"
                />
              </div>
              {fieldErrors.email && (
                <p className="text-sm text-rose-500 mt-1.5">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className={labelClass("password")}>
                Password {fieldErrors.password && <span className="text-rose-500">*</span>}
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full pl-11 pr-11 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-sm text-rose-500 mt-1.5">{fieldErrors.password}</p>
              )}
            </div>

            <div>
              <label className={labelClass("confirmPassword")}>
                Confirm password {fieldErrors.confirmPassword && <span className="text-rose-500">*</span>}
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full pl-11 pr-11 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="text-sm text-rose-500 mt-1.5">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-[#F59E0B] hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-slate-900 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage