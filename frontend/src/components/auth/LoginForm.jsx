import React, { useState } from "react";
import { Box, Stack, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../forms/TextField";
import PasswordField from "../forms/PasswordField";
import Logo from "../common/Logo";
import AuthService from "../../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password_hash: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await AuthService.login(formData);
      console.log("Login response:", data);

      if (data.user?.user_id) {
        localStorage.setItem("userId", data.user.user_id);
      }
      if (!data.user?.user_id) {
        throw new Error("User ID not received from server");
      }

      const hasPreferences = await AuthService.checkUserPreferences(
        data.user.user_id
      );

      if (hasPreferences) {
        navigate("/homepage");
      } else {
        navigate("/preferences");
      }
    } catch (err) {
      console.error("Login error", err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError(
          err.message || "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 28,
        p: 3,
      }}
    >
      <Stack spacing={3}>
        <Logo />

        <TextField
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />

        <PasswordField
          name="password_hash"
          placeholder="Password"
          value={formData.password_hash}
          onChange={handleChange}
          disabled={isLoading}
        />

        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{
            borderRadius: 28,
            py: 1.5,
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          {isLoading ? "Logging in..." : "Log In!"}
        </Button>

        <Typography
          textAlign="center"
          sx={{
            mt: 2,
            color: "text.secondary",
            "& a": {
              color: "primary.main",
              textDecoration: "none",
              fontStyle: "italic",
              "&:hover": {
                textDecoration: "underline",
              },
            },
          }}
        >
          Don't have an account? <Link to="/signup">Sign Up!</Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoginForm;
