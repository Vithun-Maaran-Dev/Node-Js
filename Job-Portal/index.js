import express from "express"
import path from "path"
import ejsLayout from "express-ejs-layouts"

//import controller
import { loginView, registerView, login, register } from "./src/controllers/user.controller.js";

//creating server
const server = express();

server.set('view engine', 'ejs');
server.set('views', path.resolve(`src`, `views`))
server.use(ejsLayout);
server.use(express.static('public'));



server.get(`/`, (req, res) => {
     res.render("index")
});

//index view
server.get(`/login`, loginView);
server.get(`/register`, registerView);


//login and register post func
server.post(`/login`, login)
server.post(`/register`, register)









//creating port
server.listen(5000, (err) => {
     if (err) {
          console.log(err)
     }
     else {
          console.log(`server is running...`);
     }
})