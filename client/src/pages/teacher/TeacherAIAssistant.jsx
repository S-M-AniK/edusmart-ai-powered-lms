import { useState } from "react"
import TeacherLayout from "../../components/TeacherLayout"
import { Bot, Send, Sparkles } from "lucide-react"

function TeacherAIAssistant() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I can help you draft course content, summarize feedback, or suggest quiz questions." },
  ])
  const [input, setInput] = useState("")

  function handleSend(e) {
    e.preventDefault()
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
      { sender: "bot", text: "Got it! (AI response will be connected to OpenAI API soon.)" },
    ])
    setInput("")
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

      <div
        className="bg-white rounded-xl border border-slate-200 flex flex-col h-[60vh]"
        style={{ animation: "fadeIn 0.6s ease-out 0.1s both" }}
      >
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-md px-4 py-2.5 rounded-xl text-sm ${
                  msg.sender === "user" ? "bg-[#10B981] text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {msg.sender === "bot" && (
                  <span className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                    <Sparkles size={12} /> AI Assistant
                  </span>
                )}
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="border-t border-slate-200 p-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for help with your course..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-lg bg-[#10B981] text-white hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </TeacherLayout>
  )
}

export default TeacherAIAssistant