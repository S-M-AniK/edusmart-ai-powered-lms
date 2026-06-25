import { useState } from "react"
import TeacherLayout from "../../components/TeacherLayout"
import { Send, Search } from "lucide-react"

const conversations = [
  { name: "Tanvir Ahmed", lastMessage: "Thank you for the clarification!", time: "10m", unread: true },
  { name: "Nusrat Jahan", lastMessage: "Can you review my assignment?", time: "2h", unread: true },
  { name: "Rifat Karim", lastMessage: "Got it, thanks!", time: "1d", unread: false },
]

const sampleMessages = [
  { sender: "them", text: "Hi! I have a question about the React hooks lecture." },
  { sender: "me", text: "Sure, what would you like to know?" },
  { sender: "them", text: "Thank you for the clarification!" },
]

function Messages() {
  const [activeChat, setActiveChat] = useState(0)
  const [input, setInput] = useState("")

  return (
    <TeacherLayout>
      <div className="mb-6" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
        <p className="text-slate-500 mt-1">Chat with your students.</p>
      </div>

      <div
        className="bg-white rounded-xl border border-slate-200 flex h-[60vh] overflow-hidden"
        style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}
      >
        <div className="w-72 border-r border-slate-100 flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv, i) => (
              <button
                key={conv.name}
                onClick={() => setActiveChat(i)}
                className={`w-full flex items-center gap-3 p-4 text-left border-b border-slate-50 transition-colors ${
                  activeChat === i ? "bg-[#10B981]/5" : "hover:bg-slate-50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {conv.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${conv.unread ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`}>
                      {conv.name}
                    </p>
                    <span className="text-xs text-slate-400">{conv.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <p className="font-medium text-slate-900">{conversations[activeChat].name}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {sampleMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-md px-4 py-2.5 rounded-xl text-sm ${
                    msg.sender === "me" ? "bg-[#10B981] text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-4 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] text-sm"
            />
            <button className="px-4 py-2.5 rounded-lg bg-[#10B981] text-white hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
}

export default Messages