import { createBrowserRouter } from "react-router";
import LoginPage from "./components/LoginPage";
import UserDashboard from "./components/UserDashboard";
import ApplicationSubmission from "./components/ApplicationSubmission";
import ManagerDashboard from "./components/ManagerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AIAnalysisView from "./components/AIAnalysisView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/user",
    Component: UserDashboard,
  },
  {
    path: "/user/submit",
    Component: ApplicationSubmission,
  },
  {
    path: "/manager",
    Component: ManagerDashboard,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/analysis/:id",
    Component: AIAnalysisView,
  },
]);
