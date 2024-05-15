import Logo from "./shared/Logo";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
    const auth = useAuth()
    return <AppBar sx={{ bgcolor: "transparent", position: "sticky", boxShadow: "0 2px 5px black" }}>
        <Toolbar sx={{ display: "flex" }}>
            <Logo />
            <div>
                {auth?.isLoggedIn ? (
                    <>
                        <NavigationLink
                            bg="#00fffc"
                            to="/chat"
                            text="Go To Chat"
                            textColor="black" />
                        <NavigationLink
                            bg="#51538f"
                            to="/"
                            text="Logout"
                            textColor="white"
                            onClick={auth.logout} />
                    </>
                ) : (
                    <>
                        <NavigationLink
                            bg="#00fffc"
                            to="/login"
                            text="Login"
                            textColor="black" />
                        <NavigationLink
                            bg="#51538f"
                            to="/signup"
                            text="Signup"
                            textColor="white" />
                    </>
                )}
            </div>
        </Toolbar>
    </AppBar>
}
export default Header









