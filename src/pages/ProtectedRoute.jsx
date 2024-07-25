import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../contexts/FakeAuthenticationContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
