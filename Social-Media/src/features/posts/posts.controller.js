import { getPosts, post } from "./posts.model.js"

export const getAllPosts = (req, res) => {

     const isPosts = getPosts();

     if (isPosts.success) {
          return res.status(200).send({ success: isPosts.success, posts: isPosts.posts });
     }
     else {
          return res.status(404).send({ success: isPosts.success, errorMess: 'No posts Found' });
     }
}

export const getPost = (req, res) => {
     const { postId } = req.params;

     const isPost = post(postId);

     if (isPost.success) {
          return res.status(200).send({ success: isPost.success, posts: isPost.post });
     }
     else {
          return res.status(404).send({ success: isPost.success, errorMess: 'No post Found' });
     }
}