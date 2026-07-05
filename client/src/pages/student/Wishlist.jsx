import { useState, useEffect } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import { Heart, Star, ShoppingCart } from "lucide-react"
import { getStudentWishlist, removeFromWishlist } from "../../api/wishlist"
import { enrollCourse } from "../../api/enrollments"
import toast from "react-hot-toast"

const gradients = ["from-indigo-400 to-indigo-600", "from-sky-400 to-sky-600", "from-rose-400 to-rose-600", "from-emerald-400 to-emerald-600", "from-amber-400 to-amber-600"]

function Wishlist() {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "{}")
    setUser(u)
    if (u?.id) {
      getStudentWishlist(u.id)
        .then(res => { setWishlist(res.data.wishlist); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [])

  async function handleRemove(course_id) {
    try {
      await removeFromWishlist(user.id, course_id)
      toast.success("Removed from wishlist!")
      setWishlist(prev => prev.filter(w => w.course_id !== course_id))
    } catch (err) {
      console.error("Failed to remove from wishlist:", err)
    }
  }

  async function handleEnroll(course_id) {
    try {
      await enrollCourse({ student_id: user.id, course_id })
     toast.success("Enrolled successfully!")
      handleRemove(course_id)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to enroll!")
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Wishlist</h1>
        <p className="text-slate-500 mt-1">Courses you've saved for later.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading wishlist...</div>
      ) : wishlist.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Heart size={40} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">Your wishlist is empty.</p>
          <a href="/courses" className="mt-4 inline-block px-6 py-3 bg-[#6366F1] text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
            Browse Courses
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlist.map((item, i) => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              style={{ animation: `fadeIn 0.6s ease-out ${i * 0.08}s both` }}>
              <div className={`h-32 bg-linear-to-br ${gradients[i % gradients.length]} relative`}>
                <button onClick={() => handleRemove(item.course_id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
                  <Heart size={16} className="text-rose-500 fill-rose-500" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500 mb-3">by {item.teacher_name}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-1 text-sm text-slate-500">
                    <Star size={14} className="text-amber-400 fill-amber-400" /> 4.5
                  </span>
                  <span className="font-semibold text-slate-900">৳{item.price}</span>
                </div>

                <button onClick={() => handleEnroll(item.course_id)}
                  className="w-full py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <ShoppingCart size={16} />
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}

export default Wishlist