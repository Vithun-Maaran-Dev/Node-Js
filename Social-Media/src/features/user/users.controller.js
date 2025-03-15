import jwt from "jsonwebtoken";
import { allUsers, isUserLogin, isUserRegister } from "./users.model.js";

export const login = (req, res) => {

     const { email, password } = req.body;

     const isUser = isUserLogin(email, password);

     if (isUser.success) {
          const token = jwt.sign(
               {
                    email: isUser.user.email,
                    id: isUser.user.id
               },//payload
               "SocialMediaApp", //secret key
               { expiresIn: '1h' } //duration time
          )
          res.status(200).send({ sucess: isUser.success, token: token });
     }
     else {
          res.status(404).send('Login Failed. Incorrect emai and password.')
     }

}

export const register = (req, res) => {
     const isUser = isUserRegister(req.body);

     if (isUser) {
          res.status(200).send({ success: isUser.success, user: isUser.user })
     }
     else {
          res.status(400).send({ success: false, errorMess: 'User Not Register' })
     }

}

export const getAllUsers = (req, res) => {
     const users = allUsers();
     return res.status(200).send({ sucess: true, users: users })
}