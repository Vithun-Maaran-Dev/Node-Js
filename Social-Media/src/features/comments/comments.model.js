let comments = [
     {
          id: 1,
          userId: 1,
          postId: 1,
          content: `post 1 - comment 1`
     },
     {
          id: 2,
          userId: 1,
          postId: 1,
          content: `post 1 - comment 2`
     },
     {
          id: 3,
          userId: 2,
          postId: 2,
          content: `post 2 - comment 1`
     }
]

export const getComments = (postId) => {

     const postComments = comments.filter(com => com.postId === parseInt(postId))

     if (postComments.length > 0) {
          return { success: true, comments: postComments }
     }
     else {
          return { success: false }
     }
}

export const addComment = (userId, postId, comment) => {

     if (userId && postId) {
          const commentVal = {
               id: comments.length + 1,
               postId: parseInt(postId),
               userId: parseInt(userId),
               content: comment
          }

          comments.push({ ...commentVal });

          return { success: true, comment: commentVal }
     }
     else {
          return { success: false }
     }

}


export const deleteComment = (userId, postId, commentId) => {

     const deletedIndex = comments.findIndex(com => com.postId === parseInt(postId) && com.userId === parseInt(userId) && com.id === parseInt(commentId));

     if (deletedIndex != -1) {
          comments.splice(deletedIndex, 1);
          const commentsById = getComments(postId)
          if (commentsById.comments.length > 0) {
               return { success: true, comments: commentsById.comments, errorMess: `` }
          }
          else {
               return { success: false, errorMess: `no comments found` }
          }

     }
     else {
          return {
               success: false, errorMess: `No comments exists`
          }
     }

}

export const updateComment = (userId, postId, commentId, comment) => {
     const updateIndex = comments.findIndex(com => com.postId === parseInt(postId) && com.userId === parseInt(userId) && com.id === parseInt(commentId));
     const commentobj = comments.find(com => com.postId === parseInt(postId) && com.userId === parseInt(userId) && com.id === parseInt(commentId));

     if (updateIndex != -1 && commentobj) {
          comments[updateIndex] = { ...commentobj, content: comment }
          return { success: true, comments: comments[updateIndex] }
     }
     else {
          return { success: false, errorMess: `No comments exists to update` }
     }
}
