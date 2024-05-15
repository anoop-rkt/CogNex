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
        <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 1, gap: 2, borderRadius: 2, height: "auto", alignItems: "center" }}>
            <Avatar sx={{ ml: 0 }}>
                <img src="openai.png" alt="openai" width={"30px"} />
            </Avatar>
            <Box>
                {!messageBlocks && (
                    <Typography sx={{ fontSize: "18px", fontFamily: "work sans" }}>{content}</Typography>
                )}
                {messageBlocks &&
                    messageBlocks.length &&
                    messageBlocks.map((block) =>
                        isCodeBlock(block) ? (
                            <SyntaxHighlighter style={coldarkDark} language="javascript">
                                {block}
                            </SyntaxHighlighter>
                        ) : (
                            <Typography sx={{ fontSize: "18px", fontFamily: "work sans" }}>{block}</Typography>
                        )
                    )}
            </Box>
        </Box >
    ) : (
        <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2, borderRadius: 2, height: "auto", alignItems: "center" }}>
            <Avatar sx={{ ml: 0, bgcolor: "black", color: "white", fontSize: "17px" }}>
                {auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}
            </Avatar>
            <Box>
                {!messageBlocks && (
                    <Typography sx={{ fontSize: "18px", fontFamily: "work sans" }}>{content}</Typography>
                )}
                {messageBlocks &&
                    messageBlocks.length &&
                    messageBlocks.map((block) =>
                        isCodeBlock(block) ? (
                            <SyntaxHighlighter style={coldarkDark} language="javascript">
                                {block}
                            </SyntaxHighlighter>
                        ) : (
                            <Typography sx={{ fontSize: "18px", fontFamily: "work sans" }}>{block}</Typography>
                        )
                    )}
            </Box>
        </Box>
    )
}

export default ChatItem
