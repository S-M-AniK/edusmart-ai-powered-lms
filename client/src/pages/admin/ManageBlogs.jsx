import { useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Plus, Pencil, Trash2, X } from "lucide-react"

const initialBlogs = [
  { title: "5 Tips to Learn React Faster", author: "Admin", date: "Jun 20, 2026", status: "Published" },
  { title: "Why PostgreSQL is Great for LMS Platforms", author: "Admin", date: "Jun 12, 2026", status: "Published" },
  { title: "How AI is Changing Online Education", author: "Admin", date: "Jun 5, 2026", status: "Draft" },
]

function ManageBlogs() {
  const [blogs, setBlogs] = useState(initialBlogs)
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  function handleCreate(e) {
    e.preventDefault()
    setBlogs((prev) => [
      ...prev,
      {
        title,
        author: "Admin",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: "Draft",
      },
    ])
    setTitle("")
    setContent("")
    setShowModal(false)
  }

  function handleDelete(title) {
    setBlogs((prev) => prev.filter((b) => b.title !== title))
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Blogs</h1>
          <p className="text-slate-500 mt-1">Create and manage blog posts.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all"
        >
          <Plus size={18} />
          New Blog Post
        </button>
      </div>

      <div
        className="bg-white rounded-xl border border-slate-200 overflow-hidden"
        style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}
      >
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
            {blogs.map((blog, i) => (
              <tr
                key={blog.title}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors duration-150"
                style={{ animation: `fadeIn 0.4s ease-out ${i * 0.06}s both` }}
              >
                <td className="px-6 py-4 font-medium text-slate-900">{blog.title}</td>
                <td className="px-6 py-4 text-slate-600">{blog.author}</td>
                <td className="px-6 py-4 text-slate-600">{blog.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      blog.status === "Published"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-slate-400 hover:text-[#6366F1] hover:scale-110 transition-all">
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.title)}
                      className="text-slate-400 hover:text-rose-500 hover:scale-110 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Blog post title"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Content</label>
                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  placeholder="Write your blog content here..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 transition-opacity"
              >
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