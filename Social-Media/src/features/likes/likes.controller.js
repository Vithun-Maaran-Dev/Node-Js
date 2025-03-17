import { likesCount, toggleLike } from "./likes.model.js";

export const getLikesCount = (req, res) => {

     const { postId } = req.params;
     const likeCounts = likesCount(postId);

     if (likeCounts.success) {
          return res.status(200).send({ sucess: likeCounts.success, count: likeCounts.likesCount })
     }
     else {
          return res.status(404).send({ sucess: likeCounts.success, errorMess: likeCounts.errorMess })
     }
}

export const getToggleLike = (req, res) => {
     const { postId } = req.params;
     const userId = req.userId

     const isToggled = toggleLike(userId, postId)

     if (isToggled.success) {
          return res.status(200).send({ sucess: isToggled.success, likeCount: isToggled.like, mess: isToggled.mess })
     }

}