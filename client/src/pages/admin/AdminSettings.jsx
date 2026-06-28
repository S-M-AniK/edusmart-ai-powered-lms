import { useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Globe, Mail, Save, Bell } from "lucide-react"

function AdminSettings() {
  const [siteName, setSiteName] = useState("EduSmart")
  const [supportEmail, setSupportEmail] = useState("support@edusmart.com")
  const [allowRegistration, setAllowRegistration] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  function handleSave(e) {
    e.preventDefault()
    console.log("Settings saved:", { siteName, supportEmail, allowRegistration, emailNotifications })
  }

  return (
    <AdminLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage platform-wide configuration.</p>
      </div>

      <div
        className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl"
        style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
              <Globe size={14} className="text-slate-400" />
              Site Name
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-shadow"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
              <Mail size={14} className="text-slate-400" />
              Support Email
            </label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-shadow"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between pt-4">
              <div>
                <p className="text-sm font-medium text-slate-900">Allow Student Registration</p>
                <p className="text-xs text-slate-500">Let new students sign up from the public site.</p>
              </div>
              <button
                type="button"
                onClick={() => setAllowRegistration(!allowRegistration)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  allowRegistration ? "bg-[#6366F1]" : "bg-slate-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                    allowRegistration ? "left-5.5" : "left-0.5"
                  }`}
                  style={{ left: allowRegistration ? "22px" : "2px" }}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                  <p className="text-xs text-slate-500">Send system emails for key events.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  emailNotifications ? "bg-[#6366F1]" : "bg-slate-200"
                }`}
              >
                <span
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                  style={{ left: emailNotifications ? "22px" : "2px" }}
                ></span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all"
          >
            <Save size={16} />
            Save Settings
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}

export default AdminSettings