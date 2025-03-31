import toast from "react-hot-toast";
import red from "@mui/material/colors/red"
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import ChatItem from "../components/chat/ChatItem";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Avatar, Box, Button, IconButton, Typography, List, ListItem, ListItemText, ListItemButton, CircularProgress } from "@mui/material"
import { createNewChatSession, deleteChatSession, getUserChats, sendChatRequest, updateChatTitle } from "../helpers/api-communicators";

interface IChatSession {
    id: string;
    title: string;
    chats: Array<{
        role: "user" | "assistant";
        content: string;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

const Chat = () => {
    const auth = useAuth()
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [currentSession, setCurrentSession] = useState<IChatSession | null>(null)
    const [chatSessions, setChatSessions] = useState<IChatSession[]>([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentSession?.chats]);

    const generateTitle = (content: string) => {
        const lines = content.split('\n').filter(line => line.trim());
        if (lines.length === 0) return "New Chat";

        let title = lines[0].trim();
        title = title.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();

        if (title.length > 50) {
            title = title.slice(0, 47) + '...';
        }

        return title || "New Chat";
    };

    const handleSubmit = async () => {
        const content = inputRef.current?.value as string
        if (!content.trim()) {
            toast.error("Please enter a message")
            return
        }

        if (!currentSession) {
            toast.error("No active chat session")
            return
        }

        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        if (inputRef && inputRef.current) {
            inputRef.current.value = ""
        }

        const userMessage = { role: "user" as const, content };
        const updatedSession = {
            ...currentSession,
            chats: [...currentSession.chats, userMessage]
        };
        setCurrentSession(updatedSession);
        setChatSessions(prev =>
            prev.map(session =>
                session.id === currentSession.id ? updatedSession : session
            )
        );

        try {
            const chatData = await sendChatRequest(content, currentSession.id)

            setCurrentSession(chatData.session)
            setChatSessions(prev =>
                prev.map(session =>
                    session.id === chatData.session.id ? chatData.session : session
                )
            );

            if (currentSession.title === "New Chat" || currentSession.chats.length === 1) {
                const newTitle = generateTitle(content);
                await updateChatTitle(currentSession.id, newTitle);
                setCurrentSession(prev => prev ? { ...prev, title: newTitle } : null);
                setChatSessions(prev =>
                    prev.map(session =>
                        session.id === currentSession.id ? { ...session, title: newTitle } : session
                    )
                );
            }
        } catch (error: any) {
            console.error("Chat error:", error)

            setCurrentSession(prev => prev ? {
                ...prev,
                chats: prev.chats.slice(0, -1)
            } : null);
            setChatSessions(prev =>
                prev.map(session =>
                    session.id === currentSession.id ? {
                        ...session,
                        chats: session.chats.slice(0, -1)
                    } : session
                )
            );

            if (error.response?.status === 429) {
                toast.error("Rate limit exceeded. Please try again in a few moments.")
            } else if (error.response?.status === 401) {
                toast.error("Session expired. Please login again.")
                navigate("/login")
            } else {
                toast.error(error.response?.data?.message || "Failed to send message. Please try again.")
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleNewChat = async () => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            const newSession = await createNewChatSession()
            setCurrentSession(newSession.session)
            setChatSessions(prev => [...prev, newSession.session])
        } catch (error: any) {
            console.error("New chat error:", error)
            toast.error("Failed to create new chat")
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteChat = async (sessionId: string) => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            toast.loading("Deleting Chat", { id: "deleteChat" })
            await deleteChatSession(sessionId)
            setChatSessions(prev => prev.filter(session => session.id !== sessionId))
            if (currentSession?.id === sessionId) {
                setCurrentSession(null)
            }
            toast.success("Chat Deleted Successfully", { id: "deleteChat" })
        } catch (error: any) {
            console.error("Delete error:", error)

            if (error.response?.status === 401) {
                toast.error("Session expired. Please login again.", { id: "deleteChat" })
                navigate("/login")
            } else {
                toast.error(error.response?.data?.message || "Failed to delete chat", { id: "deleteChat" })
            }
        } finally {
            setIsLoading(false);
        }
    }

    useLayoutEffect(() => {
        if (auth?.isLoggedIn && auth.user) {
            setIsLoading(true);

            toast.loading("Loading Chats", { id: "loadchats" })
            getUserChats()
                .then((data) => {
                    setChatSessions(data.chatSessions)
                    if (data.chatSessions.length > 0) {
                        setCurrentSession(data.chatSessions[0])
                    }
                    toast.success("Chats successfully loaded", { id: "loadchats" })
                })
                .catch(err => {
                    console.error(err)
                    toast.error("Loading failed", { id: "loadchats" })
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }, [auth])

    useEffect(() => {
        if (!auth?.user) {
            return navigate("/login")
        }
    }, [auth])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && !isSubmitting) {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <Box sx={{
            display: "flex",
            flex: 1,
            width: "100%",
            height: "100%",
            mt: 3,
            gap: 4,
            px: 4,
            maxWidth: "1400px",
            mx: "auto",
            minHeight: "calc(100vh - 100px)"
        }}>
            <Box sx={{
                display: { md: "flex", xs: "none", sm: "none" },
                flex: 0.2,
                flexDirection: "column",
                borderRight: "1px solid rgba(255, 255, 255, 0.1)",
                pr: 4,
                minWidth: "250px",
                height: "calc(100vh - 100px)"
            }}>
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    height: "98%",
                    bgcolor: "rgb(17, 29, 35)",
                    borderRadius: 5,
                    flexDirection: "column",
                    mx: 3,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                }}>
                    <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight: 700 }}>
                        {auth?.user?.name ? (
                            <>
                                {auth.user.name[0]}
                                {auth.user.name.split(" ")[1] ? auth.user.name.split(" ")[1][0] : ""}
                            </>
                        ) : "?"}
                    </Avatar>
                    <Button
                        onClick={handleNewChat}
                        disabled={isLoading}
                        sx={{
                            width: "200px",
                            my: 2,
                            color: "white",
                            fontWeight: "300",
                            borderRadius: 3,
                            mx: "auto",
                            bgcolor: "#2196f3",
                            textTransform: "none",
                            ":hover": {
                                bgcolor: "#1976d2",
                                color: "white"
                            }
                        }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : "New Chat"}
                    </Button>
                    <Typography sx={{
                        mx: "auto",
                        fontFamily: "work sans",
                        my: 2,
                        color: "#ffffff",
                        fontWeight: "500"
                    }}>
                    </Typography>
                    <List sx={{ flex: 1, overflow: "auto" }}>
                        {[...chatSessions].reverse().map((session) => (
                            <ListItem key={session.id} disablePadding>
                                <ListItemButton
                                    selected={currentSession?.id === session.id}
                                    onClick={() => setCurrentSession(session)}
                                    disabled={isLoading}
                                    sx={{
                                        "&.Mui-selected": {
                                            bgcolor: "rgba(33, 150, 243, 0.1)",
                                            "&:hover": {
                                                bgcolor: "rgba(33, 150, 243, 0.2)"
                                            }
                                        }
                                    }}
                                >
                                    <ListItemText
                                        primary={session.title}
                                        primaryTypographyProps={{
                                            sx: {
                                                color: currentSession?.id === session.id ? "#2196f3" : "#ffffff"
                                            }
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    {currentSession && (
                        <Button
                            onClick={() => handleDeleteChat(currentSession.id)}
                            disabled={isLoading}
                            sx={{
                                width: "200px",
                                my: "auto",
                                mb: 2,
                                color: "white",
                                fontWeight: "300",
                                borderRadius: 3,
                                mx: "auto",
                                bgcolor: red[300],
                                textTransform: "none",
                                ":hover": {
                                    bgcolor: red.A400
                                }
                            }}
                        >
                            {isLoading ? <CircularProgress size={24} /> : "Delete Chat"}
                        </Button>
                    )}
                </Box>
            </Box>
            <Box sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                pl: 2,
                maxWidth: "calc(100% - 300px)",
                width: "100%"
            }}>
                <Box
                    ref={chatBoxRef}
                    sx={{
                        mx: "auto",
                        width: "100%",
                        height: "calc(100vh - 200px)",
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "scroll",
                        overflowX: "hidden",
                        overflowY: "auto",
                        scrollBehavior: "smooth",
                        bgcolor: "rgba(17, 27, 39, 0.8)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        maxWidth: "100%",
                        mb: 2
                    }}
                >
                    {currentSession?.chats.map((chat, index) => (
                        <ChatItem key={index} role={chat.role} content={chat.content} />
                    ))}
                </Box>
                <div style={{
                    width: "100%",
                    borderRadius: 20,
                    backgroundColor: "rgba(17, 27, 39, 0.8)",
                    display: "flex",
                    margin: 2,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    maxWidth: "100%",
                    minHeight: "60px"
                }}>
                    <input
                        ref={inputRef}
                        type="text"
                        style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            padding: "20px",
                            border: "none",
                            outline: "none",
                            color: "#ffffff",
                            fontSize: "16px",
                            fontWeight: "400",
                            letterSpacing: "0.5px",
                            maxWidth: "calc(100% - 60px)",
                            minHeight: "10px"
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={currentSession ? "Type your message..." : "Select or create a chat to start messaging..."}
                        disabled={!currentSession || isSubmitting}
                    />
                    <IconButton
                        onClick={handleSubmit}
                        sx={{
                            ml: "auto",
                            color: "#ffffff",
                            mx: 1,
                            alignSelf: "center",
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)"
                            },
                            minWidth: "48px"
                        }}
                        disabled={!currentSession || isSubmitting}
                    >
                        {isSubmitting ? <CircularProgress size={24} /> : <IoMdSend />}
                    </IconButton>
                </div>
            </Box>
        </Box>
    )
}

export default Chat
