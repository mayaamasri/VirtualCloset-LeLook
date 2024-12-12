import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { PREFERENCE_OPTIONS } from "../constants";

// FitSelect component
export const FitSelect = ({ value, onChange, disabled }) => (
  <FormControl fullWidth>
    <InputLabel>Preferred Fit</InputLabel>
    {/* Select */}
    <Select
      name="preferred_fit"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {/* Fit options */}
      {PREFERENCE_OPTIONS.FITS.map((fit) => (
        <MenuItem key={fit} value={fit}>
          {fit}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
