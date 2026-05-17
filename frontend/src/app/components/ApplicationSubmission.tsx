import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Upload,
  Send,
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  FileText,
  CheckCircle,
} from "lucide-react";
import { vacancies } from "../data/mockRecruitmentData";

export default function ApplicationSubmission() {
  const navigate = useNavigate();
  const { vacancyId } = useParams();

  const selectedVacancy = useMemo(() => {
    return vacancies.find((vacancy) => vacancy.id === vacancyId);
  }, [vacancyId]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    coverLetter: "",
  });

  const [cvFileName, setCvFileName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const simulatedAiResult = {
    score: 82,
    matchedSkills: ["React", "TypeScript", "Git"],
    missingSkills: ["MongoDB", "Testing"],
    recommendation: "Review manually",
    summary:
      "The candidate shows relevant frontend skills and partial alignment with the selected vacancy. Backend/database experience should be reviewed manually.",
  };

  if (!selectedVacancy) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Vacancy not found
          </h1>
          <p className="text-gray-600 mb-6">
            The selected vacancy does not exist or was removed.
          </p>
          <button
            onClick={() => navigate("/vacancies")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Back to Vacancies
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setCvFileName(file.name);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitted(true);

    setTimeout(() => {
      navigate("/user");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Apply for Vacancy
            </h1>
            <p className="text-sm text-gray-500">
              Submit CV for AI-powered review
            </p>
          </div>

          <button
            onClick={() => navigate("/vacancies")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vacancies
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {isSubmitted && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-2xl p-5 flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-semibold">Application submitted successfully</p>
              <p className="text-sm">
                AI review simulation completed. Redirecting to your dashboard...
              </p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Candidate Application Form
              </h2>
              <p className="text-gray-600 mb-8">
                Fill in the candidate information and upload a CV. In the final
                system, the CV will be analyzed against the vacancy requirements.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Selected Vacancy
                  </label>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="font-semibold text-blue-900">
                      {selectedVacancy.title}
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      {selectedVacancy.department} • {selectedVacancy.location}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter candidate full name"
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="candidate@example.com"
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Motivation / Cover Letter
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Explain why this candidate is suitable for the selected vacancy..."
                    rows={6}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Upload CV
                  </label>

                  <label className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    <Upload className="w-9 h-9 text-blue-600 mb-3" />
                    <p className="font-semibold text-gray-900">
                      Click to upload CV
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      PDF, DOC or DOCX accepted
                    </p>

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvUpload}
                      required
                      className="hidden"
                    />
                  </label>

                  {cvFileName && (
                    <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {cvFileName}
                        </p>
                        <p className="text-sm text-gray-500">
                          CV ready for AI analysis
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <Send className="w-5 h-5" />
                  Submit Application
                </button>
              </form>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Vacancy Details
              </h3>

              <p className="text-gray-600 text-sm mb-5">
                {selectedVacancy.description}
              </p>

              <div className="space-y-3 text-sm text-gray-600 mb-5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {selectedVacancy.location}
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {selectedVacancy.type}
                </div>
              </div>

              <p className="text-sm font-semibold text-gray-800 mb-3">
                Required Skills
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedVacancy.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  AI Review Preview
                </h3>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-indigo-700">Simulated Fit Score</p>
                <p className="text-3xl font-bold text-indigo-700">
                  {simulatedAiResult.score}%
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    Matched Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {simulatedAiResult.matchedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    Missing Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {simulatedAiResult.missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    Recommendation
                  </p>
                  <p className="text-sm text-gray-600">
                    {simulatedAiResult.recommendation}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    Summary
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {simulatedAiResult.summary}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}