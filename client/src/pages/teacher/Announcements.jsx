import { useState } from "react"
import TeacherLayout from "../../components/TeacherLayout"
import { Megaphone, Plus, Send } from "lucide-react"

const announcements = [
  { title: "Assignment Deadline Extended", course: "React for Beginners", date: "Jun 22, 2026" },
  { title: "New Lecture Added: Hooks Deep Dive", course: "React for Beginners", date: "Jun 18, 2026" },
  { title: "Course Update: New Section Added", course: "Advanced State Management", date: "Jun 10, 2026" },
]

function Announcements() {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    console.log("New announcement:", { title, message })
    setTitle("")
    setMessage("")
  }

  return (
    <TeacherLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Megaphone size={22} className="text-[#10B981]" />
          Announcements
        </h1>
        <p className="text-slate-500 mt-1">Share updates with your students.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="bg-white rounded-xl border border-slate-200 p-6"
          style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}
        >
          <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Plus size={18} className="text-[#10B981]" />
            New Announcement
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Assignment Deadline Extended"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Write your announcement here..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] resize-none transition-shadow"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white bg-[#10B981] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all"
            >
              <Send size={16} />
              Post Announcement
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
              <div
                key={i}
                className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200"
              >
                <p className="font-medium text-slate-900 text-sm mb-1">{a.title}</p>
                <p className="text-xs text-slate-500 mb-1">{a.course}</p>
                <p className="text-xs text-slate-400">{a.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
}

export default Announcements