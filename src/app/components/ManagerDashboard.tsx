import { useState } from "react";
import { useNavigate } from "react-router";
import { FileText, LogOut, CheckCircle, XCircle, Sparkles, Eye } from "lucide-react";

const mockApplications = [
  {
    id: 1,
    title: "Research Grant Application",
    applicant: "John Doe",
    category: "Funding",
    submittedDate: "2026-04-10",
    aiScore: 92,
    aiSummary: "Strong justification with detailed budget breakdown. All required documentation attached.",
    status: "pending",
  },
  {
    id: 2,
    title: "Equipment Purchase Request",
    applicant: "Jane Smith",
    category: "Procurement",
    submittedDate: "2026-04-15",
    aiScore: 85,
    aiSummary: "Valid request with clear use case. Minor budget clarifications recommended.",
    status: "pending",
  },
  {
    id: 3,
    title: "Lab Access Extension",
    applicant: "Mike Johnson",
    category: "Facilities",
    submittedDate: "2026-04-17",
    aiScore: 88,
    aiSummary: "Reasonable request with proper supervisor approval. Scheduling conflicts resolved.",
    status: "pending",
  },
  {
    id: 4,
    title: "Software License Request",
    applicant: "Sarah Williams",
    category: "Procurement",
    submittedDate: "2026-04-16",
    aiScore: 78,
    aiSummary: "Adequate justification. Consider departmental license for cost efficiency.",
    status: "pending",
  },
];

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState(mockApplications);

  const handleApprove = (id: number) => {
    setApplications(apps =>
      apps.map(app => app.id === id ? { ...app, status: "approved" } : app)
    );
  };

  const handleReject = (id: number) => {
    setApplications(apps =>
      apps.map(app => app.id === id ? { ...app, status: "rejected" } : app)
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return "bg-green-50 border-green-200";
    if (score >= 70) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg">Smart Application System</h1>
              <p className="text-sm text-gray-600">Manager Portal</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl mb-2">Application Review</h2>
          <p className="text-gray-600">Review AI-analyzed applications and make decisions</p>
        </div>

        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl mb-1">{app.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Applicant: {app.applicant}</span>
                    <span>•</span>
                    <span>{app.category}</span>
                    <span>•</span>
                    <span>{app.submittedDate}</span>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg border ${getScoreBgColor(app.aiScore)}`}>
                  <div className="text-sm text-gray-600 mb-1">AI Score</div>
                  <div className={`text-2xl ${getScoreColor(app.aiScore)}`}>
                    {app.aiScore}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-900">AI Analysis Summary</span>
                </div>
                <p className="text-sm text-gray-700">{app.aiSummary}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/analysis/${app.id}`)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                {app.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(app.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(app.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
                {app.status === "approved" && (
                  <div className="px-4 py-2 rounded-lg bg-green-50 text-green-700 border border-green-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Approved
                  </div>
                )}
                {app.status === "rejected" && (
                  <div className="px-4 py-2 rounded-lg bg-red-50 text-red-700 border border-red-200 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Rejected
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
