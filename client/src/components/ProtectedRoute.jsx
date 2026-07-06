import { Navigate } from "react-router-dom"

function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user") || "null")
  const token = localStorage.getItem("token")

  if (!user || !token) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />
    if (user.role === "teacher") return <Navigate to="/teacher/dashboard" replace />
    return <Navigate to="/student/dashboard" replace />
  }

  return children
}

export default ProtectedRoute