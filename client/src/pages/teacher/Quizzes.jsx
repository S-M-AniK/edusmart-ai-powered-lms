import { useState, useEffect } from "react"
import { Plus, Trash2, Eye, X, ChevronDown, Brain, Clock, Users, Target, CheckCircle } from "lucide-react"
import TeacherLayout from "../../components/TeacherLayout"

export default function Quizzes() {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [quizzes, setQuizzes] = useState([])
  const [attempts, setAttempts] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [showAttempts, setShowAttempts] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [form, setForm] = useState({ title: "", description: "", time_limit_minutes: 30 })
  const [questions, setQuestions] = useState([{ question_text: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_option: "a" }])

  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch(`http://localhost:8000/api/courses/teacher/${user.id}`)
      .then(r => r.json())
      .then(data => setCourses(data.courses || []))
  }, [])

  useEffect(() => {
    if (!selectedCourse) return
    fetch(`http://localhost:8000/api/quizzes/course/${selectedCourse}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setQuizzes)
  }, [selectedCourse])

  const addQuestion = () => {
    setQuestions([...questions, { question_text: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_option: "a" }])
  }

  const updateQuestion = (index, field, value) => {
    const updated = [...questions]
    updated[index][field] = value
    setQuestions(updated)
  }

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const createQuiz = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      alert("Title and Description are required!")
      return
    }
    for (const q of questions) {
      if (!q.question_text.trim() || !q.option_a.trim() || !q.option_b.trim() || !q.option_c.trim() || !q.option_d.trim()) {
        alert("Please fill all question fields!")
        return
      }
    }
    const res = await fetch("http://localhost:8000/api/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...form, course_id: selectedCourse, questions })
    })
    const data = await res.json()
    setQuizzes([data, ...quizzes])
    setShowCreate(false)
    setForm({ title: "", description: "", time_limit_minutes: 30 })
    setQuestions([{ question_text: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_option: "a" }])
  }

  const deleteQuiz = async (id) => {
    await fetch(`http://localhost:8000/api/quizzes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
    setQuizzes(quizzes.filter(q => q.id !== id))
  }

  const viewAttempts = async (quiz) => {
    setSelectedQuiz(quiz)
    const res = await fetch(`http://localhost:8000/api/quizzes/${quiz.id}/attempts`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    setAttempts(data)
    setShowAttempts(true)
  }

  const courseName = courses.find(c => c.id == selectedCourse)?.title || ""
  const totalAttempts = quizzes.reduce((sum, q) => sum + parseInt(q.attempt_count || 0), 0)

  return (
    <TeacherLayout>
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
              <Brain size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Quizzes</h1>
              <p className="text-slate-500 text-sm">Create MCQ quizzes and track student performance</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 min-w-55"
              value={selectedCourse}
              onChange={e => setSelectedCourse(e.target.value)}
            >
              <option value="">Select a course</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
          </div>
          {selectedCourse && (
            <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-violet-600 text-white px-5 py-2.5 rounded-xl hover:bg-violet-700 text-sm font-medium shadow-sm transition-all">
              <Plus size={16} /> New Quiz
            </button>
          )}
        </div>

        {selectedCourse && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                  <Brain size={18} className="text-violet-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{quizzes.length}</p>
                  <p className="text-xs text-slate-500">Total Quizzes</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Users size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{totalAttempts}</p>
                  <p className="text-xs text-slate-500">Total Attempts</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Target size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{quizzes.filter(q => parseInt(q.attempt_count) > 0).length}</p>
                  <p className="text-xs text-slate-500">Active Quizzes</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!selectedCourse && (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain size={28} className="text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Select a Course</h3>
            <p className="text-slate-400 text-sm">Choose a course from the dropdown to view or create quizzes.</p>
          </div>
        )}

        {selectedCourse && quizzes.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain size={28} className="text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No Quizzes Yet</h3>
            <p className="text-slate-400 text-sm">Create your first quiz for {courseName}.</p>
          </div>
        )}

        <div className="space-y-4">
          {quizzes.map((q, i) => (
            <div key={q.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 p-6">
                <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg leading-tight">{q.title}</h3>
                      <p className="text-slate-500 text-sm mt-1">{q.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => viewAttempts(q)} className="flex items-center gap-1.5 text-violet-600 border border-violet-200 bg-violet-50 px-3 py-1.5 rounded-lg hover:bg-violet-100 text-sm font-medium transition-colors">
                        <Eye size={14} /> View Attempts
                      </button>
                      <button onClick={() => deleteQuiz(q.id)} className="text-red-500 border border-red-200 bg-red-50 p-1.5 rounded-lg hover:bg-red-100 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 mt-4 flex-wrap">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Clock size={14} className="text-violet-400" />
                      <span>Time Limit: <span className="font-medium text-slate-700">{q.time_limit_minutes} min</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Users size={14} className="text-emerald-400" />
                      <span><span className="font-medium text-slate-700">{q.attempt_count}</span> attempts</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-1 bg-slate-100">
                <div className="h-full bg-violet-500 rounded-full" style={{ width: `${Math.min((parseInt(q.attempt_count) / 10) * 100, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>

        {showCreate && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Create New Quiz</h2>
                  <p className="text-sm text-slate-500 mt-0.5">Add MCQ quiz for <span className="font-medium text-violet-600">{courseName}</span></p>
                </div>
                <button onClick={() => setShowCreate(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
                  <X size={18} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-6 space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Quiz Title <span className="text-red-400">*</span></label>
                  <input className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" placeholder="e.g. React Hooks Fundamentals Quiz" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Description <span className="text-red-400">*</span></label>
                  <textarea className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" placeholder="What topics does this quiz cover?" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Time Limit (minutes)</label>
                  <input type="number" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" value={form.time_limit_minutes} onChange={e => setForm({ ...form, time_limit_minutes: e.target.value })} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-slate-700">Questions <span className="text-red-400">*</span></label>
                    <span className="text-xs text-slate-400">{questions.length} question{questions.length !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="space-y-4">
                    {questions.map((q, i) => (
                      <div key={i} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-semibold text-violet-700 bg-violet-100 text-violet-700 px-2.5 py-1 rounded-lg">Q{i + 1}</span>
                          {questions.length > 1 && (
                            <button onClick={() => removeQuestion(i)} className="text-red-400 hover:text-red-600 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50">
                              <X size={15} />
                            </button>
                          )}
                        </div>
                        <input className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white mb-3" placeholder="Enter your question here..." value={q.question_text} onChange={e => updateQuestion(i, "question_text", e.target.value)} />
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {["a", "b", "c", "d"].map(opt => (
                            <div key={opt} className={`flex items-center gap-2 border rounded-xl px-3 py-2 bg-white ${q.correct_option === opt ? "border-violet-400 bg-violet-50" : "border-slate-200"}`}>
                              <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${q.correct_option === opt ? "bg-violet-600 text-white" : "bg-slate-200 text-slate-600"}`}>{opt.toUpperCase()}</span>
                              <input className="flex-1 text-sm focus:outline-none bg-transparent" placeholder={`Option ${opt.toUpperCase()}`} value={q[`option_${opt}`]} onChange={e => updateQuestion(i, `option_${opt}`, e.target.value)} />
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 font-medium">Correct Answer:</span>
                          <div className="flex gap-2">
                            {["a", "b", "c", "d"].map(opt => (
                              <button key={opt} onClick={() => updateQuestion(i, "correct_option", opt)} className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${q.correct_option === opt ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                                {opt.toUpperCase()}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={addQuestion} className="w-full border-2 border-dashed border-violet-200 text-violet-600 py-3 rounded-xl hover:bg-violet-50 text-sm font-medium mt-3 transition-colors">
                    + Add Another Question
                  </button>
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 flex gap-3">
                <button onClick={() => setShowCreate(false)} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl hover:bg-slate-50 font-medium text-sm">
                  Cancel
                </button>
                <button onClick={createQuiz} className="flex-1 bg-violet-600 text-white py-3 rounded-xl hover:bg-violet-700 font-medium text-sm transition-colors">
                  Create Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        {showAttempts && selectedQuiz && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[85vh] flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedQuiz.title}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{attempts.length} student{attempts.length !== 1 ? "s" : ""} attempted</p>
                </div>
                <button onClick={() => setShowAttempts(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400">
                  <X size={18} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-6">
                {attempts.length === 0 ? (
                  <div className="text-center py-12">
                    <Users size={32} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No attempts yet</p>
                    <p className="text-slate-400 text-sm mt-1">Students haven't taken this quiz yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {attempts.map((a, i) => {
                      const pct = Math.round((a.score / a.total_questions) * 100)
                      return (
                        <div key={a.id} className="border border-slate-200 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-semibold text-sm">
                                {a.student_name?.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-slate-800 text-sm">{a.student_name}</p>
                                <p className="text-xs text-slate-400">{a.student_email}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-violet-600">{a.score}/{a.total_questions}</p>
                              <p className="text-xs text-slate-400">{pct}% score</p>
                            </div>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${pct >= 70 ? "bg-emerald-500" : pct >= 40 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${pct}%` }} />
                          </div>
                          <p className="text-xs text-slate-400 mt-2">{new Date(a.completed_at).toLocaleString()}</p>
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