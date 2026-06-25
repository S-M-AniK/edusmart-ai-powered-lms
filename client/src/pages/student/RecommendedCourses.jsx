import DashboardLayout from "../../components/DashboardLayout"
import { Sparkles, Star, Clock } from "lucide-react"

const recommended = [
  { name: "Node.js Backend Mastery", teacher: "Arif Chowdhury", rating: 4.8, hours: "16h", reason: "Based on your React course", image: "from-green-400 to-green-600" },
  { name: "Database Design Essentials", teacher: "Mou Akhter", rating: 4.7, hours: "14h", reason: "Popular with Python students", image: "from-indigo-400 to-indigo-600" },
  { name: "Figma for UI Design", teacher: "Imran Hossain", rating: 4.9, hours: "10h", reason: "Goes well with UI/UX Basics", image: "from-pink-400 to-pink-600" },
  { name: "Git & GitHub for Teams", teacher: "Tanvir Ahmed", rating: 4.6, hours: "8h", reason: "Trending this month", image: "from-orange-400 to-orange-600" },
]

function RecommendedCourses() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles size={22} className="text-[#F59E0B]" />
          Recommended For You
        </h1>
        <p className="text-slate-500 mt-1">Picked based on your learning history.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {recommended.map((course) => (
          <div
            key={course.name}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className={`h-32 bg-gradient-to-br ${course.image}`}></div>
            <div className="p-5">
              <span className="inline-block text-xs font-medium text-[#6366F1] bg-[#6366F1]/10 px-2 py-1 rounded-full mb-2">
                {course.reason}
              </span>
              <h3 className="font-semibold text-slate-900 mb-1">{course.name}</h3>
              <p className="text-sm text-slate-500 mb-3">by {course.teacher}</p>

              <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {course.hours}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-amber-400 fill-amber-400" /> {course.rating}
                </span>
              </div>

              <button className="w-full py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 transition-opacity">
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}

export default RecommendedCourses