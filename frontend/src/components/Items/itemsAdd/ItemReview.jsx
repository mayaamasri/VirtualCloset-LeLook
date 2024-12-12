import React from "react";
import { Stack, Box, Grid, Typography } from "@mui/material";

// ReviewField component
const ReviewField = ({ label, value }) => (
  <Grid item xs={6}>
    <Typography variant="subtitle2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">{value || "Not specified"}</Typography>
  </Grid>
);

// ItemReview component
const ItemReview = ({ formData }) => {
  return (
    <Stack spacing={3}>
      {/* Image preview */}
      <Box sx={{ textAlign: "center" }}>
        <img
          src={formData.image ? URL.createObjectURL(formData.image) : ""}
          alt="Item preview"
          style={{
            maxWidth: "100%",
            maxHeight: 300,
            objectFit: "contain",
          }}
        />
      </Box>

      {/* ReviewField components */}
      <Grid container spacing={2}>
        <ReviewField label="Name" value={formData.name} />
        <ReviewField label="Category" value={formData.category} />
        <ReviewField label="Color" value={formData.color} />
        <ReviewField label="Season" value={formData.season} />
      </Grid>
    </Stack>
  );
};

export default ItemReview;
