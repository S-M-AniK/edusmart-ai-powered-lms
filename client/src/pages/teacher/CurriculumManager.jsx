import { useState } from "react"
import TeacherLayout from "../../components/TeacherLayout"
import { ChevronDown, Plus, GripVertical, FileText, Video } from "lucide-react"

const initialModules = [
  {
    title: "Module 1: Introduction to React",
    lessons: [
      { name: "What is React?", type: "video" },
      { name: "Setting up your environment", type: "video" },
      { name: "Quiz: React Basics", type: "doc" },
    ],
  },
  {
    title: "Module 2: Components & Props",
    lessons: [
      { name: "Creating your first component", type: "video" },
      { name: "Passing props", type: "video" },
    ],
  },
]

function CurriculumManager() {
  const [openModule, setOpenModule] = useState(0)

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between mb-8 animate-[fadeIn_0.6s_ease-out]">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Curriculum Manager</h1>
          <p className="text-slate-500 mt-1">Organize modules and lessons for React for Beginners.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-[#10B981] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all">
          <Plus size={18} />
          Add Module
        </button>
      </div>

      <div className="space-y-3">
        {initialModules.map((module, i) => (
          <div
            key={module.title}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-300"
            style={{ animation: `fadeIn 0.6s ease-out ${i * 0.08}s both` }}
          >
            <button
              onClick={() => setOpenModule(openModule === i ? null : i)}
              className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <GripVertical size={18} className="text-slate-300" />
                <span className="font-medium text-slate-900">{module.title}</span>
                <span className="text-xs text-slate-400">({module.lessons.length} lessons)</span>
              </div>
              <ChevronDown
                size={18}
                className={`text-slate-400 transition-transform duration-300 ${openModule === i ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: openModule === i ? "500px" : "0px",
              }}
            >
              <div className="border-t border-slate-100 p-5 space-y-2">
                {module.lessons.map((lesson, j) => (
                  <div
                    key={lesson.name}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 hover:translate-x-1 transition-all duration-200"
                    style={{ animation: openModule === i ? `fadeIn 0.5s ease-out ${j * 0.06}s both` : "none" }}
                  >
                    {lesson.type === "video" ? (
                      <Video size={16} className="text-[#10B981]" />
                    ) : (
                      <FileText size={16} className="text-[#6366F1]" />
                    )}
                    <span className="text-sm text-slate-700">{lesson.name}</span>
                  </div>
                ))}
                <button className="flex items-center gap-2 text-sm font-medium text-[#10B981] mt-2 hover:gap-3 transition-all">
                  <Plus size={14} />
                  Add Lesson
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </TeacherLayout>
  )
}

export default CurriculumManager