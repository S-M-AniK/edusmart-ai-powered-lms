import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FolderTree,
  MessageSquare,
  FileText,
  Mail,
  Award,
  Megaphone,
  Bell,
  BarChart3,
  Settings,
  UserCircle,
  LogOut,
} from "lucide-react"

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Manage Teachers", icon: GraduationCap, path: "/admin/teachers" },
  { label: "Manage Students", icon: Users, path: "/admin/students" },
  { label: "Manage Courses", icon: BookOpen, path: "/admin/courses" },
  { label: "Manage Categories", icon: FolderTree, path: "/admin/categories" },
  { label: "Manage Reviews", icon: MessageSquare, path: "/admin/reviews" },
  { label: "Manage Blogs", icon: FileText, path: "/admin/blogs" },
  { label: "Contact Messages", icon: Mail, path: "/admin/messages" },
  { label: "Certificates", icon: Award, path: "/admin/certificates" },
  { label: "Announcements", icon: Megaphone, path: "/admin/announcements" },
  { label: "Notifications", icon: Bell, path: "/admin/notifications" },
  { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
  { label: "Profile", icon: UserCircle, path: "/admin/profile" },
]

function AdminLayout({ children }) {
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
                    ? "bg-[#6366F1] text-white"
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

export default AdminLayout