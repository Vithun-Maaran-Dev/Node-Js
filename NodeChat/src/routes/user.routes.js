import express from "express"
import { loginView, registerView, register, sendEmail, verifyOtp, login, homeView, logout, getGroups, joinGroup, getGroupMessage, sendFrndInvite } from "../controller/user.controller.js"
import { validateUser } from "../middleware/register.middleware.js"
import { jwtAuth } from "../../utils/auth.js"

const userRouter = express.Router()

userRouter.get("/login", loginView)
userRouter.get("/register", registerView)
userRouter.post("/send-email", sendEmail)
userRouter.post("/verify-otp", verifyOtp)
userRouter.post("/register", validateUser, register)
userRouter.post("/login", login)
userRouter.get("/home", jwtAuth, homeView)
userRouter.get("/get-groups/:userId", jwtAuth, getGroups)
userRouter.post("/join-group", jwtAuth, joinGroup)
userRouter.get("/get-messages", jwtAuth, getGroupMessage)
userRouter.post("/invite-friends", jwtAuth, sendFrndInvite)
userRouter.get("/logout", logout)

export default userRouter