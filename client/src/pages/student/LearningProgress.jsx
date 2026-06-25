import DashboardLayout from "../../components/DashboardLayout"
import { TrendingUp } from "lucide-react"

const progressData = [
  { name: "React for Beginners", progress: 80, lessonsCompleted: 16, totalLessons: 20 },
  { name: "UI/UX Design Basics", progress: 45, lessonsCompleted: 9, totalLessons: 20 },
  { name: "Python Data Science", progress: 100, lessonsCompleted: 24, totalLessons: 24 },
  { name: "Cyber Security Fundamentals", progress: 20, lessonsCompleted: 4, totalLessons: 20 },
  { name: "Mobile App Development", progress: 60, lessonsCompleted: 12, totalLessons: 20 },
]

function LearningProgress() {
  const overallProgress = Math.round(
    progressData.reduce((sum, c) => sum + c.progress, 0) / progressData.length
  )

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Learning Progress</h1>
        <p className="text-slate-500 mt-1">Track how far you've come in each course.</p>
      </div>

      <div className="bg-[#1E1B4B] rounded-xl p-6 mb-8 text-white flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm mb-1">Overall Progress</p>
          <p className="text-3xl font-bold">{overallProgress}%</p>
        </div>
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
          <TrendingUp size={24} className="text-[#F59E0B]" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        {progressData.map((course) => (
          <div key={course.name}>
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-slate-900">{course.name}</p>
              <span className="text-sm text-slate-500">
                {course.lessonsCompleted}/{course.totalLessons} lessons
              </span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6366F1] rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}

export default LearningProgress