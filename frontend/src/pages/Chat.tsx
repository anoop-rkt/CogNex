import toast from "react-hot-toast";
import red from "@mui/material/colors/red"
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import ChatItem from "../components/chat/ChatItem";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material"
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicators";

type Message = {
    role: "user" | "assistant",
    content: string
}
const Chat = () => {
    const auth = useAuth()
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [chatMessages, setChatMessages] = useState<Message[]>([])
    const navigate = useNavigate()
    const handleSubmit = async () => {
        const content = inputRef.current?.value as string
        if (inputRef && inputRef.current) {
            inputRef.current.value = ""
        }
        const newMessage: Message = { role: "user", content }
        setChatMessages((prev) => [...prev, newMessage])

        //API request to send chat message
        const chatData = await sendChatRequest(content)
        setChatMessages([...chatData.chats])
    }

    const handleDeleteChats = async () => {
        try {
            toast.loading("Deleting Chats", { id: "deleteChats" })
            await deleteUserChats()
            setChatMessages([])
            toast.success("Chats Deleted Successfully", { id: "deleteChats" })
        } catch (error) {
            console.log(error)
            toast.error("Deleting Chats Failed", { id: "deleteChats" })
        }
    }

    useLayoutEffect(() => {
        if (auth?.isLoggedIn && auth.user) {
            toast.loading("Loading Chats", { id: "loadchats" })
            getUserChats()
                .then((data) => {
                    setChatMessages([...data.chats])
                    toast.success("Chats successfully loaded", { id: "loadchats" })
                })
                .catch(err => {
                    console.log(err)
                    toast.error("Loading failed", { id: "loadchats" })
                })
        }
    }, [auth])

    useEffect(() => {
        if (!auth?.user) {
            return navigate("/login")
        }
    }, [auth])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <Box sx={{ display: "flex", flex: 1, width: "100%", height: "100%", mt: 3, gap: 3 }}>
            <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: "column" }}>
                <Box sx={{ display: "flex", width: "100%", height: "60vh", bgcolor: "rgb(17, 29, 35)", borderRadius: 5, flexDirection: "column", mx: 3 }}>
                    <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight: 700 }}>{auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}
                    </Avatar>
                    <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
                        You are talking to a ChatBOT.
                    </Typography>
                    <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
                        You can ask some questions related to Knowlegdge , Business , Advices , Education,etc .But avoid sharing personal information.
                    </Typography>
                    <Button onClick={handleDeleteChats} sx={{
                        width: "200px", my: "auto", color: "white", fontWeight: "300", borderRadius: 3, mx: "auto", bgcolor: red[300], ":hover": {
                            bgcolor: red.A400
                        }
                    }}>Clear Conversation</Button>
                </Box>
            </Box>
            <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: "column", px: 3 }}>
                <Typography sx={{ textAlign: 'center', fontSize: "30px", color: "white", mb: 2, mx: "auto", fontWeight: "500" }}>
                    GPT - 3.5 Turbo
                </Typography>
                <Box sx={{ mx: "auto", width: "100%", height: "60vh", borderRadius: 3, display: "flex", flexDirection: "column", overflow: "scroll", overflowX: "hidden", overflowY: "auto", scrollBehavior: "smooth" }}>
                    {chatMessages.map((chat, index) => (
                        //@ts-ignore
                        <ChatItem key={index} role={chat.role} content={chat.content} />))}
                </Box>
                <div style={{ width: "100%", borderRadius: 8, backgroundColor: "rgb(17,27,39)", display: "flex", margin: "auto" }}>
                    {" "}
                    <input ref={inputRef} type="text" style={{ width: "100%", backgroundColor: "transparent", padding: "18px", border: "none", outline: "none", color: "white", fontSize: "16px" }} onKeyDown={handleKeyDown} />
                    <IconButton onClick={handleSubmit} sx={{ ml: "auto", color: "white", mx: 1 }} ><IoMdSend /></IconButton>
                </div>
            </Box>
        </Box>
    )
}

export default Chat
