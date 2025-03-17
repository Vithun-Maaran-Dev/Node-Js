let posts = [
     {
          id: 1,
          userId: 1,
          captions: 'This my first post',
          imageUrl: ''
     },
     {
          id: 2,
          userId: 2,
          captions: 'This my second post',
          imageUrl: ''
     },
     {
          id: 3,
          userId: 1,
          captions: 'This my third post',
          imageUrl: ''
     }

]

export const getPosts = () => {
     if (posts.length > 0) {
          return { success: true, posts: posts };
     }
     else {
          return { success: false, posts: [] }
     }
}
export const post = (postId) => {
     const post = posts.find(post => post.id === parseInt(postId))

     if (post) {
          return { success: true, post: post };
     }
     else {
          return { success: false }
     }
}
export const myPosts = (userId) => {
     const myPosts = posts.filter(post => post.userId === parseInt(userId))

     if (myPosts.length > 0) {
          return { success: true, myPosts: myPosts }
     }
     else {
          return { success: false, myPosts: [] }
     }
}

export const deletePost = (userId, myPostId) => {
     const deletedPostIndex = posts.findIndex(post => post.id === parseInt(myPostId) && post.userId === parseInt(userId))

     if (deletedPostIndex != -1) {
          posts.splice(deletedPostIndex, 1);
          const myPostsArr = myPosts(userId);
          return { success: true, myposts: myPostsArr.myPosts }
     } else {
          return { success: false }
     }

}