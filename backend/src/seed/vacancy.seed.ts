import dotenv from "dotenv";
import Vacancy from "../models/vacancy.model";
import { connectDB } from "../config/db";

dotenv.config();

const vacancies = [
  {
    title: "Software Engineer",
    department: "Engineering",
    location: "Warsaw / Remote",
    type: "Full-time",
    level: "Junior / Mid",
    description:
      "We are looking for a Software Engineer to build scalable web applications using modern frontend and backend technologies.",
    requiredSkills: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "REST API",
      "Git",
    ],
    responsibilities: [
      "Develop frontend features using React and TypeScript",
      "Build backend APIs with Node.js and Express",
      "Work with MongoDB database",
      "Collaborate using Git and code reviews",
    ],
    isActive: true,
  },
  {
    title: "Frontend Developer",
    department: "Product",
    location: "Remote",
    type: "Internship",
    level: "Junior",
    description:
      "We are looking for a Frontend Developer to create clean, responsive and user-friendly web interfaces.",
    requiredSkills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "TypeScript",
      "UI/UX",
    ],
    responsibilities: [
      "Build reusable UI components",
      "Implement responsive layouts",
      "Work with React and TypeScript",
      "Improve user experience and accessibility",
    ],
    isActive: true,
  },
  {
    title: "Data Analyst",
    department: "Analytics",
    location: "Hybrid",
    type: "Part-time",
    level: "Junior",
    description:
      "We are looking for a Data Analyst to analyze business data and create useful reports.",
    requiredSkills: ["Python", "SQL", "Excel", "Power BI", "Data Visualization"],
    responsibilities: [
      "Analyze datasets",
      "Create dashboards and reports",
      "Write SQL queries",
      "Present insights to managers",
    ],
    isActive: true,
  },
];

const seedVacancies = async () => {
  try {
    await connectDB();

    await Vacancy.deleteMany({});
    await Vacancy.insertMany(vacancies);

    console.log("Demo vacancies seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed vacancies:", error);
    process.exit(1);
  }
};

seedVacancies();