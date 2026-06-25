import TeacherLayout from "../../components/TeacherLayout"
import { Users, Star, Pencil, Plus } from "lucide-react"
import { Link } from "react-router-dom"

const courses = [
  { name: "React for Beginners", students: 128, rating: 4.8, status: "Published", image: "from-indigo-400 to-indigo-600" },
  { name: "Advanced State Management", students: 64, rating: 4.7, status: "Published", image: "from-emerald-400 to-emerald-600" },
  { name: "React Native Crash Course", students: 0, rating: 0, status: "Draft", image: "from-amber-400 to-amber-600" },
]

function MyCourses() {
  return (
    <TeacherLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Courses</h1>
          <p className="text-slate-500 mt-1">Manage the courses you teach.</p>
        </div>
        <Link
          to="/teacher/courses/create"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-[#10B981] hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          New Course
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <div
            key={course.name}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className={`h-32 bg-gradient-to-br ${course.image} relative`}>
              <span
                className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full ${
                  course.status === "Published"
                    ? "bg-white/90 text-emerald-600"
                    : "bg-white/90 text-amber-600"
                }`}
              >
                {course.status}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-slate-900 mb-3">{course.name}</h3>

              <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <Users size={14} /> {course.students} students
                </span>
                {course.rating > 0 && (
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" /> {course.rating}
                  </span>
                )}
              </div>

              <button className="w-full py-2.5 rounded-lg font-medium text-[#10B981] border border-[#10B981] hover:bg-[#10B981]/5 transition-colors flex items-center justify-center gap-2">
                <Pencil size={16} />
                Manage Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </TeacherLayout>
  )
}

export default MyCourses