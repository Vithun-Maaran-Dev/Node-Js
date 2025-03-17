let likes = [
     {
          id: 1,
          userId: 1,
          postId: 1
     },
     {
          id: 2,
          userId: 2,
          postId: 1
     },
     {
          id: 3,
          userId: 1,
          postId: 2
     }
]


export const likesCount = (postId) => {

     const likeArr = likes.filter(like => like.postId === parseInt(postId))

     if (likeArr) {
          return { success: true, likesCount: likeArr.length }
     }
     else {
          return { success: false, errorMess: `No post found.` }
     }
}

export const toggleLike = (userId, postId) => {

     const foundLikeIndex = likes.findIndex(like => like.postId === parseInt(postId) && like.userId === parseInt(userId))

     if (foundLikeIndex !== -1) {
          likes.splice(foundLikeIndex, 1);
          return { success: true, mess: `Like removed` }
     }
     else {
          const like = {
               id: likes.length + 1,
               userId: parseInt(userId),
               postId: parseInt(postId)
          }
          likes.push({ ...like });

          return { success: true, like: like }

     }
}
