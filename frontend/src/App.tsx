import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AdminContactRequestsPage from "./pages/AdminContactRequestsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/contact-requests" element={<AdminContactRequestsPage />} />
    </Routes>
  );
}

export default App;