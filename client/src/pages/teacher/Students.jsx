import TeacherLayout from "../../components/TeacherLayout"
import { Search, Mail } from "lucide-react"

const students = [
  { name: "Tanvir Ahmed", email: "tanvir@example.com", course: "React for Beginners", progress: 80 },
  { name: "Nusrat Jahan", email: "nusrat@example.com", course: "React for Beginners", progress: 45 },
  { name: "Rifat Karim", email: "rifat@example.com", course: "Advanced State Management", progress: 100 },
  { name: "Farha Rahman", email: "farha@example.com", course: "React for Beginners", progress: 20 },
]

function Students() {
  return (
    <TeacherLayout>
      <div className="flex items-center justify-between mb-8" style={{ animation: "fadeIn 0.4s ease-out" }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Students</h1>
          <p className="text-slate-500 mt-1">Students enrolled across your courses.</p>
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search students"
            className="pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] w-64 transition-shadow"
          />
        </div>
      </div>

      <div
        className="bg-white rounded-xl border border-slate-200 overflow-hidden"
        style={{ animation: "fadeIn 0.4s ease-out 0.1s both" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-slate-500">
              <th className="px-6 py-3 font-medium">Student</th>
              <th className="px-6 py-3 font-medium">Course</th>
              <th className="px-6 py-3 font-medium">Progress</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => (
              <tr
                key={student.email}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors duration-150"
                style={{ animation: `fadeIn 0.3s ease-out ${i * 0.06}s both` }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#10B981] text-white flex items-center justify-center text-sm font-medium">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{student.name}</p>
                      <p className="text-xs text-slate-400">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{student.course}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 w-32">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#10B981] rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-500">{student.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-[#10B981] hover:scale-110 transition-all">
                    <Mail size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TeacherLayout>
  )
}

export default Students