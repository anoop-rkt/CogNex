import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { 
    createNewChat, 
    deleteChatSession, 
    generateChatCompletion, 
    sendChatsToUser,
    updateChatTitle 
} from "../controllers/chat-controllers.js";

//Protected API
const chatRoutes = Router()

// Create new chat session
chatRoutes.post("/new-session", verifyToken, createNewChat);

// Apply validation and token verification before the chat completion
chatRoutes.post("/new", 
    validate(chatCompletionValidator),
    verifyToken,
    generateChatCompletion
);

// Get all chat sessions
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);

// Delete a specific chat session
chatRoutes.delete("/session/:sessionId", verifyToken, deleteChatSession);

// Update chat session title
chatRoutes.patch("/session/:sessionId/title", verifyToken, updateChatTitle);

export default chatRoutes