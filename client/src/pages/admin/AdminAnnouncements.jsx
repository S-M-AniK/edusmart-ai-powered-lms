import { useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Megaphone, Send, Users } from "lucide-react"

const announcements = [
  { title: "Platform Maintenance Scheduled", audience: "All Users", date: "Jun 25, 2026" },
  { title: "New Payment Gateway Added", audience: "Teachers", date: "Jun 18, 2026" },
  { title: "Summer Learning Challenge Starts!", audience: "Students", date: "Jun 10, 2026" },
]

function AdminAnnouncements() {
  const [title, setTitle] = useState("")
  const [audience, setAudience] = useState("All Users")
  const [message, setMessage] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    console.log("New platform announcement:", { title, audience, message })
    setTitle("")
    setMessage("")
  }

  return (
    <AdminLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Megaphone size={22} className="text-[#6366F1]" />
          Announcements
        </h1>
        <p className="text-slate-500 mt-1">Send platform-wide announcements to users.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="bg-white rounded-xl border border-slate-200 p-6"
          style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}
        >
          <h2 className="font-semibold text-slate-900 mb-4">New Announcement</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Announcement title"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-shadow"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
                <Users size={14} className="text-slate-400" />
                Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] transition-shadow"
              >
                <option>All Users</option>
                <option>Students</option>
                <option>Teachers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Write your announcement..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] resize-none transition-shadow"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all"
            >
              <Send size={16} />
              Send Announcement
            </button>
          </form>
        </div>

        <div
          className="bg-white rounded-xl border border-slate-200 p-6"
          style={{ animation: "fadeIn 0.6s ease-out 0.2s both" }}
        >
          <h2 className="font-semibold text-slate-900 mb-4">Past Announcements</h2>
          <div className="space-y-3">
            {announcements.map((a, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                <p className="font-medium text-slate-900 text-sm mb-1">{a.title}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#6366F1] bg-[#6366F1]/10 px-2 py-0.5 rounded-full">
                    {a.audience}
                  </span>
                  <p className="text-xs text-slate-400">{a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminAnnouncements