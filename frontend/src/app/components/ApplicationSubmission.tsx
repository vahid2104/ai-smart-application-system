import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Send, FileText } from "lucide-react";

export default function ApplicationSubmission() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Funding",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/user");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg">Smart Application System</h1>
            <p className="text-sm text-gray-600">Submit Application</p>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/user")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl mb-2">Submit New Application</h2>
          <p className="text-gray-600 mb-8">
            Fill out the form below. Our AI will analyze your application and provide recommendations.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Application Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Research Grant Application"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Funding">Funding</option>
                <option value="Procurement">Procurement</option>
                <option value="Travel">Travel</option>
                <option value="Facilities">Facilities</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px]"
                placeholder="Provide detailed information about your application..."
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Our AI will analyze the content, check for completeness, and provide a recommendation.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/user")}
                className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
