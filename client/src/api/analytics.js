import API from "./axios"

export const getAdminAnalytics = () => API.get("/analytics/admin")
export const getTeacherAnalytics = (teacher_id) => API.get(`/analytics/teacher/${teacher_id}`)
export const getStudentAnalytics = (student_id) => API.get(`/analytics/student/${student_id}`)