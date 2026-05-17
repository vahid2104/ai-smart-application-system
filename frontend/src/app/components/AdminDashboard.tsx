import { useNavigate } from "react-router";
import {
  Briefcase,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  Sparkles,
  BarChart3,
  Activity,
  TrendingUp,
  FileText,
} from "lucide-react";
import {
  candidateApplications,
  vacancies,
} from "../data/mockRecruitmentData";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const totalApplications = candidateApplications.length;
  const approvedApplications = candidateApplications.filter(
    (application) => application.status === "approved"
  ).length;
  const rejectedApplications = candidateApplications.filter(
    (application) => application.status === "rejected"
  ).length;
  const pendingApplications = candidateApplications.filter(
    (application) => application.status === "pending"
  ).length;

  const averageAiScore = Math.round(
    candidateApplications.reduce(
      (total, application) => total + application.aiScore,
      0
    ) / totalApplications
  );

  const vacancyStats = vacancies.map((vacancy) => {
    const applicationsForVacancy = candidateApplications.filter(
      (application) => application.vacancyId === vacancy.id
    );

    const averageScore =
      applicationsForVacancy.length > 0
        ? Math.round(
            applicationsForVacancy.reduce(
              (total, application) => total + application.aiScore,
              0
            ) / applicationsForVacancy.length
          )
        : 0;

    return {
      ...vacancy,
      applicationsCount: applicationsForVacancy.length,
      averageScore,
    };
  });

  const recentActivities = [
    {
      id: 1,
      text: "John Doe was approved for Software Engineer",
      type: "approved",
      time: "10 minutes ago",
    },
    {
      id: 2,
      text: "Sarah Williams was rejected for Software Engineer",
      type: "rejected",
      time: "25 minutes ago",
    },
    {
      id: 3,
      text: "Mike Johnson submitted a CV for Frontend Developer",
      type: "pending",
      time: "1 hour ago",
    },
  ];

  const getStatusIcon = (type: string) => {
    if (type === "approved") return <CheckCircle className="w-5 h-5" />;
    if (type === "rejected") return <XCircle className="w-5 h-5" />;
    return <Clock className="w-5 h-5" />;
  };

  const getStatusColor = (type: string) => {
    if (type === "approved") return "bg-green-50 text-green-700";
    if (type === "rejected") return "bg-red-50 text-red-700";
    return "bg-yellow-50 text-yellow-700";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Analytics Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Recruitment workflow overview and AI-assisted application analytics
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
        <section className="mb-8">
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-7 h-7 text-blue-200" />
              <h2 className="text-3xl font-bold">
                AI Recruitment System Overview
              </h2>
            </div>

            <p className="text-blue-100 max-w-3xl">
              Monitor vacancies, candidate applications, AI fit scores, and
              approval decisions from one centralized admin dashboard.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500">Active Vacancies</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {vacancies.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <p className="text-sm text-gray-500">Total Applications</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {totalApplications}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-11 h-11 bg-yellow-50 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {pendingApplications}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm text-gray-500">Approved</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {approvedApplications}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center mb-4">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-sm text-gray-500">Rejected</p>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {rejectedApplications}
            </p>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Average AI Score
              </h3>
            </div>

            <p className={`text-5xl font-bold ${getScoreColor(averageAiScore)}`}>
              {averageAiScore}%
            </p>

            <p className="text-sm text-gray-600 mt-3">
              Average candidate fit score across all applications.
            </p>

            <div className="mt-5 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full"
                style={{ width: `${averageAiScore}%` }}
              />
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Vacancy Performance
              </h3>
            </div>

            <div className="space-y-4">
              {vacancyStats.map((vacancy) => (
                <div
                  key={vacancy.id}
                  className="border border-gray-200 rounded-xl p-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {vacancy.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {vacancy.department} • {vacancy.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Applications</p>
                        <p className="font-bold text-gray-900">
                          {vacancy.applicationsCount}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-500">Avg. Score</p>
                        <p
                          className={`font-bold ${getScoreColor(
                            vacancy.averageScore
                          )}`}
                        >
                          {vacancy.averageScore}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${vacancy.averageScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Recent Applications
              </h3>
            </div>

            <div className="space-y-4">
              {candidateApplications.map((application) => (
                <div
                  key={application.id}
                  className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/analysis/${application.id}`)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {application.candidateName}
                      </h4>

                      <p className="text-sm text-gray-500 mt-1">
                        Applied for {application.vacancyTitle}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        CV: {application.cvFileName}
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-xl font-bold ${getScoreColor(
                          application.aiScore
                        )}`}
                      >
                        {application.aiScore}%
                      </p>

                      <span
                        className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs capitalize ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Activity className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-900">
                Recent Activity
              </h3>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 border border-gray-200 rounded-xl p-4"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${getStatusColor(
                      activity.type
                    )}`}
                  >
                    {getStatusIcon(activity.type)}
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">
                      {activity.text}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <p className="font-bold text-indigo-900">AI Component Status</p>
              </div>

              <p className="text-sm text-indigo-900 leading-relaxed">
                The system currently uses mock AI analysis data for demonstration.
                The next development step is to connect the backend to OpenAI API
                and generate real CV-to-vacancy fit scores.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}