import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from '../utils/validators.js'
import { verifyToken } from "../utils/token-manager.js";


const userRoutes = Router()

userRoutes.get("/", getAllUsers)
userRoutes.post("/signup", async (req, res, next) => {
    try {
        await validate(signupValidator)(req as any, res as any, next);
    } catch (err) {
        next(err);
    }
}, userSignup);
userRoutes.post("/login", async (req, res, next) => {
    try {
        await validate(loginValidator)(req as any, res as any, next);
    } catch (err) {
        next(err);
    }
}, userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser)
userRoutes.get("/logout", verifyToken, userLogout)

export default userRoutes