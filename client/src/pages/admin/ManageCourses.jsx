import { useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Search, Trash2, CheckCircle, XCircle } from "lucide-react"

const initialCourses = [
  { name: "React for Beginners", teacher: "Sarah Khan", students: 128, status: "Published" },
  { name: "Advanced State Management", teacher: "Sarah Khan", students: 64, status: "Published" },
  { name: "React Native Crash Course", teacher: "Sarah Khan", students: 0, status: "Pending" },
  { name: "UI/UX Design Basics", teacher: "Imran Hossain", students: 96, status: "Published" },
  { name: "Python Data Science", teacher: "Nadia Islam", students: 142, status: "Pending" },
]

function ManageCourses() {
  const [courses, setCourses] = useState(initialCourses)

  function updateStatus(name, status) {
    setCourses((prev) => prev.map((c) => (c.name === name ? { ...c, status } : c)))
  }

  function handleDelete(name) {
    setCourses((prev) => prev.filter((c) => c.name !== name))
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Courses</h1>
          <p className="text-slate-500 mt-1">Review, approve, and manage all platform courses.</p>
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses"
            className="pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] w-64 transition-shadow"
          />
        </div>
      </div>

      <div
        className="bg-white rounded-xl border border-slate-200 overflow-hidden"
        style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-slate-500">
              <th className="px-6 py-3 font-medium">Course</th>
              <th className="px-6 py-3 font-medium">Teacher</th>
              <th className="px-6 py-3 font-medium">Students</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, i) => (
              <tr
                key={course.name}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors duration-150"
                style={{ animation: `fadeIn 0.4s ease-out ${i * 0.06}s both` }}
              >
                <td className="px-6 py-4 font-medium text-slate-900">{course.name}</td>
                <td className="px-6 py-4 text-slate-600">{course.teacher}</td>
                <td className="px-6 py-4 text-slate-600">{course.students}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      course.status === "Published"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    {course.status === "Pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(course.name, "Published")}
                          className="text-slate-400 hover:text-emerald-500 hover:scale-110 transition-all"
                          title="Approve"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => updateStatus(course.name, "Rejected")}
                          className="text-slate-400 hover:text-amber-500 hover:scale-110 transition-all"
                          title="Reject"
                        >
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(course.name)}
                      className="text-slate-400 hover:text-rose-500 hover:scale-110 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default ManageCourses