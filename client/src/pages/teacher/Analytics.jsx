import TeacherLayout from "../../components/TeacherLayout"
import { TrendingUp, Users, DollarSign, Star } from "lucide-react"

const monthlyData = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 55 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 70 },
  { month: "May", value: 65 },
  { month: "Jun", value: 90 },
]

const courseBreakdown = [
  { name: "React for Beginners", students: 128, revenue: "$1,280" },
  { name: "Advanced State Management", students: 64, revenue: "$640" },
  { name: "React Native Crash Course", students: 0, revenue: "$0" },
]

function Analytics() {
  const maxValue = Math.max(...monthlyData.map((d) => d.value))

  return (
    <TeacherLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500 mt-1">Track your teaching performance over time.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[
          { label: "Enrollment Growth", value: "+24%", icon: TrendingUp, accent: "#10B981" },
          { label: "Total Students", value: "192", icon: Users, accent: "#6366F1" },
          { label: "Total Revenue", value: "$1,920", icon: DollarSign, accent: "#F59E0B" },
        ].map((stat, i) => {
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
        className="bg-white rounded-xl border border-slate-200 p-6 mb-6"
        style={{ animation: "fadeIn 0.6s ease-out 0.3s both" }}
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Monthly Enrollments</h2>
        <div className="flex items-end justify-between gap-3 h-48">
          {monthlyData.map((data, i) => (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-[#10B981] rounded-t-md transition-all duration-700 ease-out hover:bg-[#0d9668]"
                style={{
                  height: `${(data.value / maxValue) * 100}%`,
                  animation: `fadeIn 0.6s ease-out ${0.4 + i * 0.06}s both`,
                }}
              ></div>
              <span className="text-xs text-slate-500">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="bg-white rounded-xl border border-slate-200 p-6"
        style={{ animation: "fadeIn 0.6s ease-out 0.4s both" }}
      >
        <h2 className="text-lg font-semibold text-slate-900 mb-5">Revenue by Course</h2>
        <div className="space-y-4">
          {courseBreakdown.map((course) => (
            <div key={course.name} className="flex items-center justify-between border-b border-slate-50 last:border-0 pb-4 last:pb-0">
              <div>
                <p className="font-medium text-slate-900">{course.name}</p>
                <p className="text-sm text-slate-500">{course.students} students</p>
              </div>
              <span className="font-semibold text-slate-900">{course.revenue}</span>
            </div>
          ))}
        </div>
      </div>
    </TeacherLayout>
  )
}

export default Analytics
