import express from "express";
import { getAllUsers, login, register } from "./users.controller.js";
import { jwtAuth } from "../../middleware/jwtAuth.middleware.js";


const userRouer = express.Router();

userRouer.post('/signin', login)
userRouer.post('/signup', register)

userRouer.get('/allusers', jwtAuth, getAllUsers)
export default userRouer;