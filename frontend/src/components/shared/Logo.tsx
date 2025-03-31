import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'

const Logo = () => {
    return (
        <div style={{
            display: "flex",
            marginRight: "auto",
            alignItems: "center",
            gap: "15px",
        }}>
            <Link to={"/"}>
                <img
                    src="cognex.png"
                    alt="cognex"
                    width={"60px"}
                    height={"55px"}
                />
            </Link>{" "}
            <Typography sx={{
                mr: "auto",
                fontWeight: "800",
                textShadow: "2px 2px 20px #000",
                display: { md: "block", sm: "none", xs: "none" },
            }}>
                <span style={{ fontSize: "20px" }}>CogNex</span>
            </Typography>
        </div>
    )
}

export default Logo
