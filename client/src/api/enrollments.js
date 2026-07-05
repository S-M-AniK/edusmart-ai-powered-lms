import API from "./axios"

export const enrollCourse = (data) => API.post("/enrollments", data)
export const getStudentEnrollments = (student_id) => API.get(`/enrollments/student/${student_id}`)
export const getCourseEnrollments = (course_id) => API.get(`/enrollments/course/${course_id}`)
export const updateProgress = (student_id, course_id, progress) => API.patch(`/enrollments/progress/${student_id}/${course_id}`, { progress })
export const unenrollCourse = (student_id, course_id) => API.delete(`/enrollments/${student_id}/${course_id}`)