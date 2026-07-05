import { useState, useEffect } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Star, Trash2, CheckCircle } from "lucide-react"
import { getAllReviews, approveReview, deleteReview } from "../../api/reviews"
import toast from "react-hot-toast"

function ManageReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [])

  async function fetchReviews() {
    try {
      const res = await getAllReviews()
      setReviews(res.data.reviews)
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch reviews:", err)
      setLoading(false)
    }
  }

  async function handleApprove(id) {
    try {
      await approveReview(id, true)
      toast.success("Review approved!")
      fetchReviews()
    } catch (err) {
      console.error("Failed to approve review:", err)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this review?")) return
    try {
      await deleteReview(id)
      toast.success("Review deleted!")
      fetchReviews()
    } catch (err) {
      console.error("Failed to delete review:", err)
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Manage Reviews</h1>
        <p className="text-slate-500 mt-1">Moderate student reviews across the platform.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 text-slate-400">No reviews yet.</div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, i) => (
            <div key={review.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow duration-300"
              style={{ animation: `fadeIn 0.5s ease-out ${i * 0.08}s both` }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{review.student_name}</h3>
                  <p className="text-sm text-slate-500">{review.course_title}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${review.approved ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
                    {review.approved ? "Approved" : "Pending"}
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={14} className={j < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"} />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-slate-600 mb-4">{review.comment}</p>

              <div className="flex items-center gap-3">
                {!review.approved && (
                  <button onClick={() => handleApprove(review.id)}
                    className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                    <CheckCircle size={15} />
                    Approve
                  </button>
                )}
                <button onClick={() => handleDelete(review.id)}
                  className="flex items-center gap-1.5 text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors">
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}

export default ManageReviews