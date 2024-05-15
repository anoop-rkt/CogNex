import Footer from "../components/footer/Footer"
import TypingAnimation from "../components/typer/TypingAnimation"
import { Box, useTheme, useMediaQuery } from "@mui/material"


const Home = () => {
    const theme = useTheme()
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"))
    return <Box width={"100%"} height={"100%"}>
        <Box sx={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "center", mx: "auto", mt: 4 }}>
            <Box>
                <TypingAnimation />
            </Box>
            <Box sx={{ width: "100%", display: "flex", flexDirection: { md: "row", xs: "column", sm: "column" }, gap: 5, my: 10 }}>
                <img src="robot.png" alt="robot" style={{ width: isBelowMd ? "25%" : "15%", margin: "auto" }} />
                <img className="image-inverted rotate" src="openai.png" alt="openai" style={{ width: isBelowMd ? "15%" : "10%", margin: "auto" }} />
            </Box>
            <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
                <img src="chat.png" alt="chatbot" style={{ display: "flex", width: isBelowMd ? "80%" : "60%", margin: "auto", borderRadius: 20, boxShadow: "-5px -5px 85px #64f3d5", marginTop: 20, marginBottom: 20 }} />
            </Box>
        </Box>
        <Footer />
    </Box>
}
export default Home