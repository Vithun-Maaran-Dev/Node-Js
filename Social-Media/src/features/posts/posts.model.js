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