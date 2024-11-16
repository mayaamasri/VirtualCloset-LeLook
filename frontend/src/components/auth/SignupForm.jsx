import React, { useState, useEffect } from "react";
import { Box, Stack, MenuItem, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../forms/TextField";
import PasswordField from "../forms/PasswordField";
import Logo from "../common/Logo";
import CountryService from "../../services/countryService";
import AuthService from "../../services/authService";

const SignupForm = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    password_hash: "",
    country_name: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await CountryService.getAll();
      setCountries(response.data);
    } catch (err) {
      setError("Unable to load countries. Please try again later.");
    }
  };

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
      await AuthService.register(formData);
      navigate("/login");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again.");
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
        mt: 16,
        p: 3,
      }}
    >
      <Stack spacing={3}>
        <Logo />
        <TextField
          name="first_name"
          placeholder="First name"
          value={formData.first_name}
          onChange={handleChange}
          disabled={isLoading}
        />
        <TextField
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          disabled={isLoading}
        />
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
        <TextField
          select
          name="country_name"
          label="Country"
          value={formData.country_name}
          onChange={handleChange}
          disabled={isLoading || countries.length === 0}
        >
          {countries.map((country) => (
            <MenuItem key={country.country_id} value={country.country_name}>
              {country.country_name}
            </MenuItem>
          ))}
        </TextField>

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
          {isLoading ? "Signing Up..." : "Sign Up!"}
        </Button>

        <Typography
          textAlign="center"
          sx={{
            mt: 2,
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
          Already have an account? <Link to="/login">Log In!</Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default SignupForm;
