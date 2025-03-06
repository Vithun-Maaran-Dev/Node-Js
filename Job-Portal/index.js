import express from "express"
import path from "path"
import ejsLayout from "express-ejs-layouts"
import session from "express-session";


//import controller
import { loginView, registerView, login, register } from "./src/controllers/users.controller.js";
import { validateUser } from "./src/middleware/users.middleware.js";


//creating server
const server = express();

server.set('view engine', 'ejs');
server.set('views', path.resolve(`src`, `views`))
server.use(ejsLayout);
server.use(express.static('public'));

server.use(express.urlencoded({ extended: true }));
server.use(express.json())

server.use(session({
     secret: `SearchJobNest`,
     resave: false,
     saveUninitialized: true,
     cookie: {
          secure: false
     }
}))


server.get(`/`, (req, res) => {
     res.render("index")
});

//index view
server.get(`/login`, loginView);
server.get(`/register`, registerView);


//login and register post func
server.post(`/login`, login)
server.post(`/register`, validateUser, register)









//creating port
server.listen(5000, (err) => {
     if (err) {
          console.log(err)
     }
     else {
          console.log(`server is running...`);
     }
})