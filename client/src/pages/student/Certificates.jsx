import DashboardLayout from "../../components/DashboardLayout"
import { Award, Download } from "lucide-react"

const certificates = [
  { course: "Python Data Science", date: "May 12, 2026", instructor: "Nadia Islam" },
  { course: "UI/UX Design Basics", date: "March 3, 2026", instructor: "Imran Hossain" },
]

function Certificates() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Certificates</h1>
        <p className="text-slate-500 mt-1">Your earned certificates of completion.</p>
      </div>

      {certificates.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Award size={40} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">You haven't earned any certificates yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {certificates.map((cert) => (
            <div
              key={cert.course}
              className="bg-white rounded-xl border border-slate-200 p-6 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
                <Award size={22} className="text-[#F59E0B]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">{cert.course}</h3>
                <p className="text-sm text-slate-500 mb-1">Instructor: {cert.instructor}</p>
                <p className="text-sm text-slate-400 mb-4">Issued on {cert.date}</p>
                <button className="flex items-center gap-2 text-sm font-medium text-[#6366F1] hover:underline">
                  <Download size={16} />
                  Download Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}

export default Certificates