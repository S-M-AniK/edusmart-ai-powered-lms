import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import TeacherLayout from "../../components/TeacherLayout"
import { DollarSign } from "lucide-react"
import API from "../../api/axios"
import toast from "react-hot-toast"

function EditCourse() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: "", category: "", description: "", price: "", what_you_learn: "", requirements: "", duration: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    API.get("/categories").then(res => setCategories(res.data.categories)).catch(() => {})
    API.get(`/courses/${id}`).then(res => {
      const c = res.data.course
      setForm({
        title: c.title || "",
        category: c.category || "",
        description: c.description || "",
        price: c.price || "",
        what_you_learn: c.what_you_learn || "",
        requirements: c.requirements || "",
        duration: c.duration || "",
      })
      setFetching(false)
    }).catch(() => setFetching(false))
  }, [id])

  function validate() {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = "Course title is required"
    if (!form.category) newErrors.category = "Category is required"
    if (!form.description.trim()) newErrors.description = "Description is required"
    if (!form.price) newErrors.price = "Price is required"
    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setLoading(true)
    try {
      await API.put(`/courses/${id}`, {
        title: form.title,
        description: form.description,
        category: form.category,
        price: parseFloat(form.price) || 0,
        what_you_learn: form.what_you_learn,
        requirements: form.requirements,
        duration: form.duration,
      })
      toast.success("Course updated successfully!")
      navigate("/teacher/courses")
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: "" }))
  }

  if (fetching) return (
    <TeacherLayout>
      <div className="text-center py-12 text-slate-400">Loading course...</div>
    </TeacherLayout>
  )

  return (
    <TeacherLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Edit Course</h1>
        <p className="text-slate-500 mt-1">Update your course details.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl" style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Course Title {errors.title && <span className="text-rose-500">*</span>}
            </label>
            <input type="text" value={form.title} onChange={e => handleChange("title", e.target.value)}
              placeholder="e.g. Complete JavaScript Bootcamp"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-shadow ${errors.title ? "border-rose-400 bg-rose-50" : "border-slate-200"}`} />
            {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Category {errors.category && <span className="text-rose-500">*</span>}
            </label>
            <select value={form.category} onChange={e => handleChange("category", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-shadow ${errors.category ? "border-rose-400 bg-rose-50" : "border-slate-200"}`}>
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-rose-500 text-xs mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Description {errors.description && <span className="text-rose-500">*</span>}
            </label>
            <textarea value={form.description} onChange={e => handleChange("description", e.target.value)}
              rows={4} placeholder="Describe what students will learn"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#10B981] resize-none transition-shadow ${errors.description ? "border-rose-400 bg-rose-50" : "border-slate-200"}`} />
            {errors.description && <p className="text-rose-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Price {errors.price && <span className="text-rose-500">*</span>}
            </label>
            <div className="relative">
              <DollarSign size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="number" value={form.price} onChange={e => handleChange("price", e.target.value)}
                placeholder="0.00"
                className={`w-full pl-11 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-shadow ${errors.price ? "border-rose-400 bg-rose-50" : "border-slate-200"}`} />
            </div>
            {errors.price && <p className="text-rose-500 text-xs mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">What You'll Learn</label>
            <textarea value={form.what_you_learn} onChange={e => handleChange("what_you_learn", e.target.value)}
              rows={3} placeholder="e.g. Build React apps, Understand hooks..."
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] resize-none transition-shadow" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Requirements</label>
            <textarea value={form.requirements} onChange={e => handleChange("requirements", e.target.value)}
              rows={3} placeholder="e.g. Basic HTML/CSS knowledge..."
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] resize-none transition-shadow" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Duration</label>
            <input type="text" value={form.duration} onChange={e => handleChange("duration", e.target.value)}
              placeholder="e.g. 10 hours, 4 weeks..."
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-shadow" />
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => navigate("/teacher/courses")}
              className="px-6 py-2.5 rounded-lg font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="px-6 py-2.5 rounded-lg font-medium text-white bg-[#10B981] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all disabled:opacity-60">
              {loading ? "Updating..." : "Update Course"}
            </button>
          </div>
        </form>
      </div>
    </TeacherLayout>
  )
}

export default EditCourse