import DashboardLayout from "../../components/DashboardLayout"
import { BookOpen, CheckCircle, Award, Clock } from "lucide-react"

const stats = [
  { label: "Total Enrolled Courses", value: 6, icon: BookOpen, accent: "#6366F1" },
  { label: "Completed Courses", value: 3, icon: CheckCircle, accent: "#10B981" },
  { label: "Certificates Earned", value: 2, icon: Award, accent: "#F59E0B" },
  { label: "Hours Learned", value: 42, icon: Clock, accent: "#EC4899" },
]

const recentCourses = [
  { name: "React for Beginners", progress: 80, teacher: "Sarah Khan" },
  { name: "UI/UX Design Basics", progress: 45, teacher: "Imran Hossain" },
  { name: "Python Data Science", progress: 100, teacher: "Nadia Islam" },
]

function StudentDashboard() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, Siam</h1>
        <p className="text-slate-500 mt-1">Here's an overview of your learning journey.</p>
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
        <h2 className="text-lg font-semibold text-slate-900 mb-5">Continue Learning</h2>
        <div className="space-y-4">
          {recentCourses.map((course) => (
            <div key={course.name} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-slate-900">{course.name}</p>
                <p className="text-sm text-slate-500">by {course.teacher}</p>
              </div>
              <div className="w-40 flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6366F1] rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-slate-500 w-10 text-right">{course.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default StudentDashboard
