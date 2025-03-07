let jobs = [
     {
          id: 1,
          title: "Software Engineer",
          company: "Tech Corp",
          location: "Chennai,India",
          type: "Full-time",
          salary: "90,000 - 120,000",
          posted_date: "2025-03-07",
          description: "Develop and maintain web applications using modern frameworks.",
          skills: ['React JS', 'html', 'css', 'js'],
          requirements: [
               "Experience with JavaScript, React, and Node.js",
               "Knowledge of databases (SQL, NoSQL)",
               "Strong problem-solving skills"
          ],
          applicant_id: [],
          recuriter_id: 3
     },
     {
          id: 2,
          title: ".Net Developer",
          company: "Microsoft",
          location: "Chennai,India",
          type: "Full-time",
          salary: "90,000 - 120,000",
          posted_date: "2025-03-07",
          description: "Develop and maintain web applications using modern frameworks.",
          skills: ['React JS', 'html', 'css', 'js', '.Net C#'],
          requirements: [
               "Experience with JavaScript, React, and Node.js",
               "Knowledge of databases (SQL, NoSQL)",
               "Strong problem-solving skills"
          ],
          applicant_id: [],
          recuriter_id: 3
     },



]

export const getAllJobs = () => {
     return jobs;
}

export const getJob = (jobId) => {
     const job = jobs.find(job => job.id === jobId)
     return job;
}
