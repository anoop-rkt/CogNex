import User, { IChat, IChatSession } from "../models/User.js";
import { Request, Response, NextFunction } from "express";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import  configureOpenAI  from "../config/openai-config.js";
import { randomUUID } from "crypto";

// Comprehensive mock responses for different types of questions
const mockResponses = {
    greetings: [
        "Hello! How can I assist you today?",
        "Hi there! I'm happy to help you with any questions you might have.",
        "Greetings! What would you like to know about?",
        "Hello! I'm here to help you learn and explore new topics.",
        "Hi! I'm ready to assist you with your questions."
    ],
    technical: [
        "That's an interesting technical question. Let me explain the key concepts...",
        "In technical terms, this involves several important components...",
        "From a technical perspective, we need to consider...",
        "The technical implementation would require...",
        "Let me break down the technical aspects for you..."
    ],
    business: [
        "From a business perspective, this strategy involves...",
        "When considering business implications, we should focus on...",
        "The business impact of this decision would be...",
        "In terms of business strategy, we need to consider...",
        "The business case for this approach would be..."
    ],
    education: [
        "This educational concept involves several key principles...",
        "When learning about this topic, it's important to understand...",
        "The educational approach would focus on...",
        "In terms of education, we should consider...",
        "The learning process involves several stages..."
    ],
    general: [
        "That's an interesting question. Let me explain...",
        "I understand your question. Here's what you need to know...",
        "Let me help you understand this better...",
        "This is a complex topic. Let me break it down...",
        "I can help you with that. Here's what you should know..."
    ],
    error: [
        "I apologize, but I'm having trouble understanding your question. Could you please rephrase it?",
        "I'm not sure I understand. Could you provide more details?",
        "Could you please clarify your question?",
        "I need more information to provide a helpful response.",
        "I'm not able to process that request. Could you try asking it differently?"
    ]
};

// Function to determine the type of question and return appropriate response
const getMockResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Check for greetings
    if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
        return mockResponses.greetings[Math.floor(Math.random() * mockResponses.greetings.length)];
    }
    
    // Check for technical questions
    if (lowerMessage.match(/(code|programming|software|technical|computer|algorithm|database|api|server|client)/)) {
        return mockResponses.technical[Math.floor(Math.random() * mockResponses.technical.length)];
    }
    
    // Check for business questions
    if (lowerMessage.match(/(business|market|company|profit|revenue|strategy|management|finance|investment)/)) {
        return mockResponses.business[Math.floor(Math.random() * mockResponses.business.length)];
    }
    
    // Check for educational questions
    if (lowerMessage.match(/(learn|study|education|school|university|course|teaching|student|teacher|class)/)) {
        return mockResponses.education[Math.floor(Math.random() * mockResponses.education.length)];
    }
    
    // Check for error cases (very short or unclear messages)
    if (lowerMessage.length < 3 || lowerMessage.match(/^[^a-zA-Z0-9]+$/)) {
        return mockResponses.error[Math.floor(Math.random() * mockResponses.error.length)];
    }
    
    // Default to general response
    return mockResponses.general[Math.floor(Math.random() * mockResponses.general.length)];
};

export const createNewChat = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" })
        }

        const newSession: IChatSession = {
            id: randomUUID(),
            title: "New Chat",
            chats: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }

        user.chatSessions.push(newSession)
        await user.save()

        return res.status(201).json({ 
            message: "New chat session created",
            session: newSession 
        })
    } catch (error: any) {
        console.error("Error creating new chat:", error)
        return res.status(500).json({ 
            message: "Error creating new chat", 
            error: error.message 
        })
    }
}

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    const { message, sessionId } = req.body
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" })
        }

        const session = user.chatSessions.find(s => s.id === sessionId)
        if (!session) {
            return res.status(404).json({ message: "Chat session not found" })
        }

        // Add user message
        const newUserChat: IChat = { 
            id: randomUUID(),
            content: message, 
            role: "user" as const
        }
        session.chats.push(newUserChat)
        session.updatedAt = new Date()

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get appropriate mock response based on message content
        const mockResponse = getMockResponse(message);
        const assistantMessage: IChat = {
            id: randomUUID(),
            role: "assistant" as const,
            content: mockResponse
        }
        
        session.chats.push(assistantMessage)
        await user.save()
        
        return res.status(200).json({ 
            message: "Chat completion successful",
            session: session 
        })
    } catch (error: any) {
        console.error("Server Error:", error)
        return res.status(500).json({ 
            message: "Something went wrong",
            error: error.message 
        })
    }
}

export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" })
        }
        
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: "Permissions didn't match" })
        }
        
        return res.status(200).json({ 
            message: "OK", 
            chatSessions: user.chatSessions 
        })
    } catch (error: any) {
        console.error("Error fetching chats:", error)
        return res.status(500).json({ 
            message: "Error fetching chats", 
            error: error.message 
        })
    }
}

export const deleteChatSession = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    const { sessionId } = req.params
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" })
        }
        
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: "Permissions didn't match" })
        }

        user.chatSessions = user.chatSessions.filter(session => session.id !== sessionId)
        await user.save()
        
        return res.status(200).json({ 
            message: "Chat session deleted successfully" 
        })
    } catch (error: any) {
        console.error("Error deleting chat session:", error)
        return res.status(500).json({ 
            message: "Error deleting chat session", 
            error: error.message 
        })
    }
}

export const updateChatTitle = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    const { sessionId } = req.params
    const { title } = req.body
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if (!user) {
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" })
        }
        
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: "Permissions didn't match" })
        }

        const session = user.chatSessions.find(s => s.id === sessionId)
        if (!session) {
            return res.status(404).json({ message: "Chat session not found" })
        }

        session.title = title
        session.updatedAt = new Date()
        await user.save()
        
        return res.status(200).json({ 
            message: "Chat title updated successfully",
            session 
        })
    } catch (error: any) {
        console.error("Error updating chat title:", error)
        return res.status(500).json({ 
            message: "Error updating chat title", 
            error: error.message 
        })
    }
}