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
          "id": 2,
          "title": "Backend Developer",
          "company": "InnoTech Solutions",
          "location": "Bangalore, India",
          "type": "Full-time",
          "salary": "80,000 - 110,000",
          "posted_date": "2025-03-08",
          "description": "Design and optimize backend systems for high-performance applications.",
          "skills": ["Node.js", "Express", "MongoDB", "Redis"],
          "requirements": [
               "Experience with Node.js and Express",
               "Familiarity with microservices architecture",
               "Database design and optimization experience"
          ],
          "applicant_id": [],
          "recuriter_id": 3
     },
     {
          "id": 3,
          "title": "Data Scientist",
          "company": "AI Global",
          "location": "Hyderabad, India",
          "type": "Contract",
          "salary": "100,000 - 150,000",
          "posted_date": "2025-03-06",
          "description": "Develop and deploy machine learning models for predictive analytics.",
          "skills": ["Python", "TensorFlow", "Pandas", "NLP"],
          "requirements": [
               "Strong understanding of statistics and ML algorithms",
               "Experience with Python and deep learning frameworks",
               "Ability to process and analyze large datasets"
          ],
          "applicant_id": [],
          "recuriter_id": 3
     },
     {
          "id": 4,
          "title": "DevOps Engineer",
          "company": "CloudWorks",
          "location": "Pune, India",
          "type": "Full-time",
          "salary": "85,000 - 130,000",
          "posted_date": "2025-03-05",
          "description": "Manage CI/CD pipelines and cloud infrastructure for scalable applications.",
          "skills": ["AWS", "Docker", "Kubernetes", "Jenkins"],
          "requirements": [
               "Experience with cloud services (AWS/GCP/Azure)",
               "Knowledge of container orchestration",
               "Expertise in automation tools"
          ],
          "applicant_id": [],
          "recuriter_id": 3
     },
     {
          "id": 5,
          "title": "Frontend Developer",
          "company": "Creative Minds",
          "location": "Mumbai, India",
          "type": "Remote",
          "salary": "70,000 - 100,000",
          "posted_date": "2025-03-04",
          "description": "Build dynamic and responsive web applications with modern UI frameworks.",
          "skills": ["Vue.js", "HTML", "CSS", "JavaScript"],
          "requirements": [
               "Strong understanding of Vue.js and frontend development",
               "Experience with UI/UX best practices",
               "Good knowledge of API integration"
          ],
          "applicant_id": [],
          "recuriter_id": 3
     },
     {
          "id": 6,
          "title": "Cybersecurity Analyst",
          "company": "SecureNet",
          "location": "Delhi, India",
          "type": "Full-time",
          "salary": "95,000 - 140,000",
          "posted_date": "2025-03-03",
          "description": "Monitor, analyze, and respond to security threats in enterprise environments.",
          "skills": ["Cybersecurity", "Penetration Testing", "SIEM", "Networking"],
          "requirements": [
               "Experience with security tools and frameworks",
               "Knowledge of network protocols and vulnerabilities",
               "Ability to analyze security incidents and mitigate risks"
          ],
          "applicant_id": [],
          "recuriter_id": 3
     },
     {
          id: 7,
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
          applicant_id: [2],
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

export const addApplicant = (userId, jobId) => {
     const job = jobs.find(job => job.id === jobId)

     if (job) {
          job.applicant_id.push(userId);
          return true;
     }
     else {
          return false;
     }
}
