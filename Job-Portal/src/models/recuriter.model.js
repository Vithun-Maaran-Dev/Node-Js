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

export const getApplicant = (applicantsId) => {

     let appliedApplicants = [];

     let users = getAllUsers();

     applicantsId.forEach(applicantId => {
          appliedApplicants.push(users.find(user => user._id === applicantId))
     })

     if (appliedApplicants.length > 0) {
          return { success: true, appliedApplicants: appliedApplicants }
     }
     else {
          return { success: false, appliedApplicants: [] }
     }

}

