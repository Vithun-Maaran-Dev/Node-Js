import express from "express"
import path from "path"
import ejsLayout from "express-ejs-layouts"
import cors from "cors";
import userRouter from "./src/features/user/users.routes.js";
import postRouter from "./src/features/posts/posts.routes.js";
import commentRouter from "./src/features/comments/comments.routes.js"
import likeRouter from "./src/features/likes/likes.routes.js";


//creating server
const server = express();

server.set('view engine', 'ejs');
server.set('views', path.resolve(`src`, `views`))
server.use(ejsLayout);
server.use(express.static('public'));

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }));


server.use('/api', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/comments', commentRouter)
server.use('/api/likes', likeRouter)



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