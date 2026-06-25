import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  ListTree,
  Users,
  BarChart3,
  MessageSquare,
  Megaphone,
  Mail,
  Bot,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/teacher/dashboard" },
  { label: "My Courses", icon: BookOpen, path: "/teacher/courses" },
  { label: "Create Course", icon: PlusCircle, path: "/teacher/courses/create" },
  { label: "Curriculum Manager", icon: ListTree, path: "/teacher/curriculum" },
  { label: "Students", icon: Users, path: "/teacher/students" },
  { label: "Analytics", icon: BarChart3, path: "/teacher/analytics" },
  { label: "Reviews", icon: MessageSquare, path: "/teacher/reviews" },
  { label: "Announcements", icon: Megaphone, path: "/teacher/announcements" },
  { label: "Messages", icon: Mail, path: "/teacher/messages" },
  { label: "AI Assistant", icon: Bot, path: "/teacher/ai-assistant" },
  { label: "Notifications", icon: Bell, path: "/teacher/notifications" },
  { label: "Profile", icon: Settings, path: "/teacher/profile" },
]

function TeacherLayout({ children }) {
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
                    ? "bg-[#10B981] text-white"
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

export default TeacherLayout