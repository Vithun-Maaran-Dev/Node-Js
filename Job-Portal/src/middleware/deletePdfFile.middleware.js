import path from 'path';
import fs from "fs"
import { getProfileDetails } from '../models/users.model.js';

export const deleteExistingPdf = (req, res, next) => {

     const userId = parseInt(req.session._id)
     const profileDetail = getProfileDetails(userId);

     if (!req.file) {
          return res.status(400).render('myprofile', { isError: true, errMess: `Please upload Resume.`, profileDetail: profileDetail })
     }

     const { old_resumeName } = req.body;
     const filePath = path.resolve('public', 'ResumesCollection', `${old_resumeName}`);
     console.log(filePath)
     fs.unlink(filePath, (err) => {
          if (err) {
               return res.status(400).render('myprofile', { isError: true, errMess: `Something went wrong.`, profileDetail: profileDetail })
          }
          else {
               return next()
          }
     });
}

