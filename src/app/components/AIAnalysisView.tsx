import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Sparkles, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

type Analysis = {
  title: string;
  applicant: string;
  category: string;
  submittedDate: string;
  aiScore: number;
  summary: string;
  recommendation: string;
  strengths: string[];
  concerns: string[];
  details: {
    completeness: number;
    clarity: number;
    feasibility: number;
    alignment: number;
  };
};

const mockAnalysis: Record<string, Analysis> = {
  '1': {
    title: "Research Grant Application",
    applicant: "John Doe",
    category: "Funding",
    submittedDate: "2026-04-10",
    aiScore: 92,
    summary: "This application demonstrates exceptional merit with comprehensive documentation and clear research objectives. The budget breakdown is detailed and justified, with all required supporting documents attached.",
    recommendation: "Strongly Approve",
    strengths: [
      "Clear and well-defined research objectives",
      "Comprehensive budget breakdown with justifications",
      "All required documentation properly attached",
      "Strong alignment with department priorities",
      "Feasible timeline with realistic milestones"
    ],
    concerns: [
      "Consider clarifying the data collection methodology",
      "Budget for equipment may need verification with procurement"
    ],
    details: {
      completeness: 95,
      clarity: 90,
      feasibility: 88,
      alignment: 94
    }
  }
};

export default function AIAnalysisView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const analysis = mockAnalysis[id || '1'];

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getRecommendationColor = (rec: string) => {
    if (rec.includes("Approve")) return "bg-green-50 text-green-700 border-green-200";
    if (rec.includes("Review")) return "bg-yellow-50 text-yellow-700 border-yellow-200";
    return "bg-red-50 text-red-700 border-red-200";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg">AI Analysis Report</h1>
              <p className="text-sm text-gray-600">Detailed Application Review</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-3xl mb-2">{analysis.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Applicant: {analysis.applicant}</span>
                <span>•</span>
                <span>{analysis.category}</span>
                <span>•</span>
                <span>{analysis.submittedDate}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">AI Score</div>
              <div className={`text-5xl ${getScoreColor(analysis.aiScore)}`}>
                {analysis.aiScore}
              </div>
              <div className="text-sm text-gray-600 mt-1">out of 100</div>
            </div>
          </div>

          <div className={`px-6 py-4 rounded-lg border flex items-center gap-3 ${getRecommendationColor(analysis.recommendation)}`}>
            <Sparkles className="w-6 h-6" />
            <div>
              <div className="text-sm mb-1">AI Recommendation</div>
              <div className="text-xl">{analysis.recommendation}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-8">
          <h3 className="text-xl mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Executive Summary
          </h3>
          <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Key Strengths
            </h3>
            <ul className="space-y-3">
              {analysis.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Areas for Review
            </h3>
            <ul className="space-y-3">
              {analysis.concerns.map((concern, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{concern}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl mb-6">Detailed Metrics</h3>
          <div className="space-y-4">
            {Object.entries(analysis.details).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm capitalize text-gray-700">{key}</span>
                  <span className={`text-sm ${getScoreColor(value)}`}>{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      value >= 85 ? 'bg-green-600' : value >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
