import { useState, useEffect } from "react"
import TeacherLayout from "../../components/TeacherLayout"
import { Users, Star, Plus, Trash2, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { getTeacherCourses, deleteCourse } from "../../api/courses"
import toast from "react-hot-toast"

function MyCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user?.id) {
      getTeacherCourses(user.id)
        .then(res => { setCourses(res.data.courses); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [])

  async function handleDelete(id) {
    if (!window.confirm("Delete this course?")) return
    try {
      await deleteCourse(id)
      setCourses(prev => prev.filter(c => c.id !== id))
      toast.success("Course deleted!")
    } catch (err) {
      toast.error("Failed to delete course!")
    }
  }

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase())
  )

  const gradients = ["from-indigo-400 to-indigo-600", "from-emerald-400 to-emerald-600", "from-amber-400 to-amber-600", "from-rose-400 to-rose-600", "from-purple-400 to-purple-600"]

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between mb-6" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Courses</h1>
          <p className="text-slate-500 mt-1">Manage the courses you teach.</p>
        </div>
        <Link to="/teacher/courses/create"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-[#10B981] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all">
          <Plus size={18} />
          New Course
        </Link>
      </div>

      <div className="relative mb-6" style={{ animation: "fadeIn 0.6s ease-out 0.05s both" }}>
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)}
          className="pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] w-72 transition-shadow" />
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading courses...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          {courses.length === 0 ? (
            <>
              <p className="text-lg font-medium mb-4">No courses yet</p>
              <Link to="/teacher/courses/create" className="px-6 py-3 bg-[#10B981] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                Create Your First Course
              </Link>
            </>
          ) : "No courses match your search"}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course, i) => (
            <div key={course.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{ animation: `fadeIn 0.6s ease-out ${i * 0.08}s both` }}>
              <div className={`h-32 bg-linear-to-br ${gradients[i % gradients.length]} relative`}>
                <span className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full ${
                  course.status === "published" ? "bg-white/90 text-emerald-600" :
                  course.status === "rejected" ? "bg-white/90 text-rose-600" :
                  "bg-white/90 text-amber-600"}`}>
                  {course.status}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-1">{course.title}</h3>
                <p className="text-xs text-slate-400 mb-3">{course.category} • {course.level}</p>

                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Users size={14} /> {course.enrollments || 0} students
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" /> 4.5
                  </span>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleDelete(course.id)}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-rose-500 border border-rose-200 hover:bg-rose-50 transition-all text-sm">
                    <Trash2 size={14} />
                    Delete
                  </button>
                  <Link to={`/teacher/courses/edit/${course.id}`}
                       className="flex-1 py-2 rounded-lg font-medium text-center text-[#10B981] border border-[#10B981] hover:bg-[#10B981] hover:text-white transition-all duration-200 text-sm">
                       Manage
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </TeacherLayout>
  )
}

export default MyCourses