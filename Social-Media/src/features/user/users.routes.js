import express from "express";
import { getAllUsers, login, register } from "./users.controller.js";
import { jwtAuth } from "../../middleware/jwtAuth.middleware.js";


const userRouter = express.Router();

userRouter.post('/signin', login)
userRouter.post('/signup', register)
userRouter.get('/allusers', jwtAuth, getAllUsers)

export default userRouter;