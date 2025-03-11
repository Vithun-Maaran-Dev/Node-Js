import { getAllJobs } from "./jobs.model.js"
import { appliedJobIdByUser, appliedJobs, getAllUsers } from "./users.model.js";

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

export const getApplicant = (job) => {

     let appliedApplicants = [];
     let appliedApplicantsWithJobStatus = []

     let users = getAllUsers();

     job.applicant_id.forEach(applicantId => {
          appliedApplicants.push(users.find(user => user._id === applicantId))
     })

     if (appliedApplicants.length > 0) {
          appliedApplicants.forEach(applicant => {
               let user = appliedJobIdByUser(applicant._id)

               if (user.success) {

                    const appliedJobsWithStatus = user.appliedJobs.appliedjob.find(appliedJob => appliedJob.JobId === job.id)

                    appliedApplicantsWithJobStatus.push(
                         { ...applicant, status: appliedJobsWithStatus.status }
                    )

               }
          })

          return { success: true, appliedApplicants: appliedApplicantsWithJobStatus }
     }
     else {
          return { success: false, appliedApplicants: [] }
     }

}


export const updateApplicantStatus = (userId, jobId, statusType) => {

     const userIndex = appliedJobs.findIndex(data => data.userId === userId);

     const job = appliedJobs[userIndex].appliedjob.find(job => job.JobId === jobId)
     const jobIndex = appliedJobs[userIndex].appliedjob.findIndex(job => job.JobId === jobId);

     console.log(userIndex);
     console.log(job);
     console.log(jobIndex);


     if (userIndex >= 0 && jobIndex >= 0) {
          appliedJobs[userIndex].appliedjob[jobIndex] = { ...job, status: statusType };

          console.log(appliedJobs[0]);

          return true
     } else {
          return false
     }

}

