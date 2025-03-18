import { getPosts, post, myPosts, addPost, deletePost, updatePost } from "./posts.model.js"

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


export const addNewPost = (req, res) => {

     const userId = req.userId;
     const isAdded = addPost(userId, req.body, req.file ? req.file : "");

     if (isAdded.success) {
          return res.status(200).send({ success: isAdded.success, posts: isAdded.post });
     }
     else {
          return res.status(404).send({ success: isAdded.success, errorMess: 'Error in uploading post.' });
     }
}

export const getUpdatePost = (req, res) => {
     const userId = req.userId;
     const { postId } = req.params;

     const isUpdated = updatePost(userId, postId, req.body, req.file ? req.file : "");

     if (isUpdated.success) {
          return res.status(200).send({ success: isUpdated.success, updatedpost: isUpdated.updatedPost });
     }
     else {
          return res.status(404).send({ success: isUpdated.success, errorMess: 'Error in updating post.' });
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