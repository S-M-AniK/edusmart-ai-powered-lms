import { useState, useEffect } from "react"
import { Plus, Trash2, Eye, X, ChevronDown, ClipboardList, Calendar, Award, Users, Clock } from "lucide-react"
import TeacherLayout from "../../components/TeacherLayout"

export default function Assignments() {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [assignments, setAssignments] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [showSubmissions, setShowSubmissions] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [gradeData, setGradeData] = useState({})
  const [form, setForm] = useState({ title: "", description: "", due_date: "", max_marks: 100 })

  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch(`http://localhost:8000/api/courses/teacher/${user.id}`)
      .then(r => r.json())
      .then(data => setCourses(data.courses || []))
  }, [])

  useEffect(() => {
    if (!selectedCourse) return
    fetch(`http://localhost:8000/api/assignments/course/${selectedCourse}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setAssignments)
  }, [selectedCourse])

  const createAssignment = async () => {
     if (!form.title.trim() || !form.description.trim()) {
      alert("Title and Instructions are required!")
      return
    }
    const res = await fetch("http://localhost:8000/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...form, course_id: selectedCourse })
    })
    const data = await res.json()
    setAssignments([data, ...assignments])
    setShowCreate(false)
    setForm({ title: "", description: "", due_date: "", max_marks: 100 })
  }

  const deleteAssignment = async (id) => {
    await fetch(`http://localhost:8000/api/assignments/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
    setAssignments(assignments.filter(a => a.id !== id))
  }

  const viewSubmissions = async (assignment) => {
    setSelectedAssignment(assignment)
    const res = await fetch(`http://localhost:8000/api/assignments/${assignment.id}/submissions`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    setSubmissions(Array.isArray(data) ? data : [])

    setShowSubmissions(true)
  }

  const gradeSubmission = async (assignmentId, studentId) => {
    const key = `${assignmentId}-${studentId}`
    await fetch(`http://localhost:8000/api/assignments/${assignmentId}/submissions/${studentId}/grade`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(gradeData[key])
    })
    viewSubmissions(selectedAssignment)
  }

  const totalSubmissions = assignments.reduce((sum, a) => sum + parseInt(a.submission_count || 0), 0)
  const courseName = courses.find(c => c.id == selectedCourse)?.title || ""

  return (
    <TeacherLayout>
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <ClipboardList size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Assignments</h1>
              <p className="text-slate-500 text-sm">Create and manage assignments for your students</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-55"
              value={selectedCourse}
              onChange={e => setSelectedCourse(e.target.value)}
            >
              <option value="">Select a course</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
          </div>
          {selectedCourse && (
            <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 text-sm font-medium shadow-sm transition-all">
              <Plus size={16} /> New Assignment
            </button>
          )}
        </div>

        {selectedCourse && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <ClipboardList size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{assignments.length}</p>
                  <p className="text-xs text-slate-500">Total Assignments</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Users size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{totalSubmissions}</p>
                  <p className="text-xs text-slate-500">Total Submissions</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Award size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{assignments.filter(a => parseInt(a.submission_count) > 0).length}</p>
                  <p className="text-xs text-slate-500">Active Assignments</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!selectedCourse && (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ClipboardList size={28} className="text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Select a Course</h3>
            <p className="text-slate-400 text-sm">Choose a course from the dropdown to view or create assignments.</p>
          </div>
        )}

        {selectedCourse && assignments.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ClipboardList size={28} className="text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No Assignments Yet</h3>
            <p className="text-slate-400 text-sm">Create your first assignment for {courseName}.</p>
          </div>
        )}

        <div className="space-y-4">
          {assignments.map((a, i) => {
            const isOverdue = a.due_date && new Date(a.due_date) < new Date()
            return (
              <div key={a.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 p-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg leading-tight">{a.title}</h3>
                        <p className="text-slate-500 text-sm mt-1 leading-relaxed">{a.description}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => viewSubmissions(a)} className="flex items-center gap-1.5 text-indigo-600 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 text-sm font-medium transition-colors">
                          <Eye size={14} /> View Submissions
                        </button>
                        <button onClick={() => deleteAssignment(a.id)} className="text-red-500 border border-red-200 bg-red-50 p-1.5 rounded-lg hover:bg-red-100 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 mt-4 flex-wrap">
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Calendar size={14} className={isOverdue ? "text-red-400" : "text-slate-400"} />
                        <span className={isOverdue ? "text-red-500 font-medium" : ""}>
                          {a.due_date ? `Due ${new Date(a.due_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : "No deadline"}
                        </span>
                        {isOverdue && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">Overdue</span>}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Award size={14} className="text-amber-400" />
                        <span>Max Marks: <span className="font-medium text-slate-700">{a.max_marks}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Users size={14} className="text-emerald-400" />
                        <span><span className="font-medium text-slate-700">{a.submission_count}</span> submissions</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-1 bg-slate-100">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min((parseInt(a.submission_count) / 10) * 100, 100)}%` }} />
                </div>
              </div>
            )
          })}
        </div>

{showCreate && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
      <div className="flex justify-between items-center p-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Create New Assignment</h2>
          <p className="text-sm text-slate-500 mt-0.5">Add a new assignment for <span className="font-medium text-indigo-600">{courseName}</span></p>
        </div>
        <button onClick={() => setShowCreate(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
          <X size={18} />
        </button>
      </div>
      <div className="p-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Assignment Title <span className="text-red-400">*</span></label>
          <input className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Build a To-Do App using React" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Instructions <span className="text-red-400">*</span></label>
          <textarea className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" placeholder="Describe step-by-step what students need to do, what to submit, and any requirements..." rows={6} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Due Date & Time</label>
            <input type="datetime-local" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.due_date} onChange={e => setForm({ ...form, due_date: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Total Marks</label>
            <input type="number" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.max_marks} onChange={e => setForm({ ...form, max_marks: e.target.value })} />
          </div>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <p className="text-xs font-medium text-indigo-700 mb-1">📌 Tips for a great assignment</p>
          <ul className="text-xs text-indigo-600 space-y-1 list-disc list-inside">
            <li>Be specific about what needs to be submitted</li>
            <li>Mention any tools or technologies required</li>
            <li>Set a realistic deadline for students</li>
          </ul>
        </div>
        <div className="flex gap-3 pt-1">
          <button onClick={() => setShowCreate(false)} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl hover:bg-slate-50 font-medium text-sm transition-colors">
            Cancel
          </button>
          <button onClick={createAssignment} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 font-medium text-sm transition-colors">
            Create Assignment
          </button>
        </div>
      </div>
    </div>
  </div>
)}

        {showSubmissions && selectedAssignment && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[85vh] flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedAssignment.title}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{submissions.length} submission{submissions.length !== 1 ? "s" : ""} received</p>
                </div>
                <button onClick={() => setShowSubmissions(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
                  <X size={18} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-6">
                {submissions.length === 0 ? (
                  <div className="text-center py-12">
                    <Users size={32} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No submissions yet</p>
                    <p className="text-slate-400 text-sm mt-1">Students haven't submitted this assignment yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map(s => {
                      const key = `${selectedAssignment.id}-${s.student_id}`
                      return (
                        <div key={s.id} className="border border-slate-200 rounded-xl p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                                {s.student_name?.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-slate-800 text-sm">{s.student_name}</p>
                                <p className="text-xs text-slate-400">{s.student_email}</p>
                              </div>
                            </div>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.status === "graded" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                              {s.status === "graded" ? `✓ Graded: ${s.marks_obtained}/${selectedAssignment.max_marks}` : "⏳ Pending"}
                            </span>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3 mb-3">
                            <p className="text-sm text-slate-700 leading-relaxed">{s.submission_text}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock size={11} /> {new Date(s.submitted_at).toLocaleString()}
                            </p>
                            {s.status === "graded" && s.feedback && (
                              <p className="text-xs text-indigo-600">Feedback: {s.feedback}</p>
                            )}
                          </div>
                          {s.status !== "graded" && (
                            <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                              <input type="number" placeholder="Marks" className="border border-slate-200 rounded-lg px-3 py-1.5 w-24 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onChange={e => setGradeData({ ...gradeData, [key]: { ...gradeData[key], marks_obtained: e.target.value } })} />
                              <input placeholder="Write feedback..." className="border border-slate-200 rounded-lg px-3 py-1.5 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onChange={e => setGradeData({ ...gradeData, [key]: { ...gradeData[key], feedback: e.target.value } })} />
                              <button onClick={() => gradeSubmission(selectedAssignment.id, s.student_id)} className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-indigo-700 font-medium">Grade</button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  )
}