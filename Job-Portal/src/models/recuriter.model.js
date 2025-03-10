import { getAllJobs } from "./jobs.model.js"

export const getPostedJob = (recuriterId) => {
     let jobs = getAllJobs();

     const postedJobs = jobs.filter(job => job.recuriter_id === recuriterId)

     if (postedJobs.length > 0) {
          return { found: true, postedJobs: postedJobs }
     }
     else {
          return { found: false }
     }
}
