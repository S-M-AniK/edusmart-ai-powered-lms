import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import StudentDashboard from "./pages/student/StudentDashboard"
import MyCourses from "./pages/student/MyCourses"
import LearningProgress from "./pages/student/LearningProgress"
import Wishlist from "./pages/student/Wishlist"

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
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App