import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/ui/Header";
import LoginScreen from "./pages/login-screen";
import RegistrationScreen from "./pages/registration-screen";
import PasswordResetScreen from "./pages/password-reset-screen";
import Dashboard from "./pages/dashboard";
import ProjectDetails from "./pages/project-details";
import Settings from "./pages/settings";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Header />
        <RouterRoutes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login-screen" element={<LoginScreen />} />
          <Route path="/registration-screen" element={<RegistrationScreen />} />
          <Route path="/password-reset-screen" element={<PasswordResetScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project-details" element={<ProjectDetails />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/settings" element={<Settings />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;