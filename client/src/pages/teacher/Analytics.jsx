import { useState, useEffect } from "react"
import TeacherLayout from "../../components/TeacherLayout"
import { TrendingUp, Users, BookOpen, Star } from "lucide-react"
import { getTeacherAnalytics } from "../../api/analytics"

function Analytics() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user?.id) {
      getTeacherAnalytics(user.id)
        .then(res => { setAnalytics(res.data.analytics); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [])

  const stats = [
    { label: "Total Courses", value: analytics?.totalCourses || 0, icon: BookOpen, accent: "#10B981" },
    { label: "Total Students", value: analytics?.totalEnrollments || 0, icon: Users, accent: "#6366F1" },
    { label: "Total Reviews", value: analytics?.totalReviews || 0, icon: Star, accent: "#F59E0B" },
    { label: "Avg Rating", value: analytics?.avgRating || 0, icon: TrendingUp, accent: "#EC4899" },
  ]

  return (
    <TeacherLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500 mt-1">Track your teaching performance.</p>
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
        <h2 className="text-lg font-semibold text-slate-900 mb-5">Course Performance</h2>
        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : analytics?.courseStats?.length > 0 ? (
          <div className="space-y-4">
            {analytics.courseStats.map((course, i) => (
              <div key={i} className="flex items-center justify-between border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                <div>
                  <p className="font-medium text-slate-900">{course.title}</p>
                  <p className="text-sm text-slate-500">{course.enrollments} students</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  course.status === "published" ? "bg-emerald-100 text-emerald-600" :
                  course.status === "rejected" ? "bg-rose-100 text-rose-600" :
                  "bg-amber-100 text-amber-600"}`}>
                  {course.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">No courses yet</p>
        )}
      </div>
    </TeacherLayout>
  )
}

export default Analytics