import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendWelcomeEmail(to, name) {
  await transporter.sendMail({
    from: `"EduSmart" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to EduSmart! 🎓",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #f8f9ff;">
        <div style="background: linear-gradient(135deg, #6c63ff, #3b37d4); padding: 40px; border-radius: 16px; text-align: center; margin-bottom: 32px;">
          <h1 style="color: #fff; font-size: 32px; margin: 0;">Welcome to EduSmart! 🎓</h1>
        </div>
        <div style="background: #fff; padding: 32px; border-radius: 16px;">
          <h2 style="color: #1a1a2e;">Hi ${name}!</h2>
          <p style="color: #666; line-height: 1.7;">Welcome to EduSmart — your AI-powered learning platform. We're excited to have you on board!</p>
          <p style="color: #666; line-height: 1.7;">Start exploring our courses and let our AI assistant guide your learning journey.</p>
          <a href="http://localhost:5173" style="display: inline-block; margin-top: 24px; padding: 14px 32px; background: #6c63ff; color: #fff; border-radius: 10px; text-decoration: none; font-weight: 700;">
            Start Learning →
          </a>
        </div>
        <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 24px;">© 2025 EduSmart. All rights reserved.</p>
      </div>
    `,
  })
}

export async function sendEnrollmentEmail(to, name, courseTitle) {
  await transporter.sendMail({
    from: `"EduSmart" <${process.env.EMAIL_USER}>`,
    to,
    subject: `You're enrolled in ${courseTitle}! 📚`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #f8f9ff;">
        <div style="background: linear-gradient(135deg, #6c63ff, #3b37d4); padding: 40px; border-radius: 16px; text-align: center; margin-bottom: 32px;">
          <h1 style="color: #fff; font-size: 28px; margin: 0;">Enrollment Confirmed! 📚</h1>
        </div>
        <div style="background: #fff; padding: 32px; border-radius: 16px;">
          <h2 style="color: #1a1a2e;">Hi ${name}!</h2>
          <p style="color: #666; line-height: 1.7;">You have successfully enrolled in <strong>${courseTitle}</strong>.</p>
          <p style="color: #666; line-height: 1.7;">Start learning today and track your progress on your dashboard.</p>
          <a href="http://localhost:5173/student/courses" style="display: inline-block; margin-top: 24px; padding: 14px 32px; background: #6c63ff; color: #fff; border-radius: 10px; text-decoration: none; font-weight: 700;">
            Go to My Courses →
          </a>
        </div>
        <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 24px;">© 2025 EduSmart. All rights reserved.</p>
      </div>
    `,
  })
}

export async function sendCourseApprovedEmail(to, name, courseTitle) {
  await transporter.sendMail({
    from: `"EduSmart" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Your course "${courseTitle}" has been approved! ✅`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #f8f9ff;">
        <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 40px; border-radius: 16px; text-align: center; margin-bottom: 32px;">
          <h1 style="color: #fff; font-size: 28px; margin: 0;">Course Approved! ✅</h1>
        </div>
        <div style="background: #fff; padding: 32px; border-radius: 16px;">
          <h2 style="color: #1a1a2e;">Hi ${name}!</h2>
          <p style="color: #666; line-height: 1.7;">Great news! Your course <strong>${courseTitle}</strong> has been approved and is now live on EduSmart.</p>
          <p style="color: #666; line-height: 1.7;">Students can now enroll and start learning from your course.</p>
          <a href="http://localhost:5173/teacher/courses" style="display: inline-block; margin-top: 24px; padding: 14px 32px; background: #10B981; color: #fff; border-radius: 10px; text-decoration: none; font-weight: 700;">
            View My Courses →
          </a>
        </div>
        <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 24px;">© 2025 EduSmart. All rights reserved.</p>
      </div>
    `,
  })
}