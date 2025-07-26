import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CampaignList from "./pages/CampaignList";
import CreateCampaign from "./pages/CreateCampaign";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Check for the token in localStorage
  if (!token) {
    return <Navigate to="/" />;
  }
  return element;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/campaigns"
          element={<PrivateRoute element={<CampaignList />} />}
        />
        <Route
          path="/campaigns/new"
          element={<PrivateRoute element={<CreateCampaign />} />}
        />
      </Routes>
    </Router>
  );
}
