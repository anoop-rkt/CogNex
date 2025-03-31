import axios from "axios"

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password })
    if (res.status !== 200) {
        throw new Error("Unable to login!")
    }
    const data = await res.data
    return data
}

export const signupUser = async (name: string, email: string, password: string) => {
    const res = await axios.post("/user/signup", { name, email, password })
    if (res.status !== 201) {
        throw new Error("Unable to Signup!")
    }
    const data = await res.data
    return data
}

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status")
    if (res.status !== 200) {
        throw new Error("Authentication failed!")
    }
    const data = await res.data
    return data
}

export const createNewChatSession = async () => {
    const res = await axios.post("/chat/new-session")
    if (res.status !== 201) {
        throw new Error("Unable to create new chat session")
    }
    const data = await res.data
    return data
}

export const sendChatRequest = async (message: string, sessionId: string) => {
    const res = await axios.post("/chat/new", { message, sessionId })
    if (res.status !== 200) {
        throw new Error("Unable to send chat")
    }
    const data = await res.data
    return data
}

export const getUserChats = async () => {
    const res = await axios.get("/chat/all-chats")
    if (res.status !== 200) {
        throw new Error("Unable to get chats")
    }
    const data = await res.data
    return data
}

export const deleteChatSession = async (sessionId: string) => {
    const res = await axios.delete(`/chat/session/${sessionId}`)
    if (res.status !== 200) {
        throw new Error("Unable to delete chat session")
    }
    const data = await res.data
    return data
}

export const updateChatTitle = async (sessionId: string, title: string) => {
    const res = await axios.patch(`/chat/session/${sessionId}/title`, { title })
    if (res.status !== 200) {
        throw new Error("Unable to update chat title")
    }
    const data = await res.data
    return data
}

export const logoutUser = async () => {
    const res = await axios.get("/user/logout")
    if (res.status !== 200) {
        throw new Error("Logout failed")
    }
    const data = await res.data
    return data
}

