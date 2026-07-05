import API from "./axios"

export const createContact = (data) => API.post("/contacts", data)
export const getContacts = () => API.get("/contacts")
export const deleteContact = (id) => API.delete(`/contacts/${id}`)