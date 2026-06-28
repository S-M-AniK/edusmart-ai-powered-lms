import { useState } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Mail, Trash2, MailOpen } from "lucide-react"

const initialMessages = [
  { name: "Arif Hasan", email: "arif.hasan@example.com", subject: "Question about course pricing", message: "Hi, I wanted to ask if there are any discounts for bulk enrollment for my school.", date: "Jun 24, 2026", read: false },
  { name: "Sumaiya Akter", email: "sumaiya@example.com", subject: "Technical issue with video playback", message: "The videos in my React course keep buffering. Can you please help?", date: "Jun 22, 2026", read: true },
  { name: "Kazi Rahman", email: "kazi.rahman@example.com", subject: "Partnership inquiry", message: "I represent a coding bootcamp and would like to discuss a potential partnership.", date: "Jun 19, 2026", read: true },
]

function ContactMessages() {
  const [messages, setMessages] = useState(initialMessages)

  function markRead(email) {
    setMessages((prev) => prev.map((m) => (m.email === email ? { ...m, read: true } : m)))
  }

  function remove(email) {
    setMessages((prev) => prev.filter((m) => m.email !== email))
  }

  return (
    <AdminLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
        <p className="text-slate-500 mt-1">Messages submitted through the contact form.</p>
      </div>

      <div className="space-y-3">
        {messages.map((msg, i) => (
          <div
            key={msg.email}
            className={`bg-white rounded-xl border p-5 hover:shadow-md transition-all duration-300 ${
              msg.read ? "border-slate-200" : "border-[#6366F1]/30 bg-[#6366F1]/[0.02]"
            }`}
            style={{ animation: `fadeIn 0.5s ease-out ${i * 0.08}s both` }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {msg.name.charAt(0)}
                </div>
                <div>
                  <p className={`text-sm ${msg.read ? "font-medium text-slate-900" : "font-semibold text-slate-900"}`}>
                    {msg.name} {!msg.read && <span className="w-2 h-2 inline-block rounded-full bg-[#6366F1] ml-1"></span>}
                  </p>
                  <p className="text-xs text-slate-400">{msg.email}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400">{msg.date}</span>
            </div>

            <p className="font-medium text-slate-800 mb-1 ml-12">{msg.subject}</p>
            <p className="text-sm text-slate-500 ml-12 mb-3">{msg.message}</p>

            <div className="flex items-center gap-4 ml-12">
              {!msg.read && (
                <button
                  onClick={() => markRead(msg.email)}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#5558e0] transition-colors"
                >
                  <MailOpen size={15} />
                  Mark as Read
                </button>
              )}
              <button className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
                <Mail size={15} />
                Reply
              </button>
              <button
                onClick={() => remove(msg.email)}
                className="flex items-center gap-1.5 text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}

export default ContactMessages