import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, User, GraduationCap, BookOpen, ShieldCheck } from "lucide-react"

const roles = [
  { key: "student", label: "Student", icon: GraduationCap, accent: "#F59E0B" },
  { key: "teacher", label: "Teacher", icon: BookOpen, accent: "#10B981" },
  { key: "admin", label: "Admin", icon: ShieldCheck, accent: "#6366F1" },
]

function RegisterPage() {
  const [activeRole, setActiveRole] = useState("student")
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const currentRole = roles.find((r) => r.key === activeRole)

  function handleSubmit(e) {
    e.preventDefault()
    console.log("Register attempt:", { role: activeRole, name, email, password })
  }

  return (
    <div className="min-h-screen flex bg-[#FAFAF8]">
      <div className="hidden lg:flex lg:w-1/2 bg-[#1E1B4B] text-white flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl transition-colors duration-500"
          style={{ backgroundColor: currentRole.accent }}
        ></div>

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
            Join a platform built for how you learn and teach.
          </h1>
          <p className="text-white/60 text-base leading-relaxed">
            Create your account and pick the role that fits you, we'll set up
            the right dashboard automatically.
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
          <p className="text-slate-500 mb-8">Choose your role to get started.</p>

          <div className="grid grid-cols-3 gap-2 mb-8 p-1 bg-slate-100 rounded-xl">
            {roles.map((role) => {
              const Icon = role.icon
              const isActive = activeRole === role.key
              return (
                <button
                  key={role.key}
                  type="button"
                  onClick={() => setActiveRole(role.key)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white shadow-sm text-slate-900"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Icon
                    size={18}
                    style={{ color: isActive ? role.accent : undefined }}
                  />
                  {role.label}
                </button>
              )
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Full name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition-shadow"
                  onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${currentRole.accent}`)}
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition-shadow"
                  onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${currentRole.accent}`)}
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full pl-11 pr-11 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition-shadow"
                  onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${currentRole.accent}`)}
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: currentRole.accent }}
            >
              Create {currentRole.label} account
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