import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
     const token = req.headers['authorization'];

     if (!token) {
          return res.status(401).send({ success: false, errorMess: "unauthorized user. Please login " })
     }

     try {
          const payload = jwt.verify(token, "SocialMediaApp")
          req.userId = payload.id;

     }
     catch (err) {
          return res.status(401).send({ success: false, errorMess: "Something went wrong unauthorized user. Please login " })
     }

     next()
}