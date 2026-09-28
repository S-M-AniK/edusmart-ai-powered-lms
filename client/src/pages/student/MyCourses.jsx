import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DashboardLayout from "../../components/DashboardLayout"
import { Search, Clock, Star } from "lucide-react"
import { getStudentEnrollments } from "../../api/enrollments"

const gradientColors = [
  "linear-gradient(135deg, #818cf8, #4f46e5)",
  "linear-gradient(135deg, #fbbf24, #d97706)",
  "linear-gradient(135deg, #34d399, #059669)",
  "linear-gradient(135deg, #fb7185, #e11d48)",
  "linear-gradient(135deg, #38bdf8, #0284c7)",
  "linear-gradient(135deg, #a78bfa, #7c3aed)",
]

function MyCourses() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user?.id) {
      getStudentEnrollments(user.id)
        .then(res => { setEnrollments(res.data.enrollments); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [])

  const filtered = enrollments.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Courses</h1>
          <p className="text-slate-500 mt-1">Continue where you left off.</p>
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search your courses" value={search} onChange={e => setSearch(e.target.value)}
            className="pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] w-64" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading courses...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          {enrollments.length === 0 ? (
            <>
              <p className="text-lg font-medium mb-4">No enrolled courses yet</p>
              <a href="/courses" className="px-6 py-3 bg-[#6366F1] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                Browse Courses
              </a>
            </>
          ) : "No courses match your search"}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((enroll, i) => (
            <Link key={enroll.id} to={`/student/courses/${enroll.course_id}/content`} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 block"
              style={{ animation: `fadeIn 0.6s ease-out ${i * 0.08}s both`, textDecoration: "none", color: "inherit" }}>
              <div className="h-32 overflow-hidden">
                {enroll.thumbnail ? (
                  <img src={enroll.thumbnail} alt={enroll.title} className="w-full h-full object-cover" />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: gradientColors[i % gradientColors.length] }}></div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-1">{enroll.title}</h3>
                <p className="text-sm text-slate-500 mb-3">by {enroll.teacher_name}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {enroll.duration || "Self-paced"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" /> 4.5
                  </span>
                </div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-medium text-slate-900">{enroll.progress || 0}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#6366F1] rounded-full transition-all duration-700"
                    style={{ width: `${enroll.progress || 0}%` }} />
                </div>
                {enroll.completed && (
                  <div className="mt-3 text-center text-xs font-medium text-emerald-600 bg-emerald-50 py-1 rounded-full">
                    ✅ Completed
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}

export default MyCourses