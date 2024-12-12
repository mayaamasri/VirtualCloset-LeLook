import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";

// Custom hook to handle login and signup forms
export const useAuth = (type = "login") => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (formData) => {
    setError("");
    setIsLoading(true);

    try {
      // Call the login service method
      const data = await AuthService.login(formData);

      if (data.user?.user_id) {
        localStorage.setItem("userId", data.user.user_id);
      } else {
        throw new Error("User ID not received from server");
      }

      // Check if user has preferences set
      const hasPreferences = await AuthService.checkUserPreferences(
        data.user.user_id
      );
      navigate(hasPreferences ? "/homepage" : "/preferences");
    } catch (err) {
      console.error("Login error", err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle signup form submission
  const handleSignupSubmit = async (formData) => {
    setError("");
    setIsLoading(true);

    try {
      // Call the register service method
      await AuthService.register(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    handleSubmit: type === "login" ? handleLoginSubmit : handleSignupSubmit,
  };
};
