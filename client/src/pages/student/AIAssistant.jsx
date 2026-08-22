import { useState, useRef, useEffect } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import { Bot, Send, Sparkles } from "lucide-react"
import API from "../../api/axios"

function AIAssistant() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm your EduSmart AI Assistant. Ask me anything about your courses, learning strategies, or career guidance!" },
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

    const updatedMessages = [...messages, { sender: "user", text: userMessage }]
    setMessages(updatedMessages)
    setLoading(true)

    try {
      const history = updatedMessages.slice(-6).map(m => ({
  role: m.sender === "user" ? "user" : "assistant",
  content: m.text
}))

      const res = await API.post("/chat", { message: userMessage, history })
      setMessages(prev => [...prev, { sender: "bot", text: res.data.response }])
    } catch (err) {
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, I'm having trouble connecting. Please try again!" }])
    }

    setLoading(false)
  }

  return (
    <DashboardLayout>
      <div className="mb-6" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Bot size={22} className="text-[#6366F1]" />
          AI Assistant
        </h1>
        <p className="text-slate-500 mt-1">Ask questions about your courses anytime.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 flex flex-col h-[65vh]" style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              style={{ animation: "fadeIn 0.3s ease-out" }}>
              <div className={`max-w-lg px-4 py-3 rounded-xl text-sm ${msg.sender === "user" ? "bg-[#6366F1] text-white" : "bg-slate-100 text-slate-700"}`}>
                {msg.sender === "bot" && (
                  <span className="flex items-center gap-1 text-xs text-indigo-400 mb-1 font-medium">
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
                <span className="flex items-center gap-1 text-xs text-indigo-400 mb-1 font-medium">
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
            placeholder="Ask something about your courses..."
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm disabled:opacity-50" />
          <button type="submit" disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-lg bg-[#6366F1] text-white hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50">
            <Send size={18} />
          </button>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default AIAssistant