import TeacherLayout from "../../components/TeacherLayout"
import { Bell, Users, Star, MessageSquare } from "lucide-react"

const notifications = [
  { icon: Users, text: "New student enrolled in React for Beginners", time: "2 hours ago", unread: true },
  { icon: Star, text: "You received a 5-star review from Tanvir Ahmed", time: "5 hours ago", unread: true },
  { icon: MessageSquare, text: "Nusrat Jahan sent you a message", time: "1 day ago", unread: false },
  { icon: Users, text: "3 new students enrolled this week", time: "3 days ago", unread: false },
]

function TeacherNotifications() {
  return (
    <TeacherLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Bell size={22} className="text-[#10B981]" />
          Notifications
        </h1>
        <p className="text-slate-500 mt-1">Stay updated on your courses and students.</p>
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
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  notif.unread ? "bg-[#10B981]/10" : "bg-slate-100"
                }`}
              >
                <Icon size={18} className={notif.unread ? "text-[#10B981]" : "text-slate-400"} />
              </div>
              <div className="flex-1">
                <p className={`text-sm ${notif.unread ? "font-medium text-slate-900" : "text-slate-600"}`}>
                  {notif.text}
                </p>
                <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
              </div>
              {notif.unread && <span className="w-2 h-2 rounded-full bg-[#10B981] mt-2"></span>}
            </div>
          )
        })}
      </div>
    </TeacherLayout>
  )
}

export default TeacherNotifications