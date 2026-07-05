import { useState, useEffect } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import { BookOpen, CheckCircle, Award, Clock } from "lucide-react"
import { getStudentAnalytics } from "../../api/analytics"
import { getStudentEnrollments } from "../../api/enrollments"

function StudentDashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "{}")
    setUser(u)
    if (u?.id) {
      Promise.all([
        getStudentAnalytics(u.id),
        getStudentEnrollments(u.id)
      ]).then(([analyticsRes, enrollmentsRes]) => {
        setAnalytics(analyticsRes.data.analytics)
        setEnrollments(enrollmentsRes.data.enrollments.slice(0, 3))
        setLoading(false)
      }).catch(() => setLoading(false))
    }
  }, [])

  const stats = [
    { label: "Total Enrolled", value: analytics?.totalEnrollments || 0, icon: BookOpen, accent: "#6366F1" },
    { label: "Completed", value: analytics?.completedCourses || 0, icon: CheckCircle, accent: "#10B981" },
    { label: "Wishlist", value: analytics?.totalWishlist || 0, icon: Award, accent: "#F59E0B" },
    { label: "Avg Progress", value: `${analytics?.avgProgress || 0}%`, icon: Clock, accent: "#EC4899" },
  ]

  return (
    <DashboardLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name || "Student"}!</h1>
        <p className="text-slate-500 mt-1">Here's an overview of your learning journey.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-5 flex items-start justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              style={{ animation: `fadeIn 0.6s ease-out ${i * 0.1}s both` }}>
              <div>
                <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{loading ? "..." : stat.value}</p>
              </div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.accent}1A` }}>
                <Icon size={20} style={{ color: stat.accent }} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6" style={{ animation: "fadeIn 0.6s ease-out 0.3s both" }}>
        <h2 className="text-lg font-semibold text-slate-900 mb-5">Continue Learning</h2>
        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : enrollments.length > 0 ? (
          <div className="space-y-4">
            {enrollments.map((enroll, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{enroll.title}</p>
                  <p className="text-sm text-slate-500">by {enroll.teacher_name}</p>
                </div>
                <div className="w-40 flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6366F1] rounded-full transition-all duration-700"
                      style={{ width: `${enroll.progress || 0}%` }} />
                  </div>
                  <span className="text-sm text-slate-500 w-10 text-right">{enroll.progress || 0}%</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">No enrolled courses yet. <a href="/courses" className="text-indigo-500 hover:underline">Browse courses</a></p>
        )}
      </div>
    </DashboardLayout>
  )
}

export default StudentDashboard