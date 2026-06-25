import DashboardLayout from "../../components/DashboardLayout"
import { Bell, BookOpen, Award, MessageSquare } from "lucide-react"

const notifications = [
  { icon: BookOpen, text: "New lesson added to React for Beginners", time: "2 hours ago", unread: true },
  { icon: Award, text: "You earned a certificate for Python Data Science", time: "1 day ago", unread: true },
  { icon: MessageSquare, text: "Imran Hossain replied to your review", time: "3 days ago", unread: false },
  { icon: BookOpen, text: "Reminder: Continue UI/UX Design Basics", time: "5 days ago", unread: false },
]

function Notifications() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Bell size={22} className="text-[#6366F1]" />
          Notifications
        </h1>
        <p className="text-slate-500 mt-1">Stay updated on your courses and activity.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
        {notifications.map((notif, i) => {
          const Icon = notif.icon
          return (
            <div key={i} className="flex items-start gap-4 p-5">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
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
              {notif.unread && (
                <span className="w-2 h-2 rounded-full bg-[#6366F1] mt-2"></span>
              )}
            </div>
          )
        })}
      </div>
    </DashboardLayout>
  )
}

export default Notifications