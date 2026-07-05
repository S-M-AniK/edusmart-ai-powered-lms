import API from "./axios"

export const createReview = (data) => API.post("/reviews", data)
export const getCourseReviews = (course_id) => API.get(`/reviews/course/${course_id}`)
export const getAllReviews = () => API.get("/reviews")
export const approveReview = (id, approved) => API.patch(`/reviews/${id}/approve`, { approved })
export const deleteReview = (id) => API.delete(`/reviews/${id}`)