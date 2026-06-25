import DashboardLayout from "../../components/DashboardLayout"
import { Search, Clock, Star } from "lucide-react"

const courses = [
  { name: "React for Beginners", teacher: "Sarah Khan", progress: 80, hours: "18h", rating: 4.8, image: "from-indigo-400 to-indigo-600" },
  { name: "UI/UX Design Basics", teacher: "Imran Hossain", progress: 45, hours: "12h", rating: 4.6, image: "from-amber-400 to-amber-600" },
  { name: "Python Data Science", teacher: "Nadia Islam", progress: 100, hours: "24h", rating: 4.9, image: "from-emerald-400 to-emerald-600" },
  { name: "Cyber Security Fundamentals", teacher: "Tanvir Ahmed", progress: 20, hours: "15h", rating: 4.5, image: "from-rose-400 to-rose-600" },
  { name: "Mobile App Development", teacher: "Farha Rahman", progress: 60, hours: "20h", rating: 4.7, image: "from-sky-400 to-sky-600" },
  { name: "Machine Learning Intro", teacher: "Kamal Uddin", progress: 10, hours: "30h", rating: 4.9, image: "from-violet-400 to-violet-600" },
]

function MyCourses() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Courses</h1>
          <p className="text-slate-500 mt-1">Continue where you left off.</p>
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search your courses"
            className="pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <div
            key={course.name}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className={`h-32 bg-gradient-to-br ${course.image}`}></div>
            <div className="p-5">
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

              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">Progress</span>
                <span className="font-medium text-slate-900">{course.progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6366F1] rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}

export default MyCourses