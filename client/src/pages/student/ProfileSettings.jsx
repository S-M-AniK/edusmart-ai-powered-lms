import { useState } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import { User, Mail, Lock, Camera } from "lucide-react"

function ProfileSettings() {
  const [name, setName] = useState("Siam Mehedi Anik")
  const [email, setEmail] = useState("siam@example.com")
  const [bio, setBio] = useState("CSE student passionate about full-stack development.")

  function handleSave(e) {
    e.preventDefault()
    console.log("Profile updated:", { name, email, bio })
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
        <p className="text-slate-500 mt-1">Manage your personal information.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-2xl font-bold relative">
            S
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center">
              <Camera size={14} className="text-slate-600" />
            </button>
          </div>
          <div>
            <p className="font-semibold text-slate-900">{name}</p>
            <p className="text-sm text-slate-500">Student</p>
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
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
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
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-sm font-medium text-slate-700 mb-3">Change password</p>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="New password"
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default ProfileSettings