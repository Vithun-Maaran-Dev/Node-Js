import { addComment, getComments, deleteComment, updateComment } from "./comments.model.js";

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

     const isAdded = addComment(userId, postId, comment);

     if (isAdded.success) {
          return res.status(200).send({ success: isAdded.success, comments: isAdded.comment });
     }
     else {
          return res.status(404).send({ success: isAdded.success, errorMess: `Something went wrong while posting comment` });
     }
}

export const getDeleteComments = (req, res) => {
     const { postId, commentId } = req.query;
     const userId = req.userId

     const isDeleted = deleteComment(userId, postId, commentId);

     if (isDeleted.success) {
          return res.status(200).send({ success: isDeleted.success, comments: isDeleted.comments });
     }
     else {
          return res.status(404).send({ success: isDeleted.success, errorMess: isDeleted.errorMess });
     }
}

export const getUpdateComments = (req, res) => {
     const { postId, commentId } = req.query;
     const userId = req.userId
     const { comment } = req.body;


     const isUpdated = updateComment(userId, postId, commentId, comment);

     if (isUpdated.success) {
          return res.status(200).send({ success: isUpdated.success, comments: isUpdated.comments });
     }
     else {
          return res.status(404).send({ success: isUpdated.success, errorMess: isUpdated.errorMess });
     }
}
