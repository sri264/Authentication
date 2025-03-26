import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Unauthorized! Please log in.");
    return <Navigate to="/" />;
  }

  try {
    const decoded = jwtDecode(token); 
    const storedEmail = localStorage.getItem("userEmail");

    if (!decoded.email || decoded.email !== storedEmail) {
      alert("Token mismatch! Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      return <Navigate to="/" />;
    }

    return <Outlet />;
  } catch (error) {
    alert("Invalid token! Please log in again.");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
