import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Briefcase,
  User,
  Mail,
  FileText,
  Sparkles,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Target,
  Brain,
  BarChart3,
} from "lucide-react";
import {
  candidateApplications,
  vacancies,
} from "../data/mockRecruitmentData";

export default function AIAnalysisView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const application = useMemo(() => {
    return candidateApplications.find((item) => item.id === Number(id));
  }, [id]);

  const vacancy = useMemo(() => {
    if (!application) return null;

    return vacancies.find((item) => item.id === application.vacancyId);
  }, [application]);

  if (!application || !vacancy) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Application not found
          </h1>
          <p className="text-gray-600 mb-6">
            The selected application does not exist or was removed.
          </p>

          <button
            onClick={() => navigate("/manager")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Back to Manager Dashboard
          </button>
        </div>
      </div>
    );
  }

  const scoreLevel =
    application.aiScore >= 80
      ? "Strong Match"
      : application.aiScore >= 60
      ? "Moderate Match"
      : "Weak Match";

  const scoreColor =
    application.aiScore >= 80
      ? "text-green-600"
      : application.aiScore >= 60
      ? "text-yellow-600"
      : "text-red-600";

  const scoreBoxColor =
    application.aiScore >= 80
      ? "bg-green-50 border-green-200"
      : application.aiScore >= 60
      ? "bg-yellow-50 border-yellow-200"
      : "bg-red-50 border-red-200";

  const recommendationIcon =
    application.aiScore >= 80 ? (
      <CheckCircle className="w-6 h-6 text-green-600" />
    ) : application.aiScore >= 60 ? (
      <AlertTriangle className="w-6 h-6 text-yellow-600" />
    ) : (
      <XCircle className="w-6 h-6 text-red-600" />
    );

  const skillCoverage = Math.round(
    (application.matchedSkills.length / vacancy.requiredSkills.length) * 100
  );

  const breakdownItems = [
    {
      label: "Skill Match",
      value: skillCoverage,
      description: "Required skills found in candidate profile",
    },
    {
      label: "Role Alignment",
      value: application.aiScore >= 80 ? 88 : application.aiScore >= 60 ? 68 : 34,
      description: "General fit between CV and vacancy responsibilities",
    },
    {
      label: "Experience Relevance",
      value: application.aiScore >= 80 ? 84 : application.aiScore >= 60 ? 64 : 30,
      description: "Practical experience related to this vacancy",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              AI Candidate Analysis
            </h1>
            <p className="text-sm text-gray-500">
              Detailed CV evaluation against vacancy requirements
            </p>
          </div>

          <button
            onClick={() => navigate("/manager")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Manager Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                <User className="w-7 h-7 text-blue-600" />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {application.candidateName}
                </h2>

                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {application.candidateEmail}
                  </span>

                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {application.cvFileName}
                  </span>

                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {application.vacancyTitle}
                  </span>
                </div>

                <div className="mt-5 bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    Candidate Cover Letter
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {application.coverLetter}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl border shadow-sm p-6 ${scoreBoxColor}`}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-700">
                Overall AI Fit Score
              </p>
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>

            <p className={`text-5xl font-bold ${scoreColor}`}>
              {application.aiScore}%
            </p>

            <p className="text-lg font-semibold text-gray-900 mt-2">
              {scoreLevel}
            </p>

            <p className="text-sm text-gray-600 mt-3">
              AI-generated score based on CV content, vacancy requirements, and
              role fit.
            </p>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Vacancy Requirements
              </h3>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2">
              {vacancy.title}
            </h4>

            <p className="text-sm text-gray-600 mb-5">{vacancy.description}</p>

            <p className="text-sm font-semibold text-gray-800 mb-3">
              Required Skills
            </p>

            <div className="flex flex-wrap gap-2">
              {vacancy.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Target className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Skill Matching Result
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Matched Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {application.matchedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  Missing Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {application.missingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-sm text-gray-500">Skill Coverage</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${skillCoverage}%` }}
                  />
                </div>
                <p className="text-sm font-bold text-gray-900">
                  {skillCoverage}%
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Brain className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-900">
                AI Summary & Recommendation
              </h3>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 mb-5">
              <p className="text-sm font-semibold text-indigo-900 mb-2">
                Summary
              </p>
              <p className="text-sm text-indigo-900 leading-relaxed">
                {application.aiSummary}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-4">
              {recommendationIcon}
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  AI Recommendation
                </p>
                <p className="text-gray-700 mt-1">
                  {application.aiRecommendation}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Score Breakdown
              </h3>
            </div>

            <div className="space-y-5">
              {breakdownItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-800">
                      {item.label}
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {item.value}%
                    </p>
                  </div>

                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-1">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>

                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Manager Decision
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Use the AI insights as decision support. Final approval is made
                by the manager.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-white border border-gray-300 text-gray-700 px-5 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                View CV
              </button>

              <button className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Approve Candidate
              </button>

              <button className="bg-red-600 text-white px-5 py-3 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                <XCircle className="w-5 h-5" />
                Reject Candidate
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}