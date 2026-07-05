import API from "./axios"

export const getAllCourses = () => API.get("/courses")
export const getCourseById = (id) => API.get(`/courses/${id}`)
export const getTeacherCourses = (teacher_id) => API.get(`/courses/teacher/${teacher_id}`)
export const createCourse = (data) => API.post("/courses", data)
export const updateCourse = (id, data) => API.put(`/courses/${id}`, data)
export const updateCourseStatus = (id, status) => API.patch(`/courses/${id}/status`, { status })
export const deleteCourse = (id) => API.delete(`/courses/${id}`)