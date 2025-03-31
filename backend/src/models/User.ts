import { randomUUID } from "crypto";
import mongoose, { Document } from "mongoose";

export interface IChat {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export interface IChatSession {
    id: string;
    title: string;
    chats: IChat[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    chatSessions: IChatSession[];
}

const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID()
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "assistant"]
    },
    content: {
        type: String,
        required: true,
    }
})

const chatSessionSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID()
    },
    title: {
        type: String,
        required: true,
        default: "New Chat"
    },
    chats: [chatSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    chatSessions: [chatSessionSchema]
})

export default mongoose.model<IUser>("User", userSchema)