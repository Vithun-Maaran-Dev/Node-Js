import { addComment, getComments } from "./comments.model.js";

export const getCommentsByPostId = (req, res) => {
     const { postId } = req.params;

     const isComments = getComments(postId);

     if (isComments.success) {
          return res.status(200).send({ success: isComments.success, comments: isComments.comments });
     }
     else {
          return res.status(404).send({ success: isComments.success, errorMess: `No comments Yet.` });
     }
}

export const getAddComments = (req, res) => {
     const { postId } = req.params;
     const { comment } = req.body;
     const userId = req.userId

     console.log(postId, comment, userId);


     const isAdded = addComment(userId, postId, comment);

     console.log(isAdded)

     if (isAdded.success) {
          return res.status(200).send({ success: isAdded.success, comments: isAdded.comment });
     }
     else {
          return res.status(404).send({ success: isAdded.success, errorMess: `Something went wrong while posting comment` });
     }

}