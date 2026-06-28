import AdminLayout from "../../components/AdminLayout"
import { Users, GraduationCap, BookOpen, DollarSign } from "lucide-react"

const stats = [
  { label: "Total Students", value: 1248, icon: Users, accent: "#6366F1" },
  { label: "Total Teachers", value: 36, icon: GraduationCap, accent: "#10B981" },
  { label: "Total Courses", value: 84, icon: BookOpen, accent: "#F59E0B" },
  { label: "Total Revenue", value: "$24,500", icon: DollarSign, accent: "#EC4899" },
]

const recentActivity = [
  { text: "New teacher account created: Mou Akhter", time: "1 hour ago" },
  { text: "Course 'Cloud Computing Basics' submitted for approval", time: "4 hours ago" },
  { text: "Student review flagged for moderation", time: "1 day ago" },
]

function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Admin Overview</h1>
        <p className="text-slate-500 mt-1">Platform-wide statistics and activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-200 p-5 flex items-start justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              style={{ animation: `fadeIn 0.6s ease-out ${i * 0.1}s both` }}
            >
              <div>
                <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.accent}1A` }}
              >
                <Icon size={20} style={{ color: stat.accent }} />
              </div>
            </div>
          )
        })}
      </div>

      <div
        className="bg-white rounded-xl border border-slate-200 p-6"
        style={{ animation: "fadeIn 0.6s ease-out 0.3s both" }}
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-5">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-center justify-between border-b border-slate-50 last:border-0 pb-4 last:pb-0">
              <p className="text-sm text-slate-700">{activity.text}</p>
              <span className="text-xs text-slate-400 whitespace-nowrap ml-4">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard