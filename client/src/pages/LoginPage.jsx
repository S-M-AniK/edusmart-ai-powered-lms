import { useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    console.log("Login attempt:", { email, password })
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

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-shadow"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-[#6366F1]">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
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
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-[#6366F1] hover:opacity-90 transition-opacity"
            >
              Sign in
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