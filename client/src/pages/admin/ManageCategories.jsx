import { useState, useEffect } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Plus, Pencil, Trash2, X, FolderTree } from "lucide-react"
import API from "../../api/axios"
import toast from "react-hot-toast"

function ManageCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editCategory, setEditCategory] = useState(null)
  const [name, setName] = useState("")

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const res = await API.get("/categories")
      setCategories(res.data.categories)
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch categories:", err)
      setLoading(false)
    }
  }

  function openCreate() {
    setEditCategory(null)
    setName("")
    setShowModal(true)
  }

  function openEdit(category) {
    setEditCategory(category)
    setName(category.name)
    setShowModal(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (editCategory) {
        await API.put(`/categories/${editCategory.id}`, { name })
        toast.success("Category updated!")
      } else {
        await API.post("/categories", { name })
        toast.success("Category created!")
      }
      setShowModal(false)
      setName("")
      setEditCategory(null)
      fetchCategories()
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!")
    }
  }

  async function handleDelete(id, categoryName) {
    if (!window.confirm(`Are you sure you want to delete "${categoryName}"?`)) return
    try {
      await API.delete(`/categories/${id}`)
      toast.success("Category deleted!")
      fetchCategories()
    } catch (err) {
      toast.error("Failed to delete category!")
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Categories</h1>
          <p className="text-slate-500 mt-1">Organize courses into categories.</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all">
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading categories...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, i) => (
            <div key={category.id} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              style={{ animation: `fadeIn 0.5s ease-out ${i * 0.08}s both` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                  <FolderTree size={18} className="text-[#6366F1]" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{category.name}</p>
                  <p className="text-xs text-slate-500">{category.course_count} courses</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(category)}
                  className="text-slate-400 hover:text-[#6366F1] hover:scale-110 transition-all">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(category.id, category.name)}
                  className="text-slate-400 hover:text-rose-500 hover:scale-110 transition-all">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" style={{ animation: "fadeIn 0.2s ease-out" }}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-900">{editCategory ? "Edit Category" : "Add New Category"}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder="e.g. Web Development"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 transition-opacity">
                  {editCategory ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default ManageCategories