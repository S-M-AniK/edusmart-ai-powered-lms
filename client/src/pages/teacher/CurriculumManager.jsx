import { useState, useEffect } from "react"
import { Plus, Trash2, Edit2, X, ChevronDown, ChevronRight, Video, FileText, SlidersHorizontal, BookOpen, Check } from "lucide-react"
import TeacherLayout from "../../components/TeacherLayout"

const LESSON_TYPES = [
  { value: "video", label: "Video", icon: Video },
  { value: "notes", label: "Notes", icon: FileText },
  { value: "slides", label: "Slides", icon: SlidersHorizontal },
  { value: "reading", label: "Reading", icon: BookOpen },
]

export default function CurriculumManager() {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [sections, setSections] = useState([])
  const [expandedSections, setExpandedSections] = useState({})
  const [showAddSection, setShowAddSection] = useState(false)
  const [sectionTitle, setSectionTitle] = useState("")
  const [editingSection, setEditingSection] = useState(null)
  const [showAddLesson, setShowAddLesson] = useState(null)
  const [editingLesson, setEditingLesson] = useState(null)
  const [lessonForm, setLessonForm] = useState({ title: "", type: "video", video_url: "", content: "", duration_minutes: 0, is_free: false })

  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch(`http://localhost:8000/api/courses/teacher/${user.id}`)
      .then(r => r.json())
      .then(data => setCourses(data.courses || []))
  }, [])

  useEffect(() => {
    if (!selectedCourse) return
    loadSections()
  }, [selectedCourse])

  const loadSections = async () => {
    const res = await fetch(`http://localhost:8000/api/curriculum/courses/${selectedCourse}/sections`)
    const data = await res.json()
    setSections(Array.isArray(data) ? data : [])
  }

  const addSection = async () => {
    if (!sectionTitle.trim()) return
    await fetch(`http://localhost:8000/api/curriculum/courses/${selectedCourse}/sections`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title: sectionTitle, order_index: sections.length })
    })
    setSectionTitle("")
    setShowAddSection(false)
    loadSections()
  }

  const updateSection = async (id) => {
    await fetch(`http://localhost:8000/api/curriculum/sections/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title: editingSection.title })
    })
    setEditingSection(null)
    loadSections()
  }

  const deleteSection = async (id) => {
    await fetch(`http://localhost:8000/api/curriculum/sections/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
    loadSections()
  }

  const addLesson = async (sectionId) => {
    if (!lessonForm.title.trim()) return
    await fetch(`http://localhost:8000/api/curriculum/sections/${sectionId}/lessons`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...lessonForm, order_index: sections.find(s => s.id === sectionId)?.lessons?.length || 0 })
    })
    setShowAddLesson(null)
    setLessonForm({ title: "", type: "video", video_url: "", content: "", duration_minutes: 0, is_free: false })
    loadSections()
  }

  const updateLesson = async (id) => {
    await fetch(`http://localhost:8000/api/curriculum/lessons/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(editingLesson)
    })
    setEditingLesson(null)
    loadSections()
  }

  const deleteLesson = async (id) => {
    await fetch(`http://localhost:8000/api/curriculum/lessons/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
    loadSections()
  }

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const totalLessons = sections.reduce((sum, s) => sum + (s.lessons?.length || 0), 0)
  const totalDuration = sections.reduce((sum, s) => sum + (s.lessons?.reduce((ls, l) => ls + (l.duration_minutes || 0), 0) || 0), 0)
  const courseName = courses.find(c => c.id == selectedCourse)?.title || ""

  return (
    <TeacherLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Curriculum Manager</h1>
            <p className="text-slate-500 text-sm">Build your course content with sections and lessons</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-w-55"
              value={selectedCourse}
              onChange={e => setSelectedCourse(e.target.value)}
            >
              <option value="">Select a course</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
          </div>
          {selectedCourse && (
            <button onClick={() => setShowAddSection(true)} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 text-sm font-medium shadow-sm">
              <Plus size={16} /> Add Section
            </button>
          )}
        </div>

        {selectedCourse && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-2xl font-bold text-slate-900">{sections.length}</p>
              <p className="text-xs text-slate-500 mt-1">Total Sections</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-2xl font-bold text-slate-900">{totalLessons}</p>
              <p className="text-xs text-slate-500 mt-1">Total Lessons</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-2xl font-bold text-slate-900">{totalDuration} min</p>
              <p className="text-xs text-slate-500 mt-1">Total Duration</p>
            </div>
          </div>
        )}

        {!selectedCourse && (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen size={28} className="text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Select a Course</h3>
            <p className="text-slate-400 text-sm">Choose a course to manage its curriculum.</p>
          </div>
        )}

        <div className="space-y-4">
          {sections.map((section, si) => (
            <div key={section.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50" onClick={() => toggleSection(section.id)}>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm shrink-0">
                  {si + 1}
                </div>
                {editingSection?.id === section.id ? (
                  <input
                    className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={editingSection.title}
                    onClick={e => e.stopPropagation()}
                    onChange={e => setEditingSection({ ...editingSection, title: e.target.value })}
                  />
                ) : (
                  <span className="flex-1 font-semibold text-slate-800">{section.title}</span>
                )}
                <span className="text-xs text-slate-400">{section.lessons?.length || 0} lessons</span>
                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                  {editingSection?.id === section.id ? (
                    <button onClick={() => updateSection(section.id)} className="text-emerald-600 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-emerald-50">
                      <Check size={15} />
                    </button>
                  ) : (
                    <button onClick={() => setEditingSection(section)} className="text-slate-400 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100">
                      <Edit2 size={14} />
                    </button>
                  )}
                  <button onClick={() => deleteSection(section.id)} className="text-red-400 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50">
                    <Trash2 size={14} />
                  </button>
                </div>
                {expandedSections[section.id] ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
              </div>

              {expandedSections[section.id] && (
                <div className="border-t border-slate-100">
                  {section.lessons?.map((lesson, li) => {
                    const TypeIcon = LESSON_TYPES.find(t => t.value === lesson.type)?.icon || Video
                    return (
                      <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50">
                        <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                          <TypeIcon size={12} className="text-slate-500" />
                        </div>
                        {editingLesson?.id === lesson.id ? (
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            <input className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={editingLesson.title} onChange={e => setEditingLesson({ ...editingLesson, title: e.target.value })} />
                            <select className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" value={editingLesson.type} onChange={e => setEditingLesson({ ...editingLesson, type: e.target.value })}>
                              {LESSON_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                            <input className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 col-span-2" placeholder="Video URL" value={editingLesson.video_url || ""} onChange={e => setEditingLesson({ ...editingLesson, video_url: e.target.value })} />
                            <textarea className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 col-span-2 resize-none" rows={2} placeholder="Content/Notes" value={editingLesson.content || ""} onChange={e => setEditingLesson({ ...editingLesson, content: e.target.value })} />
                            <input type="number" className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Duration (min)" value={editingLesson.duration_minutes || 0} onChange={e => setEditingLesson({ ...editingLesson, duration_minutes: e.target.value })} />
                            <label className="flex items-center gap-2 text-sm text-slate-600 px-2">
                              <input type="checkbox" checked={editingLesson.is_free} onChange={e => setEditingLesson({ ...editingLesson, is_free: e.target.checked })} />
                              Free Preview
                            </label>
                          </div>
                        ) : (
                          <div className="flex-1">
                            <span className="text-sm text-slate-700 font-medium">{lesson.title}</span>
                            <div className="flex items-center gap-3 mt-0.5">
                              <span className="text-xs text-slate-400 capitalize">{lesson.type}</span>
                              {lesson.duration_minutes > 0 && <span className="text-xs text-slate-400">{lesson.duration_minutes} min</span>}
                              {lesson.is_free && <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Free</span>}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-1 shrink-0">
                          {editingLesson?.id === lesson.id ? (
                            <>
                              <button onClick={() => updateLesson(lesson.id)} className="text-emerald-600 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-emerald-50"><Check size={14} /></button>
                              <button onClick={() => setEditingLesson(null)} className="text-slate-400 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100"><X size={14} /></button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => setEditingLesson(lesson)} className="text-slate-400 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100"><Edit2 size={13} /></button>
                              <button onClick={() => deleteLesson(lesson.id)} className="text-red-400 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50"><Trash2 size={13} /></button>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}

                  {showAddLesson === section.id ? (
                    <div className="p-4 bg-slate-50 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" placeholder="Lesson Title *" value={lessonForm.title} onChange={e => setLessonForm({ ...lessonForm, title: e.target.value })} />
                        <select className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" value={lessonForm.type} onChange={e => setLessonForm({ ...lessonForm, type: e.target.value })}>
                          {LESSON_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                      </div>
                      {lessonForm.type === "video" && (
                        <input className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" placeholder="Video URL (YouTube embed or direct link)" value={lessonForm.video_url} onChange={e => setLessonForm({ ...lessonForm, video_url: e.target.value })} />
                      )}
                      {(lessonForm.type === "notes" || lessonForm.type === "reading" || lessonForm.type === "slides") && (
                        <textarea className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white resize-none" rows={4} placeholder="Content / Notes / Slide text..." value={lessonForm.content} onChange={e => setLessonForm({ ...lessonForm, content: e.target.value })} />
                      )}
                      <div className="flex items-center gap-3">
                        <input type="number" className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white w-36" placeholder="Duration (min)" value={lessonForm.duration_minutes} onChange={e => setLessonForm({ ...lessonForm, duration_minutes: e.target.value })} />
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                          <input type="checkbox" checked={lessonForm.is_free} onChange={e => setLessonForm({ ...lessonForm, is_free: e.target.checked })} />
                          Free Preview
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setShowAddLesson(null); setLessonForm({ title: "", type: "video", video_url: "", content: "", duration_minutes: 0, is_free: false }) }} className="flex-1 border border-slate-200 text-slate-600 py-2 rounded-xl text-sm hover:bg-white">Cancel</button>
                        <button onClick={() => addLesson(section.id)} className="flex-1 bg-emerald-600 text-white py-2 rounded-xl text-sm hover:bg-emerald-700 font-medium">Add Lesson</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => { setShowAddLesson(section.id); setExpandedSections(prev => ({ ...prev, [section.id]: true })) }} className="w-full py-3 text-sm text-emerald-600 hover:bg-emerald-50 flex items-center justify-center gap-2 transition-colors">
                      <Plus size={14} /> Add Lesson
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {showAddSection && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-900">Add New Section</h2>
                <button onClick={() => setShowAddSection(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400"><X size={18} /></button>
              </div>
              <input className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4" placeholder="e.g. Getting Started, Advanced Topics..." value={sectionTitle} onChange={e => setSectionTitle(e.target.value)} />
              <div className="flex gap-3">
                <button onClick={() => setShowAddSection(false)} className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-xl text-sm hover:bg-slate-50">Cancel</button>
                <button onClick={addSection} className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl text-sm hover:bg-emerald-700 font-medium">Add Section</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  )
}