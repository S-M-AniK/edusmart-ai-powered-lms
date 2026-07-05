import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import TeacherLayout from "../../components/TeacherLayout"
import { Upload, DollarSign } from "lucide-react"

function CreateCourse() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const user = JSON.parse(localStorage.getItem("user"))
      await axios.post("http://localhost:8000/api/courses", {
        title,
        description,
        category,
        price: parseFloat(price) || 0,
        teacher_id: user?.id,
      })
      navigate("/teacher/courses")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <TeacherLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Create New Course</h1>
        <p className="text-slate-500 mt-1">Fill in the details to publish a new course.</p>
      </div>

      <div
        className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl"
        style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}
      >
        {error && (
          <div className="mb-5 px-4 py-3 rounded-lg bg-rose-50 text-rose-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Course Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Complete JavaScript Bootcamp"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-shadow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Category
            </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-shadow"
            >
              <option value="">Select a category</option>
              <option value="programming">Programming</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe what students will learn"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] resize-none transition-shadow"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Price
            </label>
            <div className="relative">
              <DollarSign size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-shadow"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Course Thumbnail
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-[#10B981] hover:bg-[#10B981]/5 transition-all duration-300 cursor-pointer">
              <Upload size={28} className="text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-lg font-medium text-white bg-[#10B981] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Course"}
          </button>
        </form>
      </div>
    </TeacherLayout>
  )
}

export default CreateCourse