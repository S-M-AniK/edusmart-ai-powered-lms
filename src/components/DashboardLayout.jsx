import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  Sparkles,
  Heart,
  Award,
  MessageSquare,
  Bot,
  Bell,
  Settings,
  LifeBuoy,
  LogOut,
} from "lucide-react"

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
  { label: "My Courses", icon: BookOpen, path: "/student/courses" },
  { label: "Learning Progress", icon: TrendingUp, path: "/student/progress" },
  { label: "Recommended Courses", icon: Sparkles, path: "/student/recommended" },
  { label: "Wishlist", icon: Heart, path: "/student/wishlist" },
  { label: "Certificates", icon: Award, path: "/student/certificates" },
  { label: "My Reviews", icon: MessageSquare, path: "/student/reviews" },
  { label: "AI Assistant", icon: Bot, path: "/student/ai-assistant" },
  { label: "Notifications", icon: Bell, path: "/student/notifications" },
  { label: "Profile Settings", icon: Settings, path: "/student/profile" },
  { label: "Support", icon: LifeBuoy, path: "/student/support" },
]

function DashboardLayout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex bg-[#FAFAF8]">
      <aside className="w-64 bg-[#1E1B4B] text-white flex flex-col fixed h-screen">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-white/10">
          <span className="w-9 h-9 rounded-lg bg-white text-[#1E1B4B] flex items-center justify-center font-bold">
            E
          </span>
          <span className="text-lg font-semibold">EduSmart</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#F59E0B] text-[#1E1B4B]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white w-full transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  )
}

export default DashboardLayout