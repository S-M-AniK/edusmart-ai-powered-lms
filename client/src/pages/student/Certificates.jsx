import { useState, useEffect } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import { Award, Download } from "lucide-react"

function Certificates() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "{}") 
    setUser(u)
    if (u?.id) {
      fetch(`http://localhost:8000/api/certificates/student/${u.id}`)
        .then(res => res.json())
        .then(data => { setCertificates(data.certificates || []); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [])

  function handleDownload(studentId, courseId) {
    window.open(`http://localhost:8000/api/certificates/generate/${studentId}/${courseId}`, "_blank")
  }

  return (
    <DashboardLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Certificates</h1>
        <p className="text-slate-500 mt-1">Your earned certificates of completion.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading certificates...</div>
      ) : certificates.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Award size={40} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">You haven't earned any certificates yet.</p>
          <p className="text-slate-400 text-sm mt-2">Complete a course to earn your certificate!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {certificates.map((cert, i) => (
            <div key={cert.id} className="bg-white rounded-xl border border-slate-200 p-6 flex items-start gap-4 hover:shadow-md transition-shadow duration-300"
              style={{ animation: `fadeIn 0.6s ease-out ${i * 0.1}s both` }}>
              <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center shrink-0">
                <Award size={22} className="text-[#F59E0B]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">{cert.course_title}</h3>
                <p className="text-sm text-slate-500 mb-1">Instructor: {cert.teacher_name}</p>
                <p className="text-sm text-slate-400 mb-4">
                  Issued on {new Date(cert.issued_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <button onClick={() => handleDownload(cert.student_id, cert.course_id)}
                  className="flex items-center gap-2 text-sm font-medium text-[#6366F1] hover:underline">
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