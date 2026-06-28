import AdminLayout from "../../components/AdminLayout"
import { Award, Search, Download } from "lucide-react"

const certificates = [
  { student: "Tanvir Ahmed", course: "Python Data Science", instructor: "Nadia Islam", date: "May 12, 2026" },
  { student: "Nusrat Jahan", course: "UI/UX Design Basics", instructor: "Imran Hossain", date: "Mar 3, 2026" },
  { student: "Rifat Karim", course: "React for Beginners", instructor: "Sarah Khan", date: "Jun 1, 2026" },
  { student: "Farha Rahman", course: "Advanced State Management", instructor: "Sarah Khan", date: "Jun 15, 2026" },
  { student: "Nadim Rahman", course: "Advanced State Management", instructor: "Sarah Khan", date: "Jun 19, 2026" },
  
]

function AdminCertificates() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Certificates</h1>
          <p className="text-slate-500 mt-1">All certificates issued across the platform.</p>
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search certificates"
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
              <th className="px-6 py-3 font-medium">Student</th>
              <th className="px-6 py-3 font-medium">Course</th>
              <th className="px-6 py-3 font-medium">Instructor</th>
              <th className="px-6 py-3 font-medium">Issued</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert, i) => (
              <tr
                key={cert.student + cert.course}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors duration-150"
                style={{ animation: `fadeIn 0.4s ease-out ${i * 0.06}s both` }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                      <Award size={15} className="text-[#F59E0B]" />
                    </div>
                    <span className="font-medium text-slate-900">{cert.student}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{cert.course}</td>
                <td className="px-6 py-4 text-slate-600">{cert.instructor}</td>
                <td className="px-6 py-4 text-slate-600">{cert.date}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-[#6366F1] hover:scale-110 transition-all">
                    <Download size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default AdminCertificates
