import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import CoursesPage from "./pages/CoursesPage"
import CourseDetailPage from "./pages/CourseDetailPage"
import TeachersPage from "./pages/TeachersPage"
import TeacherDetailPage from "./pages/TeacherDetailPage"
import ReviewsPage from "./pages/ReviewsPage"
import BlogPage from "./pages/BlogPage"
import ContactPage from "./pages/ContactPage"
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
import EditCourse from "./pages/teacher/EditCourse"
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
import ManageReviews from "./pages/admin/ManageReviews"
import ManageBlogs from "./pages/admin/ManageBlogs"
import ContactMessages from "./pages/admin/ContactMessages"
import AdminCertificates from "./pages/admin/AdminCertificates"
import AdminAnnouncements from "./pages/admin/AdminAnnouncements"
import AdminNotifications from "./pages/admin/AdminNotifications"
import AdminAnalytics from "./pages/admin/AdminAnalytics"
import AdminSettings from "./pages/admin/AdminSettings"
import AdminProfile from "./pages/admin/AdminProfile"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/teachers/:id" element={<TeacherDetailPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/courses" element={<ProtectedRoute allowedRoles={["student"]}><MyCourses /></ProtectedRoute>} />
        <Route path="/student/progress" element={<ProtectedRoute allowedRoles={["student"]}><LearningProgress /></ProtectedRoute>} />
        <Route path="/student/wishlist" element={<ProtectedRoute allowedRoles={["student"]}><Wishlist /></ProtectedRoute>} />
        <Route path="/student/recommended" element={<ProtectedRoute allowedRoles={["student"]}><RecommendedCourses /></ProtectedRoute>} />
        <Route path="/student/certificates" element={<ProtectedRoute allowedRoles={["student"]}><Certificates /></ProtectedRoute>} />
        <Route path="/student/reviews" element={<ProtectedRoute allowedRoles={["student"]}><MyReviews /></ProtectedRoute>} />
        <Route path="/student/ai-assistant" element={<ProtectedRoute allowedRoles={["student"]}><AIAssistant /></ProtectedRoute>} />
        <Route path="/student/notifications" element={<ProtectedRoute allowedRoles={["student"]}><Notifications /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute allowedRoles={["student"]}><ProfileSettings /></ProtectedRoute>} />
        <Route path="/student/support" element={<ProtectedRoute allowedRoles={["student"]}><Support /></ProtectedRoute>} />

        <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/teacher/courses" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherMyCourses /></ProtectedRoute>} />
        <Route path="/teacher/courses/create" element={<ProtectedRoute allowedRoles={["teacher"]}><CreateCourse /></ProtectedRoute>} />
        <Route path="/teacher/courses/edit/:id" element={<ProtectedRoute allowedRoles={["teacher"]}><EditCourse /></ProtectedRoute>} />
        <Route path="/teacher/students" element={<ProtectedRoute allowedRoles={["teacher"]}><Students /></ProtectedRoute>} />
        <Route path="/teacher/curriculum" element={<ProtectedRoute allowedRoles={["teacher"]}><CurriculumManager /></ProtectedRoute>} />
        <Route path="/teacher/analytics" element={<ProtectedRoute allowedRoles={["teacher"]}><Analytics /></ProtectedRoute>} />
        <Route path="/teacher/reviews" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherReviews /></ProtectedRoute>} />
        <Route path="/teacher/announcements" element={<ProtectedRoute allowedRoles={["teacher"]}><Announcements /></ProtectedRoute>} />
        <Route path="/teacher/messages" element={<ProtectedRoute allowedRoles={["teacher"]}><Messages /></ProtectedRoute>} />
        <Route path="/teacher/ai-assistant" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherAIAssistant /></ProtectedRoute>} />
        <Route path="/teacher/notifications" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherNotifications /></ProtectedRoute>} />
        <Route path="/teacher/profile" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherProfile /></ProtectedRoute>} />

        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/teachers" element={<ProtectedRoute allowedRoles={["admin"]}><ManageTeachers /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute allowedRoles={["admin"]}><ManageStudents /></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={["admin"]}><ManageCourses /></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute allowedRoles={["admin"]}><ManageCategories /></ProtectedRoute>} />
        <Route path="/admin/reviews" element={<ProtectedRoute allowedRoles={["admin"]}><ManageReviews /></ProtectedRoute>} />
        <Route path="/admin/blogs" element={<ProtectedRoute allowedRoles={["admin"]}><ManageBlogs /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute allowedRoles={["admin"]}><ContactMessages /></ProtectedRoute>} />
        <Route path="/admin/certificates" element={<ProtectedRoute allowedRoles={["admin"]}><AdminCertificates /></ProtectedRoute>} />
        <Route path="/admin/announcements" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAnnouncements /></ProtectedRoute>} />
        <Route path="/admin/notifications" element={<ProtectedRoute allowedRoles={["admin"]}><AdminNotifications /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAnalytics /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={["admin"]}><AdminSettings /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={["admin"]}><AdminProfile /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App