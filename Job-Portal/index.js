import express from "express"
import path from "path"
import ejsLayout from "express-ejs-layouts"

//import controller
import { loginView, registerView } from "./src/controllers/index.controller.js";

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










//creating port
server.listen(5000, (err) => {
     if (err) {
          console.log(err)
     }
     else {
          console.log(`server is running...`);
     }
})