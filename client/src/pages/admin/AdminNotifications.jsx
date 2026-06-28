import AdminLayout from "../../components/AdminLayout"
import { Bell, BookOpen, MessageSquare, AlertTriangle } from "lucide-react"

const notifications = [
  { icon: BookOpen, text: "New course 'React Native Crash Course' awaiting approval", time: "2 hours ago", unread: true },
  { icon: AlertTriangle, text: "A review has been flagged for moderation", time: "5 hours ago", unread: true },
  { icon: MessageSquare, text: "New contact message from Arif Hasan", time: "1 day ago", unread: false },
  { icon: BookOpen, text: "Teacher Mou Akhter created a new course", time: "3 days ago", unread: false },
]

function AdminNotifications() {
  return (
    <AdminLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Bell size={22} className="text-[#6366F1]" />
          Notifications
        </h1>
        <p className="text-slate-500 mt-1">Platform activity that needs your attention.</p>
      </div>

      <div
        className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100"
        style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}
      >
        {notifications.map((notif, i) => {
          const Icon = notif.icon
          return (
            <div
              key={i}
              className="flex items-start gap-4 p-5 hover:bg-slate-50 transition-colors duration-200"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  notif.unread ? "bg-[#6366F1]/10" : "bg-slate-100"
                }`}
              >
                <Icon size={18} className={notif.unread ? "text-[#6366F1]" : "text-slate-400"} />
              </div>
              <div className="flex-1">
                <p className={`text-sm ${notif.unread ? "font-medium text-slate-900" : "text-slate-600"}`}>
                  {notif.text}
                </p>
                <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
              </div>
              {notif.unread && <span className="w-2 h-2 rounded-full bg-[#6366F1] mt-2"></span>}
            </div>
          )
        })}
      </div>
    </AdminLayout>
  )
}

export default AdminNotifications