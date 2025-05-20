import dotenv from "dotenv";
import express from "express"
import path from "path"
import ejsLayout from "express-ejs-layouts"
import session from "express-session";
import userRouter from "./src/routes/user.routes.js";
import nodemailer from "nodemailer"
import cookieParser from 'cookie-parser';
import cors from 'cors';
import groupRouter from "./src/routes/group.routes.js";
import http from 'http';
import { Server } from 'socket.io';
import socketHandler from './utils/socket.js';

dotenv.config()
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(`src`, `views`))
app.use(ejsLayout);
app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
   secret: `NodeChatApp`,
   resave: false,
   saveUninitialized: true,
   cookie: {
      secure: false
   }
}))

app.use(cors());

//Making session globally to access in side side the application
app.use((req, res, next) => {
   res.locals.session = req.session;  //making session in all views
   next();
})

export const mailTransporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: `${process.env.OTP_SENDING_EMAIL}`,
      pass: `${process.env.OTP_SENDING_EMAIL_PWD}`
      //passorig Cimplona@99
   }
});


const server = http.createServer(app);
export const io = new Server(server, {
   cors: {
      origin: '*',
      methods: ['GET', 'POST']
   }
});

app.use((req, res, next) => {
   res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
   next();
});

//socket connection made
socketHandler(io);

app.get("/", (req, res) => {
  res.send("Hurray! I have successfully deployed this application on AWS.");
});


// app.get(`/`, (req, res) => {
   res.render('index')
});

app.use('/api/user', userRouter)
app.use('/api/group', groupRouter)

export default server;
