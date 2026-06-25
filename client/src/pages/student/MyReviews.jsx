import DashboardLayout from "../../components/DashboardLayout"
import { Star, MessageSquare, Pencil } from "lucide-react"

const reviews = [
  { course: "Python Data Science", rating: 5, comment: "Best course I've taken, very practical examples.", date: "May 14, 2026" },
  { course: "UI/UX Design Basics", rating: 4, comment: "Great content, would love more real project work.", date: "March 5, 2026" },
]

function MyReviews() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Reviews</h1>
        <p className="text-slate-500 mt-1">Feedback you've shared on completed courses.</p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <MessageSquare size={40} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">You haven't written any reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.course}
              className="bg-white rounded-xl border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-900">{review.course}</h3>
                <button className="text-slate-400 hover:text-[#6366F1]">
                  <Pencil size={16} />
                </button>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}
                  />
                ))}
              </div>

              <p className="text-slate-600 mb-3">{review.comment}</p>
              <p className="text-sm text-slate-400">Reviewed on {review.date}</p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}

export default MyReviews