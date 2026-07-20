import { useState } from "react"
import TeacherLayout from "../../components/TeacherLayout"
import { Megaphone, Plus, Send } from "lucide-react"

const initialAnnouncements = [
  { title: "Assignment Deadline Extended", course: "React for Beginners", date: "Jun 22, 2026" },
  { title: "New Lecture Added: Hooks Deep Dive", course: "React for Beginners", date: "Jun 18, 2026" },
  { title: "Course Update: New Section Added", course: "Advanced State Management", date: "Jun 10, 2026" },
]

function Announcements() {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [announcements, setAnnouncements] = useState(initialAnnouncements)

  function validate() {
    const newErrors = {}
    if (!title.trim()) newErrors.title = "Title is required"
    if (!message.trim()) newErrors.message = "Message is required"
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setAnnouncements(prev => [
      { title, course: "All Courses", date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
      ...prev
    ])
    setSubmitted(true)
    setTitle("")
    setMessage("")
    setErrors({})
    setTimeout(() => setSubmitted(false), 3000)
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
        <div className="bg-white rounded-xl border border-slate-200 p-6" style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}>
          <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Plus size={18} className="text-[#10B981]" />
            New Announcement
          </h2>

          {submitted && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-emerald-50 text-emerald-600 text-sm font-medium">
              ✅ Announcement posted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Title {errors.title && <span className="text-rose-500">*</span>}
              </label>
              <input type="text" value={title}
                onChange={e => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: "" })) }}
                placeholder="e.g. Assignment Deadline Extended"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-shadow ${errors.title ? "border-rose-400 bg-rose-50" : "border-slate-200"}`} />
              {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Message {errors.message && <span className="text-rose-500">*</span>}
              </label>
              <textarea value={message}
                onChange={e => { setMessage(e.target.value); setErrors(prev => ({ ...prev, message: "" })) }}
                rows={5} placeholder="Write your announcement here..."
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#10B981] resize-none transition-shadow ${errors.message ? "border-rose-400 bg-rose-50" : "border-slate-200"}`} />
              {errors.message && <p className="text-rose-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <button type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white bg-[#10B981] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all">
              <Send size={16} />
              Post Announcement
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6" style={{ animation: "fadeIn 0.6s ease-out 0.2s both" }}>
          <h2 className="font-semibold text-slate-900 mb-4">Past Announcements</h2>
          <div className="space-y-3">
            {announcements.map((a, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
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