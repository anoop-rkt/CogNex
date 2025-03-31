import { useAuth } from "../../context/AuthContext"
import { Avatar, Box, Typography } from "@mui/material"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

function extractCodeFromString(message: string) {
    if (message.includes("```")) {
        const blocks = message.split("```")
        return blocks
    }
}

function isCodeBlock(str: string) {
    if (
        str.includes("=") ||
        str.includes(";") ||
        str.includes("[") ||
        str.includes("]") ||
        str.includes("{") ||
        str.includes("}") ||
        str.includes("#") ||
        str.includes("//")
    ) {
        return true
    }
    return false
}

const ChatItem = ({ role, content }: { role: "user" | "assistant", content: string }) => {
    const auth = useAuth()
    const messageBlocks = extractCodeFromString(content)

    return role == "assistant" ? (
        <Box sx={{ display: "flex", p: 1.5, bgcolor: "#004d5612", my: 0.5, gap: 1.5, borderRadius: 2, height: "auto", alignItems: "flex-start" }}>
            <Avatar 
                sx={{ 
                    ml: 0, 
                    width: 25, 
                    height: 25, 
                    bgcolor: "#05101c",
                    p: 0.75
                }}
            >
                <img src="cognex.png" alt="cognex" width={"200%"} height={"150%"} style={{objectFit: "contain"}} />
            </Avatar>
            <Box>
                {!messageBlocks && (
                    <Typography sx={{ fontSize: "16px", fontFamily: "work sans", lineHeight: 1.5 }}>{content}</Typography>
                )}
                {messageBlocks &&
                    messageBlocks.length &&
                    messageBlocks.map((block) =>
                        isCodeBlock(block) ? (
                            <SyntaxHighlighter style={coldarkDark} language="javascript">
                                {block}
                            </SyntaxHighlighter>
                        ) : (
                            <Typography sx={{ fontSize: "16px", fontFamily: "work sans", lineHeight: 1.5 }}>{block}</Typography>
                        )
                    )}
            </Box>
        </Box >
    ) : (
        <Box sx={{ display: "flex", p: 1.5, bgcolor: "#004d56", gap: 1.5, borderRadius: 2, height: "auto", alignItems: "flex-start" }}>
            <Avatar sx={{ ml: 0, bgcolor: "black", color: "white", fontSize: "14px", width: 30, height: 30 }}>
                {auth?.user?.name ? (
                    <>
                        {auth.user.name[0]}
                        {auth.user.name.split(" ")[1] ? auth.user.name.split(" ")[1][0] : ""}
                    </>
                ) : "?"}
            </Avatar>
            <Box>
                {!messageBlocks && (
                    <Typography sx={{ fontSize: "16px", fontFamily: "work sans", lineHeight: 1.5 }}>{content}</Typography>
                )}
                {messageBlocks &&
                    messageBlocks.length &&
                    messageBlocks.map((block) =>
                        isCodeBlock(block) ? (
                            <SyntaxHighlighter style={coldarkDark} language="javascript">
                                {block}
                            </SyntaxHighlighter>
                        ) : (
                            <Typography sx={{ fontSize: "16px", fontFamily: "work sans", lineHeight: 1.5 }}>{block}</Typography>
                        )
                    )}
            </Box>
        </Box>
    )
}

export default ChatItem
