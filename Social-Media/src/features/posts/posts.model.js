let posts = [
     {
          id: 1,
          userId: 1,
          captions: 'This my first post',
          imageUrl: 'https://th.bing.com/th/id/OIP.ApSWLE8537NNSOsOTcAqbwHaHa?rs=1&pid=ImgDetMain'
     },
     {
          id: 2,
          userId: 2,
          captions: 'Walpaper',
          imageUrl: 'walpper.jpeg'
     },
     {
          id: 3,
          userId: 1,
          captions: 'This my third post',
          imageUrl: 'https://wallpapercave.com/wp/wp3709137.jpg'
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

export const addPost = (userId, reqData, reqFile) => {
     const { caption } = reqData;

     if (caption && reqFile) {
          const post = {
               id: posts.length + 1,
               userId: parseInt(userId),
               captions: caption,
               imageUrl: reqFile.filename
          }

          posts.push({ ...post });

          return { success: true, post: post }
     }
     else {
          return { success: false }
     }

}

export const updatePost = (userId, postId, reqData, reqFile) => {
     const { caption } = reqData;

     const myPost = posts.find(post => post.userId === parseInt(userId) && post.id === parseInt(postId))

     if (myPost) {
          const myPostIndex = posts.findIndex(post => post.userId === parseInt(userId) && post.id === parseInt(postId))
          posts[myPostIndex] = { ...myPost, captions: caption, imageUrl: reqFile.filename }

          return { success: true, updatedPost: posts[myPostIndex] }

     }
     else {
          return { success: false }
     }


}

export const deletePost = (userId, myPostId) => {
     const deletedPostIndex = posts.findIndex(post => post.id === parseInt(myPostId) && post.userId === parseInt(userId))

     if (deletedPostIndex !== -1) {
          posts.splice(deletedPostIndex, 1);
          const myPostsArr = myPosts(userId);
          return { success: true, myposts: myPostsArr.myPosts }
     } else {
          return { success: false }
     }

}