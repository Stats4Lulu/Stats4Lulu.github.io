import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";  // Import HelmetProvider
import App from "./App.tsx";
import HomePage from "./HomePage.tsx";
import Media from "./Media.tsx";

function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Router basename="/">
        <RedirectHandler />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/timeline" element={<App />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </Router>
    </HelmetProvider>
  </StrictMode>
);
