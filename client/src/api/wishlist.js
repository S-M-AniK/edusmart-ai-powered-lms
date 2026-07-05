import API from "./axios"

export const addToWishlist = (data) => API.post("/wishlist", data)
export const getStudentWishlist = (student_id) => API.get(`/wishlist/student/${student_id}`)
export const removeFromWishlist = (student_id, course_id) => API.delete(`/wishlist/${student_id}/${course_id}`)