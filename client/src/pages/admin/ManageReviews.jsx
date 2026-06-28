import { useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Star, Trash2, CheckCircle } from "lucide-react"

const initialReviews = [
  { student: "Tanvir Ahmed", course: "React for Beginners", rating: 5, comment: "Excellent teaching style, very clear explanations!", status: "Approved" },
  { student: "Nusrat Jahan", course: "React for Beginners", rating: 4, comment: "Good course, would like more hands-on exercises.", status: "Approved" },
  { student: "Rifat Karim", course: "Advanced State Management", rating: 5, comment: "Helped me understand Redux finally!", status: "Pending" },
  { student: "Farha Rahman", course: "Python Data Science", rating: 1, comment: "This course contains spam links in the description.", status: "Flagged" },
]

function ManageReviews() {
  const [reviews, setReviews] = useState(initialReviews)

  function approve(student) {
    setReviews((prev) => prev.map((r) => (r.student === student ? { ...r, status: "Approved" } : r)))
  }

  function remove(student) {
    setReviews((prev) => prev.filter((r) => r.student !== student))
  }

  return (
    <AdminLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Manage Reviews</h1>
        <p className="text-slate-500 mt-1">Moderate student reviews across the platform.</p>
      </div>

      <div className="space-y-4">
        {reviews.map((review, i) => (
          <div
            key={review.student + review.course}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow duration-300"
            style={{ animation: `fadeIn 0.5s ease-out ${i * 0.08}s both` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold text-slate-900">{review.student}</h3>
                <p className="text-sm text-slate-500">{review.course}</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    review.status === "Approved"
                      ? "bg-emerald-100 text-emerald-600"
                      : review.status === "Pending"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-rose-100 text-rose-600"
                  }`}
                >
                  {review.status}
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className={j < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-slate-600 mb-4">{review.comment}</p>

            <div className="flex items-center gap-3">
              {review.status !== "Approved" && (
                <button
                  onClick={() => approve(review.student)}
                  className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <CheckCircle size={15} />
                  Approve
                </button>
              )}
              <button
                onClick={() => remove(review.student)}
                className="flex items-center gap-1.5 text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}

export default ManageReviews