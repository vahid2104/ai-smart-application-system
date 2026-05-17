import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Brain,
  User,
  BriefcaseBusiness,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle,
  BarChart3,
  FileSearch,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";

type RoleType = "candidate" | "manager" | "admin";

type RoleCard = {
  id: RoleType;
  title: string;
  description: string;
  icon: React.ElementType;
  buttonText: string;
  route: string;
  badge: string;
  demoEmail: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<RoleCard | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const roleCards: RoleCard[] = [
    {
      id: "candidate",
      title: "Candidate Portal",
      description: "Browse vacancies, upload CV, and track application status.",
      icon: User,
      buttonText: "Login as Candidate",
      route: "/user",
      badge: "User",
      demoEmail: "candidate@example.com",
    },
    {
      id: "manager",
      title: "Manager Review",
      description:
        "Review candidates with AI fit score, CV analysis, and recommendations.",
      icon: BriefcaseBusiness,
      buttonText: "Login as Manager",
      route: "/manager",
      badge: "Manager",
      demoEmail: "manager@example.com",
    },
    {
      id: "admin",
      title: "Admin Analytics",
      description:
        "Monitor vacancies, application statistics, and recruitment analytics.",
      icon: ShieldCheck,
      buttonText: "Login as Admin",
      route: "/admin",
      badge: "Admin",
      demoEmail: "admin@example.com",
    },
  ];

  const features = [
    "Vacancy-based CV submission",
    "AI candidate fit scoring",
    "Matched and missing skill analysis",
    "Role-based review workflow",
  ];

  const handleRoleSelect = (role: RoleCard) => {
    setSelectedRole(role);
    setFormData({
      email: role.demoEmail,
      password: "password123",
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedRole) return;

    navigate(selectedRole.route);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950 to-indigo-950 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute top-40 -left-24 w-80 h-80 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-blue-200" />
                <span className="text-sm text-blue-100">
                  AI-Powered Recruitment Review System
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Review job applications with AI-powered CV insights
              </h1>

              <p className="text-blue-100 text-lg mt-6 max-w-xl leading-relaxed">
                A role-based platform where candidates apply to vacancies,
                managers review CV-to-job fit scores, and admins monitor the
                recruitment workflow.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm text-blue-50">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-6 shadow-2xl">
              <div className="bg-white text-gray-900 rounded-2xl p-6">
                {!selectedRole ? (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                        <Brain className="w-7 h-7 text-blue-600" />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold">
                          Choose Your Role
                        </h2>
                        <p className="text-sm text-gray-500">
                          Select a role before logging in
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {roleCards.map((role) => {
                        const Icon = role.icon;

                        return (
                          <button
                            key={role.id}
                            onClick={() => handleRoleSelect(role)}
                            className="w-full text-left border border-gray-200 rounded-2xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-11 h-11 bg-gray-100 group-hover:bg-white rounded-xl flex items-center justify-center">
                                <Icon className="w-6 h-6 text-blue-600" />
                              </div>

                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-3">
                                  <h3 className="font-bold text-gray-900">
                                    {role.title}
                                  </h3>

                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                    {role.badge}
                                  </span>
                                </div>

                                <p className="text-sm text-gray-600 mt-1">
                                  {role.description}
                                </p>

                                <div className="flex items-center gap-2 mt-3 text-blue-600 text-sm font-semibold">
                                  Continue to login
                                  <ArrowRight className="w-4 h-4" />
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedRole(null)}
                      className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm mb-6"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Change role
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                        <selectedRole.icon className="w-7 h-7 text-blue-600" />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold">
                          {selectedRole.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Login with email and password
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Email
                        </label>

                        <div className="relative">
                          <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Password
                        </label>

                        <div className="relative">
                          <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-sm text-blue-900 font-semibold">
                          Demo credentials
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                          Email: {selectedRole.demoEmail}
                        </p>
                        <p className="text-sm text-blue-700">
                          Password: password123
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
                      >
                        {selectedRole.buttonText}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <FileSearch className="w-6 h-6 text-blue-600" />
            </div>

            <h3 className="font-bold text-gray-900 mb-2">CV-to-Job Analysis</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Candidate CVs are evaluated against selected vacancy requirements
              to produce a fit score and summary.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-indigo-600" />
            </div>

            <h3 className="font-bold text-gray-900 mb-2">AI Recommendations</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              The system highlights matched skills, missing skills, risk areas,
              and suggests whether to approve or reject.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>

            <h3 className="font-bold text-gray-900 mb-2">Admin Analytics</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Admins can monitor vacancies, candidate decisions, average AI
              scores, and recruitment workflow activity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}