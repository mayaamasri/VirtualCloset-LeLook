import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import Logo from "../../common/Logo";
import { Fields } from "./Fields";
import { usePreferencesForm } from "../../../hooks/usePreferencesForm";
import { PREFERENCE_STYLES } from "../styles";

// PreferenceForm component
const PreferenceForm = ({ mode = "create" }) => {
  const {
    formData,
    error,
    isLoading,
    handleChange,
    handleWeatherToggle,
    handleColorSelect,
    handleSubmit,
    navigate,
  } = usePreferencesForm(mode);

  if (mode === "edit" && isLoading) {
    return (
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography>Loading preferences...</Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={PREFERENCE_STYLES.form}>
      {/* Stack container */}
      <Stack spacing={3}>
        <Logo />
        <Typography
          variant="h5"
          textAlign="center"
          color="text.secondary"
          sx={PREFERENCE_STYLES.heading}
        >
          {mode === "edit"
            ? "Update Your Preferences"
            : "Let's personalize your experience"}
        </Typography>

        {/* Fields component */}
        <Fields
          formData={formData}
          handleChange={handleChange}
          handleColorSelect={handleColorSelect}
          handleWeatherToggle={handleWeatherToggle}
          isLoading={isLoading}
        />

        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        {/* Stack container */}
        <Stack direction="row" spacing={2}>
          {mode === "edit" && (
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate("/homepage")}
              sx={PREFERENCE_STYLES.button}
            >
              Cancel
            </Button>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              ...PREFERENCE_STYLES.button,
              ...PREFERENCE_STYLES.submitButton,
            }}
          >
            {isLoading
              ? `${mode === "edit" ? "Updating" : "Creating"}...`
              : `${mode === "edit" ? "Update" : "Create"} Preferences`}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PreferenceForm;
