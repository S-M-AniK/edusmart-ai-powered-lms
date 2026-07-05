import { useState, useEffect } from "react"
import AdminLayout from "../../components/AdminLayout"
import { Mail, Trash2 } from "lucide-react"
import { getContacts, deleteContact } from "../../api/contacts"

function ContactMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    try {
      const res = await getContacts()
      setMessages(res.data.contacts)
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch messages:", err)
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this message?")) return
    try {
      await deleteContact(id)
      fetchMessages()
    } catch (err) {
      console.error("Failed to delete message:", err)
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
        <p className="text-slate-500 mt-1">Messages submitted through the contact form.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-slate-400">No messages yet.</div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <div key={msg.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all duration-300"
              style={{ animation: `fadeIn 0.5s ease-out ${i * 0.08}s both` }}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-sm font-medium shrink-0">
                    {msg.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{msg.name}</p>
                    <p className="text-xs text-slate-400">{msg.email}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">{new Date(msg.created_at).toLocaleDateString()}</span>
              </div>

              <p className="text-sm text-slate-500 ml-12 mb-3">{msg.message}</p>

              <div className="flex items-center gap-4 ml-12">
                <a href={`mailto:${msg.email}`}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#5558e0] transition-colors">
                  <Mail size={15} />
                  Reply
                </a>
                <button onClick={() => handleDelete(msg.id)}
                  className="flex items-center gap-1.5 text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors">
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}

export default ContactMessages