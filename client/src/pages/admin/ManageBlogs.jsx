import { useState, useEffect } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Plus, Trash2, X } from "lucide-react"
import { getAllBlogs, createBlog, deleteBlog, updateBlog } from "../../api/blogs"

function ManageBlogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
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

  async function handleCreate(e) {
    e.preventDefault()
    try {
      await createBlog({ ...form, author_id: 1 })
      setForm({ title: "", content: "" })
      setShowModal(false)
      fetchBlogs()
    } catch (err) {
      console.error("Failed to create blog:", err)
    }
  }

  async function handlePublish(id, published) {
    try {
      await updateBlog(id, { published: !published })
      fetchBlogs()
    } catch (err) {
      console.error("Failed to update blog:", err)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this blog?")) return
    try {
      await deleteBlog(id)
      fetchBlogs()
    } catch (err) {
      console.error("Failed to delete blog:", err)
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Blogs</h1>
          <p className="text-slate-500 mt-1">Create and manage blog posts.</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all">
          <Plus size={18} />
          New Blog Post
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden" style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-slate-500">
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Author</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading...</td></tr>
            ) : blogs.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No blogs yet.</td></tr>
            ) : (
              blogs.map((blog, i) => (
                <tr key={blog.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors duration-150"
                  style={{ animation: `fadeIn 0.4s ease-out ${i * 0.06}s both` }}>
                  <td className="px-6 py-4 font-medium text-slate-900">{blog.title}</td>
                  <td className="px-6 py-4 text-slate-600">{blog.author_name}</td>
                  <td className="px-6 py-4 text-slate-600">{new Date(blog.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${blog.published ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => handlePublish(blog.id, blog.published)}
                        className={`text-xs font-medium px-3 py-1 rounded-full border transition-all ${blog.published ? "border-amber-400 text-amber-600 hover:bg-amber-50" : "border-emerald-400 text-emerald-600 hover:bg-emerald-50"}`}>
                        {blog.published ? "Unpublish" : "Publish"}
                      </button>
                      <button onClick={() => handleDelete(blog.id)}
                        className="text-slate-400 hover:text-rose-500 hover:scale-110 transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" style={{ animation: "fadeIn 0.2s ease-out" }}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-900">New Blog Post</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                <input type="text" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Blog post title"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Content</label>
                <textarea required value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
                  rows={6} placeholder="Write your blog content here..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] resize-none" />
              </div>
              <button type="submit"
                className="w-full py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 transition-opacity">
                Save as Draft
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default ManageBlogs