import { getPosts, post, myPosts, deletePost } from "./posts.model.js"

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
          return res.status(404).send({ success: isPost.success, errorMess: 'No such post Found' });
     }
}

export const getMyPosts = (req, res) => {
     const userId = req.userId;

     if (!userId) {
          return res.status(401).send({ success: false, errorMess: "Something went wrong while fetching Please login " })
     }
     const posts = myPosts(userId);

     if (posts.success) {
          return res.status(200).send({ success: posts.success, posts: posts.myPosts });
     }
     else {
          return res.status(404).send({ success: posts.success, errorMess: 'No post Found for your login' });
     }

}

export const deleteMyPost = (req, res) => {

     const userId = req.userId;
     const { myPostId } = req.params;

     if (!userId) {
          return res.status(401).send({ success: false, errorMess: "Something went wrong while fetching Please login " })
     }

     const isdeleted = deletePost(userId, myPostId);

     if (isdeleted.success) {
          return res.status(200).send({ success: isdeleted.success, posts: isdeleted.myposts });
     }
     else {
          return res.status(404).send({ success: isdeleted.success, errorMess: 'Something went wrong while deleteing the post.' });
     }

}