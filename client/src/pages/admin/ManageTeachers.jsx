import { useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Plus, Search, Mail, Trash2, X } from "lucide-react"

const initialTeachers = [
  { name: "Sarah Khan", email: "sarah.khan@example.com", courses: 3, students: 192 },
  { name: "Imran Hossain", email: "imran@example.com", courses: 2, students: 88 },
  { name: "Nadia Islam", email: "nadia@example.com", courses: 1, students: 64 },
]

function ManageTeachers() {
  const [teachers, setTeachers] = useState(initialTeachers)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  function handleCreate(e) {
    e.preventDefault()
    setTeachers((prev) => [...prev, { name, email, courses: 0, students: 0 }])
    setName("")
    setEmail("")
    setShowModal(false)
  }

  function handleDelete(email) {
    setTeachers((prev) => prev.filter((t) => t.email !== email))
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Teachers</h1>
          <p className="text-slate-500 mt-1">Create and manage teacher accounts.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all"
        >
          <Plus size={18} />
          Add Teacher
        </button>
      </div>

      <div className="relative mb-5" style={{ animation: "fadeIn 0.6s ease-out 0.05s both" }}>
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search teachers"
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
              <th className="px-6 py-3 font-medium">Teacher</th>
              <th className="px-6 py-3 font-medium">Courses</th>
              <th className="px-6 py-3 font-medium">Students</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, i) => (
              <tr
                key={teacher.email}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors duration-150"
                style={{ animation: `fadeIn 0.4s ease-out ${i * 0.06}s both` }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-sm font-medium">
                      {teacher.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{teacher.name}</p>
                      <p className="text-xs text-slate-400">{teacher.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{teacher.courses}</td>
                <td className="px-6 py-4 text-slate-600">{teacher.students}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-slate-400 hover:text-[#6366F1] hover:scale-110 transition-all">
                      <Mail size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(teacher.email)}
                      className="text-slate-400 hover:text-rose-500 hover:scale-110 transition-all"
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

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" style={{ animation: "fadeIn 0.2s ease-out" }}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-900">Add New Teacher</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Teacher's full name"
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
                  placeholder="teacher@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                />
              </div>
              <p className="text-xs text-slate-400">
                A temporary password will be emailed to the teacher upon creation.
              </p>
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 transition-opacity"
              >
                Create Teacher Account
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default ManageTeachers