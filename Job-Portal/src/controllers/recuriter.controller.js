import { getPostedJob } from "../models/recuriter.model.js";

export const getPosedJobsView = (req, res) => {
     const recuriterId = parseInt(req.session._id);

     const filteredJobs = getPostedJob(recuriterId);

     if (filteredJobs.found) {
          return res.status(200).render('postedJobs', { found: true, jobs: filteredJobs.postedJobs })
     }
     else {
          return res.status(404).render('postedJobs', { found: false, message: 'No jobs posted .' })
     }
}

export const getPostJobView = (req, res) => {
     return res.status(200).render('postJob')
}