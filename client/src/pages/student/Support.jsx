import { useState } from "react"
import DashboardLayout from "../../components/DashboardLayout"
import { LifeBuoy, Mail, MessageCircle, ChevronDown } from "lucide-react"

const faqs = [
  { q: "How do I reset my password?", a: "Go to Profile Settings and use the Change Password section." },
  { q: "How do I get a refund for a course?", a: "Contact support within 7 days of purchase with your order ID." },
  { q: "Can I download course videos?", a: "Currently videos are streaming-only and cannot be downloaded." },
]

function Support() {
  const [openFaq, setOpenFaq] = useState(null)
  const [message, setMessage] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    console.log("Support request:", message)
    setMessage("")
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <LifeBuoy size={22} className="text-[#6366F1]" />
          Support
        </h1>
        <p className="text-slate-500 mt-1">Get help or reach out to our team.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-100 rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-sm font-medium text-slate-900">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <p className="px-4 pb-4 text-sm text-slate-500">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Contact Us</h2>

          <div className="flex items-center gap-3 text-sm text-slate-600 mb-2">
            <Mail size={16} className="text-[#6366F1]" />
            support@edusmart.com
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600 mb-6">
            <MessageCircle size={16} className="text-[#6366F1]" />
            Live chat available 9am - 6pm
          </div>

          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Send us a message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Describe your issue..."
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] resize-none mb-4"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg font-medium text-white bg-[#6366F1] hover:opacity-90 transition-opacity"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Support