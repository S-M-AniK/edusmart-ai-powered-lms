import { useState, useEffect } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import { Star, MessageSquare, Pencil, Trash2, X, Plus } from "lucide-react"
import { getStudentEnrollments } from "../../api/enrollments"
import { createReview, deleteReview } from "../../api/reviews"
import API from "../../api/axios"
import toast from "react-hot-toast"

function MyReviews() {
  const [reviews, setReviews] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editReview, setEditReview] = useState(null)
  const [form, setForm] = useState({ course_id: "", rating: 5, comment: "" })
  const [user, setUser] = useState({})

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "{}")
    setUser(u)
    if (u?.id) {
      fetchData(u.id)
    }
  }, [])

  async function fetchData(userId) {
    try {
      const [reviewsRes, enrollmentsRes] = await Promise.all([
        API.get(`/reviews?student_id=${userId}`),
        getStudentEnrollments(userId)
      ])
      const allReviews = reviewsRes.data.reviews?.filter(r => r.student_id === userId) || []
      setReviews(allReviews)
      setEnrollments(enrollmentsRes.data.enrollments || [])
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  function openCreate() {
    setEditReview(null)
    setForm({ course_id: "", rating: 5, comment: "" })
    setShowModal(true)
  }

  function openEdit(review) {
    setEditReview(review)
    setForm({ course_id: review.course_id, rating: review.rating, comment: review.comment })
    setShowModal(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (editReview) {
        await API.put(`/reviews/${editReview.id}`, { rating: form.rating, comment: form.comment })
        toast.success("Review updated!")
      } else {
        await createReview({ student_id: user.id, course_id: form.course_id, rating: form.rating, comment: form.comment })
        toast.success("Review submitted!")
      }
      setShowModal(false)
      fetchData(user.id)
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!")
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this review?")) return
    try {
      await deleteReview(id)
      toast.success("Review deleted!")
      fetchData(user.id)
    } catch {
      toast.error("Failed to delete review!")
    }
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Reviews</h1>
          <p className="text-slate-500 mt-1">Feedback you've shared on completed courses.</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 transition-all">
          <Plus size={18} />
          Write Review
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <MessageSquare size={40} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">You haven't written any reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, i) => (
            <div key={review.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
              style={{ animation: `fadeIn 0.5s ease-out ${i * 0.08}s both` }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-900">{review.course_title}</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${review.approved ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
                    {review.approved ? "Approved" : "Pending"}
                  </span>
                  <button onClick={() => openEdit(review)} className="text-slate-400 hover:text-[#6366F1] transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(review.id)} className="text-slate-400 hover:text-rose-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"} />
                ))}
              </div>
              <p className="text-slate-600 mb-3">{review.comment}</p>
              <p className="text-sm text-slate-400">Reviewed on {new Date(review.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-900">{editReview ? "Edit Review" : "Write a Review"}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!editReview && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Course</label>
                  <select value={form.course_id} onChange={e => setForm({ ...form, course_id: e.target.value })} required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1]">
                    <option value="">Select a course</option>
                    {enrollments.map(e => (
                      <option key={e.course_id} value={e.course_id}>{e.title}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })}>
                      <Star size={28} className={star <= form.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Comment</label>
                <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })}
                  rows={4} placeholder="Share your experience..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] resize-none" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90">
                  {editReview ? "Update Review" : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default MyReviews