import { useNavigate } from "react-router";
import { Plus, FileText, Clock, CheckCircle, XCircle, LogOut } from "lucide-react";

const mockApplications = [
  {
    id: 1,
    title: "Research Grant Application",
    category: "Funding",
    status: "approved",
    submittedDate: "2026-04-10",
    aiScore: 92,
  },
  {
    id: 2,
    title: "Equipment Purchase Request",
    category: "Procurement",
    status: "pending",
    submittedDate: "2026-04-15",
    aiScore: 85,
  },
  {
    id: 3,
    title: "Conference Travel Approval",
    category: "Travel",
    status: "rejected",
    submittedDate: "2026-04-08",
    aiScore: 68,
  },
  {
    id: 4,
    title: "Lab Access Extension",
    category: "Facilities",
    status: "pending",
    submittedDate: "2026-04-17",
    aiScore: 88,
  },
];

export default function UserDashboard() {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    if (status === "approved") return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === "rejected") return <XCircle className="w-5 h-5 text-red-600" />;
    return <Clock className="w-5 h-5 text-yellow-600" />;
  };

  const getStatusColor = (status: string) => {
    if (status === "approved") return "bg-green-50 text-green-700 border-green-200";
    if (status === "rejected") return "bg-red-50 text-red-700 border-red-200";
    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg">Smart Application System</h1>
              <p className="text-sm text-gray-600">User Portal</p>
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
          <h2 className="text-3xl mb-2">Welcome back, Student!</h2>
          <p className="text-gray-600">Manage your applications and track their status</p>
        </div>

        <button
          onClick={() => navigate("/user/submit")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mb-8"
        >
          <Plus className="w-5 h-5" />
          Submit New Application
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg">My Applications</h3>
          </div>

          <div className="divide-y divide-gray-200">
            {mockApplications.map((app) => (
              <div
                key={app.id}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/analysis/${app.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg mb-1">{app.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {app.category}
                      </span>
                      <span>Submitted: {app.submittedDate}</span>
                      <span>AI Score: {app.aiScore}/100</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full border text-sm capitalize flex items-center gap-2 ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                      {app.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
