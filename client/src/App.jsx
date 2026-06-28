import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import StudentDashboard from "./pages/student/StudentDashboard"
import MyCourses from "./pages/student/MyCourses"
import LearningProgress from "./pages/student/LearningProgress"
import Wishlist from "./pages/student/Wishlist"
import RecommendedCourses from "./pages/student/RecommendedCourses"
import Certificates from "./pages/student/Certificates"
import MyReviews from "./pages/student/MyReviews"
import AIAssistant from "./pages/student/AIAssistant"
import Notifications from "./pages/student/Notifications"
import ProfileSettings from "./pages/student/ProfileSettings"
import Support from "./pages/student/Support"
import TeacherDashboard from "./pages/teacher/TeacherDashboard"
import TeacherMyCourses from "./pages/teacher/MyCourses"
import CreateCourse from "./pages/teacher/CreateCourse"
import Students from "./pages/teacher/Students"
import CurriculumManager from "./pages/teacher/CurriculumManager"
import Analytics from "./pages/teacher/Analytics"
import TeacherReviews from "./pages/teacher/Reviews"
import Announcements from "./pages/teacher/Announcements"
import Messages from "./pages/teacher/Messages"
import TeacherAIAssistant from "./pages/teacher/TeacherAIAssistant"
import TeacherNotifications from "./pages/teacher/TeacherNotifications"
import TeacherProfile from "./pages/teacher/TeacherProfile"
import AdminDashboard from "./pages/admin/AdminDashboard"
import ManageTeachers from "./pages/admin/ManageTeachers"
import ManageStudents from "./pages/admin/ManageStudents"
import ManageCourses from "./pages/admin/ManageCourses"
import ManageCategories from "./pages/admin/ManageCategories"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<MyCourses />} />
        <Route path="/student/progress" element={<LearningProgress />} />
        <Route path="/student/wishlist" element={<Wishlist />} />
        <Route path="/student/recommended" element={<RecommendedCourses />} />
        <Route path="/student/certificates" element={<Certificates />} />
        <Route path="/student/reviews" element={<MyReviews />} />
        <Route path="/student/ai-assistant" element={<AIAssistant />} />
        <Route path="/student/notifications" element={<Notifications />} />
        <Route path="/student/profile" element={<ProfileSettings />} />
        <Route path="/student/support" element={<Support />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/courses" element={<TeacherMyCourses />} />
        <Route path="/teacher/courses/create" element={<CreateCourse />} />
        <Route path="/teacher/students" element={<Students />} />
        <Route path="/teacher/curriculum" element={<CurriculumManager />} />
        <Route path="/teacher/analytics" element={<Analytics />} />
        <Route path="/teacher/reviews" element={<TeacherReviews />} />
        <Route path="/teacher/announcements" element={<Announcements />} />
        <Route path="/teacher/messages" element={<Messages />} />
        <Route path="/teacher/ai-assistant" element={<TeacherAIAssistant />} />
        <Route path="/teacher/notifications" element={<TeacherNotifications />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/teachers" element={<ManageTeachers />} />
        <Route path="/admin/students" element={<ManageStudents />} />
        <Route path="/admin/courses" element={<ManageCourses />} />
        <Route path="/admin/categories" element={<ManageCategories />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App