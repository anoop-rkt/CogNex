import toast from "react-hot-toast"
import { useEffect } from "react"
import { IoIosLogIn } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Box, Typography, Button } from "@mui/material"
import CustomizedInput from "../components/shared/CustomizedInput"

const Signup = () => {
  const auth = useAuth()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    try {
      toast.loading("Signing Up", { id: "signup" })
      await auth?.signup(name, email, password)
      toast.success("Signed Up Successfully!", { id: "signup" })
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed!", { id: "signup" })
    }
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat")
    }
  }, [auth])
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>

      <Box padding={8} mt={"auto"} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
      </Box>

      <Box display={'flex'} flex={{ xs: 1, md: 0.5 }} justifyContent={"center"} alignItems={"center"} padding={2} ml={"auto"} mr={"auto"} mt={10}>
        <form style={{
          margin: "auto",
          padding: "30px",
          boxShadow: "10px 10px 20px #000",
          borderRadius: "10px",
          border: "none"
        }}
          onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h5" textAlign="center" padding={2} fontWeight={500} >Signup</Typography>
            <CustomizedInput name="name" type="text" label="Name" />
            <CustomizedInput name="email" type="email" label="E-mail" />
            <CustomizedInput name="password" type="password" label="Password" />
            <Button type="submit" sx={{
              px: 2, py: 1, mt: 2, width: "400px", borderRadius: 2, bgcolor: "#00fffc",
              ":hover": {
                bgcolor: "white", color: "black"
              }
            }} endIcon={<IoIosLogIn />}>Signup</Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Signup
