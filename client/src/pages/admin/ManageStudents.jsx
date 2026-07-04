import { useState, useEffect } from "react"
import axios from "axios"
import AdminLayout from "../../components/AdminLayout"
import { Search, Trash2, Mail, Plus, X } from "lucide-react"

function ManageStudents() {
  const [students, setStudents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchStudents()
  }, [])

  async function fetchStudents() {
    try {
      const res = await axios.get("http://localhost:8000/api/users/students")
      setStudents(res.data.students)
    } catch (err) {
      console.error("Failed to fetch students:", err)
    }
  }

  async function handleCreate(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await axios.post("http://localhost:8000/api/users/students", { name, email })
      setName("")
      setEmail("")
      setShowModal(false)
      fetchStudents()
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this student?")) return
    try {
      await axios.delete(`http://localhost:8000/api/users/students/${id}`)
      fetchStudents()
    } catch (err) {
      console.error("Failed to delete student:", err)
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Students</h1>
          <p className="text-slate-500 mt-1">View and manage registered students.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      <div className="relative mb-5" style={{ animation: "fadeIn 0.6s ease-out 0.05s both" }}>
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search students"
          className="pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1] w-72 transition-shadow"
        />
      </div>

      <div
        className="bg-white rounded-xl border border-slate-200 overflow-hidden"
        style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-slate-500">
              <th className="px-6 py-3 font-medium">Student</th>
              <th className="px-6 py-3 font-medium">Joined</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-slate-400">
                  No students yet.
                </td>
              </tr>
            ) : (
              students.map((student, i) => (
                <tr
                  key={student.id}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors duration-150"
                  style={{ animation: `fadeIn 0.3s ease-out ${i * 0.06}s both` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-sm font-medium">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{student.name}</p>
                        <p className="text-xs text-slate-400">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(student.created_at).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric"
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-slate-400 hover:text-[#6366F1] hover:scale-110 transition-all">
                        <Mail size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-slate-400 hover:text-rose-500 hover:scale-110 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" style={{ animation: "fadeIn 0.2s ease-out" }}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-900">Add New Student</h2>
              <button onClick={() => { setShowModal(false); setError("") }} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-lg bg-rose-50 text-rose-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Student's full name"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                />
              </div>
              <p className="text-xs text-slate-400">
                Default password: <strong>student123</strong> — student can change it after first login.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Student Account"}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default ManageStudents