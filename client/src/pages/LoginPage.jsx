import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const errors = {}
    if (!email.trim()) errors.email = "This email field needs to be filled out"
    if (!password.trim()) errors.password = "This password field needs to be filled out"
    return errors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setLoading(true)
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))

      const role = res.data.user.role
      if (role === "teacher") {
        navigate("/teacher/dashboard")
      } else if (role === "admin") {
        navigate("/admin/dashboard")
      } else {
        navigate("/student/dashboard")
      }
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
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl bg-[#6366F1]"></div>

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
            Learning, organized around the people who do it.
          </h1>
          <p className="text-white/60 text-base leading-relaxed">
            One platform for students, teachers, and administrators to manage
            courses, track progress, and stay connected.
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

          <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
          <p className="text-slate-500 mb-8">Sign in to continue to your dashboard.</p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-rose-50 text-rose-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-shadow"
                />
              </div>
              {fieldErrors.email && (
                <p className="text-sm text-rose-500 mt-1.5">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={labelClass("password").replace("mb-1.5", "")}>
                  Password {fieldErrors.password && <span className="text-rose-500">*</span>}
                </label>
                <a href="#" className="text-sm font-medium text-[#6366F1]">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-shadow"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white bg-[#6366F1] hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have an account?{" "}
            <a href="/register" className="font-medium text-slate-900 hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage