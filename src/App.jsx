import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./theme";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import DayChallengePage from "./pages/DayChallengePage";

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView({ block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/day/12" element={<DayChallengePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}
