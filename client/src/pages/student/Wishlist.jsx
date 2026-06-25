import DashboardLayout from "../../components/DashboardLayout"
import { Heart, Star, ShoppingCart } from "lucide-react"

const wishlistCourses = [
  { name: "Advanced JavaScript", teacher: "Rifat Karim", price: "$49", rating: 4.8, image: "from-indigo-400 to-indigo-600" },
  { name: "Cloud Computing with AWS", teacher: "Mahbub Alam", price: "$59", rating: 4.7, image: "from-sky-400 to-sky-600" },
  { name: "Digital Marketing Mastery", teacher: "Nusrat Jahan", price: "$39", rating: 4.6, image: "from-rose-400 to-rose-600" },
]

function Wishlist() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Wishlist</h1>
        <p className="text-slate-500 mt-1">Courses you've saved for later.</p>
      </div>

      {wishlistCourses.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Heart size={40} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlistCourses.map((course) => (
            <div
              key={course.name}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className={`h-32 bg-gradient-to-br ${course.image} relative`}>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                  <Heart size={16} className="text-rose-500 fill-rose-500" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 mb-1">{course.name}</h3>
                <p className="text-sm text-slate-500 mb-3">by {course.teacher}</p>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm text-slate-500">
                    <Star size={14} className="text-amber-400 fill-amber-400" /> {course.rating}
                  </span>
                  <span className="font-semibold text-slate-900">{course.price}</span>
                </div>

                <button className="w-full mt-4 py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
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