import express from "express"
import path from "path"
import ejsLayout from "express-ejs-layouts"

//creating server
const server = express();

server.set('view engine', 'ejs');
server.set('views', path.resolve(`src`, `views`))
server.use(ejsLayout);


server.get(`/`, (req, res) => {
     res.render("index")
});


//creating port
server.listen(5000, (err) => {
     if (err) {
          console.log(err)
     }
     else {
          console.log(`server is running...`);
     }
})