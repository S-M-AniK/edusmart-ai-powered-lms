import { useState, useRef, useEffect } from "react"
import TeacherLayout from "../../components/TeacherLayout"
import { Bot, Send, Sparkles } from "lucide-react"
import API from "../../api/axios"

function TeacherAIAssistant() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I can help you draft course content, create quiz questions, summarize student feedback, or plan your curriculum. How can I assist you today?" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function handleSend(e) {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput("")
    setMessages(prev => [...prev, { sender: "user", text: userMessage }])
    setLoading(true)

    try {
      const res = await API.post("/chat", { message: userMessage })
      setMessages(prev => [...prev, { sender: "bot", text: res.data.response }])
    } catch (err) {
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, I'm having trouble connecting. Please try again!" }])
    }

    setLoading(false)
  }

  return (
    <TeacherLayout>
      <div className="mb-6" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Bot size={22} className="text-[#10B981]" />
          AI Assistant
        </h1>
        <p className="text-slate-500 mt-1">Get help with content creation and course planning.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 flex flex-col h-[65vh]" style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              style={{ animation: "fadeIn 0.3s ease-out" }}>
              <div className={`max-w-lg px-4 py-3 rounded-xl text-sm ${msg.sender === "user" ? "bg-[#10B981] text-white" : "bg-slate-100 text-slate-700"}`}>
                {msg.sender === "bot" && (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 mb-1 font-medium">
                    <Sparkles size={12} /> EduSmart AI
                  </span>
                )}
                <div style={{ whiteSpace: "pre-wrap" }}>{msg.text}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 px-4 py-3 rounded-xl">
                <span className="flex items-center gap-1 text-xs text-emerald-400 mb-1 font-medium">
                  <Sparkles size={12} /> EduSmart AI
                </span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="border-t border-slate-200 p-4 flex gap-3">
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            placeholder="Ask for help with your course..."
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] text-sm disabled:opacity-50" />
          <button type="submit" disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-lg bg-[#10B981] text-white hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center disabled:opacity-50">
            <Send size={18} />
          </button>
        </form>
      </div>
    </TeacherLayout>
  )
}

export default TeacherAIAssistant