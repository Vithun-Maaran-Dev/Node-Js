let comments = [
     {
          id: 1,
          userId: 1,
          postId: 1,
          content: `post 1 - comment 1`
     },
     {
          id: 2,
          userId: 2,
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