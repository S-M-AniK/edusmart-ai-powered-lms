import { useState, useEffect } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import { TrendingUp, ClipboardList, Brain, CheckCircle, Clock, XCircle } from "lucide-react"

function LearningProgress() {
  const [assignments, setAssignments] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [activeTab, setActiveTab] = useState("assignments")
  const [submitText, setSubmitText] = useState({})
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizQuestions, setQuizQuestions] = useState({})
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [quizResult, setQuizResult] = useState({})

  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch("http://localhost:8000/api/assignments/student/my", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => r.json()).then(setAssignments)

    fetch("http://localhost:8000/api/quizzes/student/my", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => r.json()).then(setQuizzes)
  }, [])

  const submitAssignment = async (assignmentId) => {
    await fetch(`http://localhost:8000/api/assignments/${assignmentId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ submission_text: submitText[assignmentId] })
    })
    const res = await fetch("http://localhost:8000/api/assignments/student/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
    setAssignments(await res.json())
  }

  const loadQuizQuestions = async (quiz) => {
    const res = await fetch(`http://localhost:8000/api/quizzes/${quiz.id}/questions`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    setQuizQuestions({ ...quizQuestions, [quiz.id]: data })
    setActiveQuiz(quiz.id)
  }

  const submitQuiz = async (quizId) => {
    const answers = Object.entries(quizAnswers[quizId] || {}).map(([question_id, selected_option]) => ({
      question_id: parseInt(question_id),
      selected_option
    }))
    const res = await fetch(`http://localhost:8000/api/quizzes/${quizId}/attempt`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ answers })
    })
    const data = await res.json()
    setQuizResult({ ...quizResult, [quizId]: data })
    setActiveQuiz(null)
    const r2 = await fetch("http://localhost:8000/api/quizzes/student/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
    setQuizzes(await r2.json())
  }

  const submitted = assignments.filter(a => a.submission_text)
  const pending = assignments.filter(a => !a.submission_text)
  const completedQuizzes = quizzes.filter(q => q.score !== null)

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Learning Progress</h1>
        <p className="text-slate-500 mt-1">Track your assignments and quizzes.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1E1B4B] rounded-xl p-5 text-white">
          <p className="text-white/60 text-sm mb-1">Assignments</p>
          <p className="text-3xl font-bold">{submitted.length}/{assignments.length}</p>
          <p className="text-white/50 text-xs mt-1">Submitted</p>
        </div>
        <div className="bg-indigo-500 rounded-xl p-5 text-white">
          <p className="text-white/60 text-sm mb-1">Quizzes Done</p>
          <p className="text-3xl font-bold">{completedQuizzes.length}/{quizzes.length}</p>
          <p className="text-white/50 text-xs mt-1">Completed</p>
        </div>
        <div className="bg-emerald-500 rounded-xl p-5 text-white">
          <p className="text-white/60 text-sm mb-1">Avg Quiz Score</p>
          <p className="text-3xl font-bold">
            {completedQuizzes.length > 0
              ? Math.round(completedQuizzes.reduce((s, q) => s + (q.score / q.total_questions) * 100, 0) / completedQuizzes.length)
              : 0}%
          </p>
          <p className="text-white/50 text-xs mt-1">Average</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setActiveTab("assignments")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "assignments" ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
          <ClipboardList size={16} /> Assignments
        </button>
        <button onClick={() => setActiveTab("quizzes")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "quizzes" ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
          <Brain size={16} /> Quizzes
        </button>
      </div>

      {activeTab === "assignments" && (
        <div className="space-y-4">
          {assignments.length === 0 && <p className="text-gray-500 text-center py-12">No assignments yet.</p>}
          {assignments.map(a => (
            <div key={a.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-slate-800">{a.title}</p>
                  <p className="text-sm text-slate-500">{a.course_title}</p>
                  <p className="text-xs text-slate-400 mt-1">{a.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {a.status === "graded" && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Graded: {a.marks_obtained}/{a.max_marks}</span>}
                  {a.submission_text && a.status !== "graded" && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Submitted</span>}
                  {!a.submission_text && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Pending</span>}
                </div>
              </div>
              {a.due_date && <p className="text-xs text-slate-400 mb-3">Due: {new Date(a.due_date).toLocaleDateString()}</p>}
              {a.feedback && <p className="text-sm text-indigo-600 mb-3">Feedback: {a.feedback}</p>}
              {!a.submission_text && (
                <div className="flex gap-2 mt-3">
                  <textarea
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={2}
                    placeholder="Write your answer..."
                    value={submitText[a.id] || ""}
                    onChange={e => setSubmitText({ ...submitText, [a.id]: e.target.value })}
                  />
                  <button onClick={() => submitAssignment(a.id)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 self-end">Submit</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "quizzes" && (
        <div className="space-y-4">
          {quizzes.length === 0 && <p className="text-gray-500 text-center py-12">No quizzes yet.</p>}
          {quizzes.map(q => (
            <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-slate-800">{q.title}</p>
                  <p className="text-sm text-slate-500">{q.course_title}</p>
                  <p className="text-xs text-slate-400 mt-1">{q.description}</p>
                  <p className="text-xs text-slate-400">Time Limit: {q.time_limit_minutes} min</p>
                </div>
                <div>
                  {q.score !== null
                    ? <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Score: {q.score}/{q.total_questions}</span>
                    : <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Not Attempted</span>
                  }
                </div>
              </div>

              {quizResult[q.id] && (
                <div className="bg-indigo-50 rounded-lg p-3 mb-3 text-sm text-indigo-700">
                  You scored {quizResult[q.id].score} out of {quizResult[q.id].total}!
                </div>
              )}

              {q.score === null && activeQuiz !== q.id && (
                <button onClick={() => loadQuizQuestions(q)} className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">
                  Start Quiz
                </button>
              )}

              {activeQuiz === q.id && quizQuestions[q.id] && (
                <div className="mt-4 space-y-4">
                  {quizQuestions[q.id].map((ques, i) => (
                    <div key={ques.id} className="border border-gray-100 rounded-lg p-4">
                      <p className="font-medium text-slate-700 mb-3">{i + 1}. {ques.question_text}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["a", "b", "c", "d"].map(opt => (
                          <label key={opt} className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer text-sm transition-colors ${quizAnswers[q.id]?.[ques.id] === opt ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-200 hover:bg-gray-50"}`}>
                            <input type="radio" name={`q-${ques.id}`} value={opt} className="hidden"
                              onChange={() => setQuizAnswers({ ...quizAnswers, [q.id]: { ...quizAnswers[q.id], [ques.id]: opt } })} />
                            <span className="font-semibold uppercase">{opt}.</span> {ques[`option_${opt}`]}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={() => submitQuiz(q.id)} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-medium">
                    Submit Quiz
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}

export default LearningProgress