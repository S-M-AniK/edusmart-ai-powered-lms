import Groq from "groq-sdk"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function chat(req, res) {
  try {
    const { message, history = [] } = req.body

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" })
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are EduSmart AI Assistant, a helpful learning assistant for an online education platform called EduSmart. You help students with:
- Course recommendations
- Learning strategies
- Subject explanations
- Study tips
- Career guidance in tech fields

Be friendly, concise, and encouraging. Answer in the same language the user writes in. Keep responses short and to the point — maximum 3-4 sentences or bullet points. No long explanations.`
        },
        ...history,
        {
          role: "user",
          content: message
        }
      ],
      model: "groq/compound-mini",
      max_tokens: 1024,
    })

    let response = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response."
    response = response.replace(/<think>[\s\S]*?<\/think>/g, "").trim()
    res.json({ success: true, response })
  } catch (err) {
    console.error("Chat error:", err)
    res.status(500).json({ success: false, message: "AI service error" })
  }
}