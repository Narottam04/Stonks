import { lazy } from "react";

// import DesktopDashboard from "../Components/DesktopDashboard";
const DesktopDashboard = lazy(() => import("../Components/DesktopDashboard"));

const Dashboard = () => {
  return (
    <section className="lg:px-4 py-2 lg:py-8 mx-auto max-w-[1600px]">
      <p className="text-white font-bold text-2xl md:text-3xl font-title pt-6 md:pt-0 mb-4 ml-3 px-2 md:px-4">
        Welcome to Dashboard
      </p>

      <DesktopDashboard />
    </section>
  );
};

export default Dashboard;
