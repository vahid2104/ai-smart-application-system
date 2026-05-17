import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Briefcase,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  LogOut,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { ApiApplication, getApplications } from "../services/api";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<ApiApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (error) {
        setErrorMessage("Could not load applications from backend API.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusIcon = (status: string) => {
    if (status === "approved") return <CheckCircle className="w-5 h-5" />;
    if (status === "rejected") return <XCircle className="w-5 h-5" />;
    return <Clock className="w-5 h-5" />;
  };

  const getStatusColor = (status: string) => {
    if (status === "approved") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (status === "rejected") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  };

  const getScoreColor = (score?: number) => {
    if (score === undefined) return "text-gray-600";
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              AI Recruitment Review System
            </h1>
            <p className="text-sm text-gray-500">Candidate Portal</p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Candidate!</h2>
          <p className="text-blue-100 max-w-2xl">
            Browse available vacancies, submit your CV, and track AI-powered
            application review results.
          </p>

          <button
            onClick={() => navigate("/vacancies")}
            className="mt-6 bg-white text-blue-700 px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <Briefcase className="w-5 h-5" />
            Browse Vacancies
          </button>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-bold text-gray-900">
              My Job Applications
            </h3>

            <span className="text-sm text-gray-500">
              {applications.length} applications
            </span>
          </div>

          {isLoading && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 flex items-center justify-center gap-3 text-gray-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              Loading applications...
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-3 text-red-700">
              <AlertCircle className="w-6 h-6" />
              {errorMessage}
            </div>
          )}

          {!isLoading && !errorMessage && applications.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                No applications yet
              </h4>
              <p className="text-gray-600 mb-5">
                Start by browsing available vacancies and submitting your CV.
              </p>

              <button
                onClick={() => navigate("/vacancies")}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Browse Vacancies
              </button>
            </div>
          )}

          {!isLoading && !errorMessage && applications.length > 0 && (
            <div className="grid gap-4">
              {applications.map((application) => (
                <div
                  key={application._id}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/analysis/${application._id}`)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {application.vacancy.title}
                        </h4>

                        <p className="text-sm text-gray-500 mt-1">
                          Candidate: {application.candidateName}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          Submitted: {formatDate(application.createdAt)}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          CV: {application.cvFileName}
                        </p>

                        <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                          <Sparkles className="w-4 h-4 text-blue-500" />
                          AI Recommendation:{" "}
                          {application.aiRecommendation || "Pending AI review"}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="text-center bg-gray-50 border border-gray-200 rounded-xl px-5 py-3">
                        <p className="text-xs text-gray-500">AI Fit Score</p>
                        <p
                          className={`text-2xl font-bold ${getScoreColor(
                            application.aiScore
                          )}`}
                        >
                          {application.aiScore ?? 0}%
                        </p>
                      </div>

                      <div
                        className={`px-4 py-2 rounded-full border flex items-center gap-2 capitalize ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {getStatusIcon(application.status)}
                        {application.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}