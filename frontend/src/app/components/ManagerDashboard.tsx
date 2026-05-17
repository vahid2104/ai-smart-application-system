import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  FileText,
  Sparkles,
  Eye,
  Download,
  Briefcase,
  User,
  Mail,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  ApiApplication,
  ApiApplicationStatus,
  getApplications,
  updateApplicationStatus,
} from "../services/api";

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<ApiApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const [decisionModal, setDecisionModal] = useState<{
    isOpen: boolean;
    status: "approved" | "rejected" | "";
    candidateName: string;
  }>({
    isOpen: false,
    status: "",
    candidateName: "",
  });

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

const handleStatusChange = async (
  applicationId: string,
  newStatus: "approved" | "rejected"
) => {
    try {
      setUpdatingId(applicationId);

      const updatedApplication = await updateApplicationStatus(
        applicationId,
        newStatus
      );

      setApplications((prev) =>
        prev.map((application) =>
          application._id === applicationId ? updatedApplication : application
        )
      );

      setDecisionModal({
        isOpen: true,
        status: newStatus,
        candidateName: updatedApplication.candidateName,
      });
    } catch (error) {
      setErrorMessage("Could not update application status.");
    } finally {
      setUpdatingId("");
    }
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

  const getStatusIcon = (status: string) => {
    if (status === "approved") return <CheckCircle className="w-4 h-4" />;
    if (status === "rejected") return <XCircle className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  const getScoreColor = (score?: number) => {
    if (score === undefined) return "text-gray-600";
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const pendingCount = applications.filter(
    (app) => app.status === "pending"
  ).length;
  const approvedCount = applications.filter(
    (app) => app.status === "approved"
  ).length;
  const rejectedCount = applications.filter(
    (app) => app.status === "rejected"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {decisionModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-md w-full text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 ${
                decisionModal.status === "approved"
                  ? "bg-green-50"
                  : "bg-red-50"
              }`}
            >
              {decisionModal.status === "approved" ? (
                <CheckCircle className="w-9 h-9 text-green-600" />
              ) : (
                <XCircle className="w-9 h-9 text-red-600" />
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Application{" "}
              {decisionModal.status === "approved" ? "Approved" : "Rejected"}
            </h2>

            <p className="text-gray-600 mb-6">
              {decisionModal.candidateName}'s application has been{" "}
              <span className="font-semibold">{decisionModal.status}</span>{" "}
              successfully.
            </p>

            <button
              onClick={() =>
                setDecisionModal({
                  isOpen: false,
                  status: "",
                  candidateName: "",
                })
              }
              className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manager Review Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Review candidates with AI-powered CV analysis
            </p>
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

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="grid md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Applications</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {applications.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-500">Pending Review</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {pendingCount}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-500">Approved</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {approvedCount}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-sm text-gray-500">Rejected</p>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {rejectedCount}
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Candidate Applications
          </h2>
          <p className="text-gray-600 mt-1">
            Each application is reviewed against the selected vacancy
            requirements.
          </p>
        </section>

        {isLoading && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 flex items-center justify-center gap-3 text-gray-600">
            <Loader2 className="w-6 h-6 animate-spin" />
            Loading candidate applications...
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-3 text-red-700 mb-6">
            <AlertCircle className="w-6 h-6" />
            {errorMessage}
          </div>
        )}

        {!isLoading && !errorMessage && applications.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No applications found
            </h3>
            <p className="text-gray-600">
              Applications submitted by candidates will appear here.
            </p>
          </div>
        )}

        {!isLoading && applications.length > 0 && (
          <section className="grid gap-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
              >
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>

                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {application.candidateName}
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                              <Mail className="w-4 h-4" />
                              {application.candidateEmail}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`px-4 py-2 rounded-full border flex items-center gap-2 capitalize w-fit ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {getStatusIcon(application.status)}
                        {application.status}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-5">
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">
                          Applied Vacancy
                        </p>
                        <p className="font-semibold text-gray-900 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-blue-600" />
                          {application.vacancy.title}
                        </p>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">
                          Attached CV
                        </p>
                        <p className="font-semibold text-gray-900 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          {application.cvFileName}
                        </p>
                      </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 mb-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-bold text-indigo-900">
                          AI Candidate Fit Analysis
                        </h4>
                      </div>

                      <div className="grid lg:grid-cols-4 gap-5">
                        <div>
                          <p className="text-xs text-indigo-700">Fit Score</p>
                          <p
                            className={`text-4xl font-bold ${getScoreColor(
                              application.aiScore
                            )}`}
                          >
                            {application.aiScore ?? 0}%
                          </p>
                        </div>

                        <div className="lg:col-span-3">
                          <p className="text-xs text-indigo-700 mb-1">
                            Summary
                          </p>
                          <p className="text-sm text-indigo-900 leading-relaxed">
                            {application.aiSummary || "Pending AI analysis."}
                          </p>
                          <p className="text-sm font-semibold text-indigo-900 mt-3">
                            Recommendation:{" "}
                            {application.aiRecommendation || "Pending review"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-800 mb-2">
                          Matched Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {application.matchedSkills.length > 0 ? (
                            application.matchedSkills.map((skill) => (
                              <span
                                key={skill}
                                className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500">
                              No matched skills detected.
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-800 mb-2">
                          Missing Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {application.missingSkills.length > 0 ? (
                            application.missingSkills.map((skill) => (
                              <span
                                key={skill}
                                className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500">
                              No missing skills detected.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="xl:w-56 flex xl:flex-col gap-3">
                    <button
                      onClick={() => navigate(`/analysis/${application._id}`)}
                      className="flex-1 xl:flex-none bg-gray-900 text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-5 h-5" />
                      View Details
                    </button>

                    <button className="flex-1 xl:flex-none bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      View CV
                    </button>

                    {application.status === "pending" ? (
                      <>
                        <button
                          disabled={updatingId === application._id}
                          onClick={() =>
                            handleStatusChange(application._id, "approved")
                          }
                          className="flex-1 xl:flex-none bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {updatingId === application._id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <CheckCircle className="w-5 h-5" />
                          )}
                          Approve
                        </button>

                        <button
                          disabled={updatingId === application._id}
                          onClick={() =>
                            handleStatusChange(application._id, "rejected")
                          }
                          className="flex-1 xl:flex-none bg-red-600 text-white px-4 py-3 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {updatingId === application._id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <XCircle className="w-5 h-5" />
                          )}
                          Reject
                        </button>
                      </>
                    ) : (
                      <div
                        className={`flex-1 xl:flex-none px-4 py-3 rounded-xl border flex items-center justify-center gap-2 capitalize ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {getStatusIcon(application.status)}
                        Decision: {application.status}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}