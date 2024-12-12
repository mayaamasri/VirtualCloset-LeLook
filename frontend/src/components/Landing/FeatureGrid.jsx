import React from "react";
import { Grid, Box, Typography } from "@mui/material";

// Features data
const features = [
  {
    title: "Organize",
    image: "images/organize.jpg",
  },
  {
    title: "Create",
    image: "images/create.jpg",
  },
  {
    title: "Design",
    image: "images/design.jpg",
  },
  {
    title: "Style",
    image: "images/style.jpg",
  },
];

// FeatureCard component
const FeatureCard = ({ title, image }) => (
  <Box
    sx={{
      position: "relative",
      height: { xs: 300, md: 400 },
      overflow: "hidden",
      borderRadius: 2,
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      },
    }}
  >
    {/* Image */}
    <Box
      component="img"
      src={image}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />

    {/* Title */}
    <Typography
      variant="h2"
      sx={{
        position: "absolute",
        bottom: 15,
        left: 15,
        color: "white",
        fontFamily: "Playfair Display",
        fontStyle: "italic",
        fontSize: { xs: "2rem", md: "2.5rem" },
      }}
    >
      {title}
    </Typography>
  </Box>
);

// FeatureGrid component
const FeatureGrid = () => {
  return (
    <Grid container spacing={2}>
      {features.map((feature) => (
        <Grid item xs={12} sm={6} md={3} key={feature.title}>
          <FeatureCard {...feature} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FeatureGrid;
