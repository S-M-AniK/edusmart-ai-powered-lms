import TeacherLayout from "../../components/TeacherLayout"
import { BookOpen, Users, Star, DollarSign } from "lucide-react"

const stats = [
  { label: "Total Courses", value: 8, icon: BookOpen, accent: "#10B981" },
  { label: "Total Students", value: 342, icon: Users, accent: "#6366F1" },
  { label: "Average Rating", value: "4.8", icon: Star, accent: "#F59E0B" },
  { label: "Total Earnings", value: "$2,140", icon: DollarSign, accent: "#EC4899" },
]

const recentActivity = [
  { text: "New student enrolled in React for Beginners", time: "2 hours ago" },
  { text: "You received a new review on UI/UX Design Basics", time: "5 hours ago" },
  { text: "Assignment submitted by Tanvir Ahmed", time: "1 day ago" },
]

function TeacherDashboard() {
  return (
    <TeacherLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, Teacher</h1>
        <p className="text-slate-500 mt-1">Here's how your courses are performing.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-200 p-5 flex items-start justify-between"
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

      <div className="bg-white rounded-xl border border-slate-200 p-6">
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
    </TeacherLayout>
  )
}

export default TeacherDashboard