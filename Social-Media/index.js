import express from "express"
import path from "path"
import ejsLayout from "express-ejs-layouts"
import cors from "cors";
import session from "express-session";
import userRouer from "./src/features/user/users.routes.js";



//creating server
const server = express();

server.set('view engine', 'ejs');
server.set('views', path.resolve(`src`, `views`))
server.use(ejsLayout);
server.use(express.static('public'));

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }));


server.use('/api', userRouer);



//If API does not exists
server.use((req, res) => {
     res.status(404).send({ sucess: false, errorMess: 'API does not exists.' })
})



//creating port
server.listen(3000, (err) => {
     if (err) {
          console.log(err)
     }
     else {
          console.log(`server is running...`);
     }
})