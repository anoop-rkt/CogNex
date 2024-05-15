import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";

//Protected API
const chatRoutes = Router()
chatRoutes.post("/new", async (req, res, next) => {
    try {
        await validate(chatCompletionValidator)(req as any, res as any, next);
        await verifyToken(req, res, next);
        await generateChatCompletion(req as any, res as any, next);
    } catch (err) {
        next(err);
    }
});

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes