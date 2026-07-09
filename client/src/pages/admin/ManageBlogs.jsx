import { useState, useEffect } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Plus, Trash2, X, Pencil } from "lucide-react"
import { getAllBlogs, createBlog, deleteBlog, updateBlog } from "../../api/blogs"
import toast from "react-hot-toast"

function ManageBlogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editBlog, setEditBlog] = useState(null)
  const [form, setForm] = useState({ title: "", content: "" })

  useEffect(() => {
    fetchBlogs()
  }, [])

  async function fetchBlogs() {
    try {
      const res = await getAllBlogs()
      setBlogs(res.data.blogs)
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch blogs:", err)
      setLoading(false)
    }
  }

  function openCreate() {
    setEditBlog(null)
    setForm({ title: "", content: "" })
    setShowModal(true)
  }

  function openEdit(blog) {
    setEditBlog(blog)
    setForm({ title: blog.title, content: blog.content })
    setShowModal(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (editBlog) {
        await updateBlog(editBlog.id, form)
        toast.success("Blog updated!")
      } else {
        await createBlog({ ...form, author_id: 1 })
        toast.success("Blog created!")
      }
      setForm({ title: "", content: "" })
      setShowModal(false)
      setEditBlog(null)
      fetchBlogs()
    } catch (err) {
      toast.error("Something went wrong!")
    }
  }

  async function handlePublish(id, published) {
    try {
      await updateBlog(id, { published: !published })
      toast.success(published ? "Blog unpublished!" : "Blog published!")
      fetchBlogs()
    } catch (err) {
      toast.error("Failed to update blog!")
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this blog?")) return
    try {
      await deleteBlog(id)
      toast.success("Blog deleted!")
      fetchBlogs()
    } catch (err) {
      toast.error("Failed to delete blog!")
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Blogs</h1>
          <p className="text-slate-500 mt-1">Create and manage blog posts.</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all">
          <Plus size={18} />
          New Blog Post
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-slate-400">Loading...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 text-slate-400">No blogs yet.</div>
        ) : (
          blogs.map((blog, i) => (
            <div key={blog.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow duration-300"
              style={{ animation: `fadeIn 0.4s ease-out ${i * 0.06}s both` }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900 text-lg">{blog.title}</h3>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${blog.published ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mb-2">by {blog.author_name} • {new Date(blog.created_at).toLocaleDateString()}</p>
                  <p className="text-slate-600 text-sm line-clamp-2">{blog.content?.substring(0, 150)}...</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => openEdit(blog)}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#6366F1] hover:bg-indigo-50 transition-all">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handlePublish(blog.id, blog.published)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${blog.published ? "border-amber-400 text-amber-600 hover:bg-amber-50" : "border-emerald-400 text-emerald-600 hover:bg-emerald-50"}`}>
                    {blog.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => handleDelete(blog.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" style={{ animation: "fadeIn 0.2s ease-out" }}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-900">{editBlog ? "Edit Blog Post" : "New Blog Post"}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                <input type="text" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Blog post title"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Content</label>
                <textarea required value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
                  rows={8} placeholder="Write your blog content here..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] resize-none" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 transition-opacity">
                  {editBlog ? "Update Blog" : "Save as Draft"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default ManageBlogs