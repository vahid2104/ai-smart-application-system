export type Vacancy = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  requiredSkills: string[];
  description: string;
  responsibilities: string[];
};

export type CandidateApplication = {
  id: number;
  vacancyId: string;
  vacancyTitle: string;
  candidateName: string;
  candidateEmail: string;
  cvFileName: string;
  coverLetter: string;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  aiScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  aiSummary: string;
  aiRecommendation: string;
};

export const vacancies: Vacancy[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    department: "Engineering",
    location: "Warsaw / Remote",
    type: "Full-time",
    level: "Junior / Mid",
    requiredSkills: ["React", "TypeScript", "Node.js", "MongoDB", "REST API", "Git"],
    description:
      "We are looking for a Software Engineer to build scalable web applications and work with modern frontend and backend technologies.",
    responsibilities: [
      "Develop frontend features using React and TypeScript",
      "Build backend APIs with Node.js",
      "Work with MongoDB database",
      "Collaborate using Git and code reviews",
    ],
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "Product",
    location: "Remote",
    type: "Internship",
    level: "Junior",
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "UI/UX"],
    description:
      "We are looking for a Frontend Developer to create modern and user-friendly interfaces.",
    responsibilities: [
      "Build reusable UI components",
      "Implement responsive layouts",
      "Work with React and TypeScript",
      "Improve user experience and accessibility",
    ],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    department: "Analytics",
    location: "Hybrid",
    type: "Part-time",
    level: "Junior",
    requiredSkills: ["Python", "SQL", "Excel", "Power BI", "Data Visualization"],
    description:
      "We are looking for a Data Analyst to analyze business data and create useful reports.",
    responsibilities: [
      "Analyze datasets",
      "Create dashboards and reports",
      "Write SQL queries",
      "Present insights to managers",
    ],
  },
];

export const candidateApplications: CandidateApplication[] = [
  {
    id: 1,
    vacancyId: "software-engineer",
    vacancyTitle: "Software Engineer",
    candidateName: "John Doe",
    candidateEmail: "john.doe@example.com",
    cvFileName: "john-doe-software-engineer-cv.pdf",
    coverLetter:
      "I have experience with React, TypeScript, Node.js, MongoDB, REST APIs and Git. I would like to contribute to your engineering team.",
    status: "approved",
    submittedDate: "2026-04-18",
    aiScore: 88,
    matchedSkills: ["React", "TypeScript", "Node.js", "MongoDB", "REST API", "Git"],
    missingSkills: ["Testing"],
    aiSummary:
      "The candidate is a strong match for the Software Engineer vacancy. The CV shows relevant full-stack skills and good alignment with the requirements.",
    aiRecommendation: "Approve for interview",
  },
  {
    id: 2,
    vacancyId: "software-engineer",
    vacancyTitle: "Software Engineer",
    candidateName: "Sarah Williams",
    candidateEmail: "sarah.williams@example.com",
    cvFileName: "sarah-williams-cv.pdf",
    coverLetter:
      "I have basic experience with HTML, CSS, WordPress and simple JavaScript websites.",
    status: "rejected",
    submittedDate: "2026-04-19",
    aiScore: 36,
    matchedSkills: ["HTML", "CSS", "JavaScript"],
    missingSkills: ["React", "TypeScript", "Node.js", "MongoDB", "REST API"],
    aiSummary:
      "The candidate has basic web development knowledge, but the CV does not match the main technical requirements for the Software Engineer role.",
    aiRecommendation: "Reject or request more experience",
  },
  {
    id: 3,
    vacancyId: "frontend-developer",
    vacancyTitle: "Frontend Developer",
    candidateName: "Mike Johnson",
    candidateEmail: "mike.johnson@example.com",
    cvFileName: "mike-johnson-frontend-cv.pdf",
    coverLetter:
      "I have built responsive pages using React, TypeScript, CSS and modern UI patterns.",
    status: "pending",
    submittedDate: "2026-04-20",
    aiScore: 79,
    matchedSkills: ["HTML", "CSS", "React", "TypeScript", "UI/UX"],
    missingSkills: ["Advanced accessibility"],
    aiSummary:
      "The candidate is a good match for the Frontend Developer role with relevant UI and React experience.",
    aiRecommendation: "Review manually",
  },
];