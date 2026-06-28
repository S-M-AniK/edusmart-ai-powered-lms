import { useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import { User, Mail, Lock, Camera, Shield } from "lucide-react"

function AdminProfile() {
  const [name, setName] = useState("Admin User")
  const [email, setEmail] = useState("admin@edusmart.com")

  function handleSave(e) {
    e.preventDefault()
    console.log("Admin profile updated:", { name, email })
  }

  return (
    <AdminLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-500 mt-1">Manage your admin account information.</p>
      </div>

      <div
        className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl"
        style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-2xl font-bold relative">
            A
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:scale-110 transition-transform">
              <Camera size={14} className="text-slate-600" />
            </button>
          </div>
          <div>
            <p className="font-semibold text-slate-900">{name}</p>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <Shield size={13} className="text-[#6366F1]" />
              Administrator
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-shadow"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-shadow"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-sm font-medium text-slate-700 mb-3">Change password</p>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="New password"
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-shadow"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all"
          >
            Save Changes
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}

export default AdminProfile