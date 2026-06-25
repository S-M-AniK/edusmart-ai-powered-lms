import TeacherLayout from "../../components/TeacherLayout"
import { Star, MessageSquare } from "lucide-react"

const reviews = [
  { student: "Tanvir Ahmed", course: "React for Beginners", rating: 5, comment: "Excellent teaching style, very clear explanations!", date: "Jun 20, 2026" },
  { student: "Nusrat Jahan", course: "React for Beginners", rating: 4, comment: "Good course, would like more hands-on exercises.", date: "Jun 15, 2026" },
  { student: "Rifat Karim", course: "Advanced State Management", rating: 5, comment: "Helped me understand Redux finally!", date: "Jun 10, 2026" },
]

function Reviews() {
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <TeacherLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Reviews</h1>
        <p className="text-slate-500 mt-1">Feedback from your students.</p>
      </div>

      <div
        className="bg-[#1E1B4B] rounded-xl p-6 mb-8 text-white flex items-center justify-between hover:shadow-lg transition-shadow duration-300"
        style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}
      >
        <div>
          <p className="text-white/60 text-sm mb-1">Average Rating</p>
          <p className="text-3xl font-bold">{avgRating} / 5.0</p>
        </div>
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
          <Star size={24} className="text-[#F59E0B] fill-[#F59E0B]" />
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <MessageSquare size={40} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              style={{ animation: `fadeIn 0.6s ease-out ${0.2 + i * 0.1}s both` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{review.student}</h3>
                  <p className="text-sm text-slate-500">{review.course}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className={j < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}
                    />
                  ))}
                </div>
              </div>

              <p className="text-slate-600 mb-3">{review.comment}</p>
              <p className="text-sm text-slate-400">{review.date}</p>
            </div>
          ))}
        </div>
      )}
    </TeacherLayout>
  )
}

export default Reviews