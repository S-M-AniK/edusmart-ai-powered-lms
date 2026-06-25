import { useState } from "react"
import TeacherLayout from "../../components/TeacherLayout"
import { Upload, DollarSign } from "lucide-react"

function CreateCourse() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    console.log("New course:", { title, category, description, price })
  }

  return (
    <TeacherLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Create New Course</h1>
        <p className="text-slate-500 mt-1">Fill in the details to publish a new course.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl">
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
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
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
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
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
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] resize-none"
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
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Course Thumbnail
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
              <Upload size={28} className="text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg font-medium text-white bg-[#10B981] hover:opacity-90 transition-opacity"
          >
            Create Course
          </button>
        </form>
      </div>
    </TeacherLayout>
  )
}

export default CreateCourse