import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  Code2,
  CheckCircle,
} from "lucide-react";
import { vacancies } from "../data/mockRecruitmentData";

export default function VacanciesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              AI Recruitment Review System
            </h1>
            <p className="text-sm text-gray-500">Available vacancies</p>
          </div>

          <button
            onClick={() => navigate("/user")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Choose a vacancy to apply
          </h2>
          <p className="text-gray-600 mt-2">
            Candidates submit their CV for a selected vacancy. AI compares the CV
            with job requirements and generates a fit score.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vacancies.map((vacancy) => (
            <div
              key={vacancy.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  {vacancy.level}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {vacancy.title}
              </h3>

              <p className="text-gray-600 text-sm mb-5">
                {vacancy.description}
              </p>

              <div className="space-y-2 text-sm text-gray-600 mb-5">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-gray-400" />
                  {vacancy.department}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {vacancy.location}
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {vacancy.type}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Required skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {vacancy.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate(`/user/submit/${vacancy.id}`)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}