import { useState, useEffect } from "react"
import AdminLayout from "../../components/AdminLayout"
import { TrendingUp, Users, BookOpen, Star } from "lucide-react"
import { getAdminAnalytics } from "../../api/analytics"

function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAdminAnalytics()
      .then(res => { setAnalytics(res.data.analytics); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const stats = [
    { label: "Total Users", value: analytics?.totalUsers || 0, icon: Users, accent: "#6366F1" },
    { label: "Total Courses", value: analytics?.totalCourses || 0, icon: BookOpen, accent: "#10B981" },
    { label: "Total Enrollments", value: analytics?.totalEnrollments || 0, icon: TrendingUp, accent: "#F59E0B" },
    { label: "Pending Reviews", value: analytics?.pendingReviews || 0, icon: Star, accent: "#EC4899" },
  ]

  return (
    <AdminLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500 mt-1">Platform-wide growth and performance.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6" style={{ animation: "fadeIn 0.6s ease-out 0.3s both" }}>
          <h2 className="text-lg font-semibold text-slate-900 mb-5">Courses by Category</h2>
          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : analytics?.coursesByCategory?.length > 0 ? (
            <div className="space-y-4">
              {analytics.coursesByCategory.map(cat => {
                const max = Math.max(...analytics.coursesByCategory.map(c => parseInt(c.count)))
                const width = (parseInt(cat.count) / max) * 100
                return (
                  <div key={cat.category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700">{cat.category || "Uncategorized"}</span>
                      <span className="font-semibold text-indigo-600">{cat.count}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full">
                      <div className="h-2 bg-[#6366F1] rounded-full transition-all duration-700"
                        style={{ width: `${width}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No data yet</p>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6" style={{ animation: "fadeIn 0.6s ease-out 0.4s both" }}>
          <h2 className="text-lg font-semibold text-slate-900 mb-5">Users by Role</h2>
          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : analytics?.usersByRole?.length > 0 ? (
            <div className="space-y-4">
              {analytics.usersByRole.map(role => {
                const max = Math.max(...analytics.usersByRole.map(r => parseInt(r.count)))
                const width = (parseInt(role.count) / max) * 100
                const colors = { admin: "#6366F1", teacher: "#10B981", student: "#F59E0B" }
                return (
                  <div key={role.role}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700 capitalize">{role.role}</span>
                      <span className="font-semibold" style={{ color: colors[role.role] || "#6366F1" }}>{role.count}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full">
                      <div className="h-2 rounded-full transition-all duration-700"
                        style={{ width: `${width}%`, backgroundColor: colors[role.role] || "#6366F1" }} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No data yet</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6" style={{ animation: "fadeIn 0.6s ease-out 0.5s both" }}>
        <h2 className="text-lg font-semibold text-slate-900 mb-5">Recent Enrollments</h2>
        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : analytics?.recentEnrollments?.length > 0 ? (
          <div className="space-y-4">
            {analytics.recentEnrollments.map((enroll, i) => (
              <div key={i} className="flex items-center justify-between border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                <div>
                  <p className="font-medium text-slate-900">{enroll.student_name}</p>
                  <p className="text-sm text-slate-500">{enroll.course_title}</p>
                </div>
                <span className="text-xs text-slate-400">{new Date(enroll.enrolled_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">No enrollments yet</p>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminAnalytics