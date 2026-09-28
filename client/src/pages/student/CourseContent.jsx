import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ChevronDown, ChevronRight, Video, FileText, SlidersHorizontal, BookOpen, CheckCircle, Circle, ArrowLeft, Clock, Lock } from "lucide-react"
import DashboardLayout from "../../components/DashboardLayout"

const LESSON_ICONS = {
  video: Video,
  notes: FileText,
  slides: SlidersHorizontal,
  reading: BookOpen,
}

export default function CourseContent() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [sections, setSections] = useState([])
  const [activeLesson, setActiveLesson] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})
  const [completedLessons, setCompletedLessons] = useState({})
  const [progress, setProgress] = useState({ total: 0, completed: 0 })
  const [course, setCourse] = useState(null)

  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch(`http://localhost:8000/api/courses/${courseId}`)
      .then(r => r.json())
      .then(data => setCourse(data.course || data))

    fetch(`http://localhost:8000/api/curriculum/courses/${courseId}/sections`)
      .then(r => r.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : []
        setSections(arr)
        if (arr.length > 0) {
          setExpandedSections({ [arr[0].id]: true })
          if (arr[0].lessons?.length > 0) {
            setActiveLesson(arr[0].lessons[0])
          }
        }
      })

    fetch(`http://localhost:8000/api/curriculum/courses/${courseId}/progress`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setProgress(data))
  }, [courseId])

  const markComplete = async (lessonId) => {
    await fetch(`http://localhost:8000/api/curriculum/lessons/${lessonId}/complete`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    })
    setCompletedLessons(prev => ({ ...prev, [lessonId]: true }))
    setProgress(prev => ({ ...prev, completed: prev.completed + 1 }))
  }

  const progressPct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0

  return (
    <DashboardLayout>
      <div className="mb-4 flex items-center gap-3">
        <button onClick={() => navigate("/student/courses")} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm">
          <ArrowLeft size={16} /> Back to My Courses
        </button>
      </div>

      {course && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">{course.title}</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="text-sm font-medium text-slate-600 whitespace-nowrap">{progressPct}% Complete</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">{progress.completed}/{progress.total} lessons completed</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {activeLesson ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {activeLesson.type === "video" && activeLesson.video_url && (
                <div className="aspect-video bg-black">
                  <iframe
                    src={activeLesson.video_url}
                    className="w-full h-full"
                    allowFullScreen
                    title={activeLesson.title}
                  />
                </div>
              )}
              {activeLesson.type === "video" && !activeLesson.video_url && (
                <div className="aspect-video bg-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <Video size={48} className="text-slate-600 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">No video URL provided</p>
                  </div>
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{activeLesson.title}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-400 capitalize">{activeLesson.type}</span>
                      {activeLesson.duration_minutes > 0 && (
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock size={11} /> {activeLesson.duration_minutes} min
                        </span>
                      )}
                    </div>
                  </div>
                  {!completedLessons[activeLesson.id] ? (
                    <button onClick={() => markComplete(activeLesson.id)} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 text-sm font-medium">
                      <CheckCircle size={16} /> Mark Complete
                    </button>
                  ) : (
                    <span className="flex items-center gap-2 text-emerald-600 text-sm font-medium bg-emerald-50 px-4 py-2 rounded-xl">
                      <CheckCircle size={16} /> Completed
                    </span>
                  )}
                </div>

                {activeLesson.content && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <h3 className="font-semibold text-slate-800 mb-3">
                      {activeLesson.type === "notes" ? "Notes" : activeLesson.type === "slides" ? "Slides" : "Reading Material"}
                    </h3>
                    <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {activeLesson.content}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
              <BookOpen size={40} className="text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No lessons yet</h3>
              <p className="text-slate-400 text-sm">The teacher hasn't added any lessons to this course yet.</p>
            </div>
          )}
        </div>

        <div className="col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Course Content</h3>
              <p className="text-xs text-slate-400 mt-0.5">{sections.length} sections • {sections.reduce((s, sec) => s + (sec.lessons?.length || 0), 0)} lessons</p>
            </div>
            <div className="divide-y divide-slate-50 max-h-150 overflow-y-auto">
              {sections.map((section, si) => (
                <div key={section.id}>
                  <button
                    onClick={() => setExpandedSections(prev => ({ ...prev, [section.id]: !prev[section.id] }))}
                    className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 text-left"
                  >
                    <span className="text-xs font-bold text-slate-400 w-5">{si + 1}</span>
                    <span className="flex-1 text-sm font-semibold text-slate-800">{section.title}</span>
                    <span className="text-xs text-slate-400">{section.lessons?.length || 0}</span>
                    {expandedSections[section.id] ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
                  </button>
                  {expandedSections[section.id] && section.lessons?.map((lesson, li) => {
                    const Icon = LESSON_ICONS[lesson.type] || Video
                    const isActive = activeLesson?.id === lesson.id
                    const isDone = completedLessons[lesson.id]
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${isActive ? "bg-emerald-50 border-l-2 border-emerald-500" : "hover:bg-slate-50"}`}
                      >
                        <div className="w-5 flex items-center justify-center shrink-0">
                          {isDone ? <CheckCircle size={14} className="text-emerald-500" /> : <Circle size={14} className="text-slate-300" />}
                        </div>
                        <Icon size={13} className={isActive ? "text-emerald-600" : "text-slate-400"} />
                        <span className={`flex-1 text-xs ${isActive ? "text-emerald-700 font-medium" : "text-slate-600"}`}>{lesson.title}</span>
                        {lesson.duration_minutes > 0 && <span className="text-xs text-slate-400">{lesson.duration_minutes}m</span>}
                        {lesson.is_free && <span className="text-xs bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded-full">Free</span>}
                      </button>
                    )
                  })}
                </div>
              ))}
              {sections.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-slate-400 text-sm">No content available yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}