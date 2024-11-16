import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import ItemService from "../../services/itemService";
import CategoryService from "../../services/categoryService";

const steps = ["Upload Image", "Item Details", "Review"];

const colorOptions = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  "Pink",
  "Orange",
  "Brown",
  "Gray",
  "Beige",
];

const seasonOptions = ["Spring", "Summer", "Fall", "Winter", "All Seasons"];

const AddItemForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    color: "",
    season: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAllCategories();
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const validateForm = () => {
    const required = ["name", "category", "color", "season", "image"];
    const missing = required.filter((field) => !formData[field]);

    if (missing.length > 0) {
      setError(`Missing required fields: ${missing.join(", ")}`);
      return false;
    }
    return true;
  };

  const handleImageSelect = (file) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    if (error) setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError("");
  };

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        if (!formData.image) {
          setError("Please upload an image");
          return false;
        }
        break;
      case 1:
        if (!formData.name || !formData.category) {
          setError("Please fill in all required fields");
          return false;
        }
        break;
      default:
        break;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      await ItemService.createItem(formData);
      setSuccess(true);
      navigate("/items");
    } catch (err) {
      console.error("Error creating item:", err);
      setError(err.response?.data?.error || "Failed to save item");
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ImageUpload onImageSelect={handleImageSelect} />;
      case 1:
        return (
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Item Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category.category_id}
                    value={category.category_name}
                  >
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary" mb={1}>
                  Color
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {colorOptions.map((color) => (
                    <Chip
                      key={color}
                      label={color}
                      onClick={() =>
                        handleChange({
                          target: { name: "color", value: color },
                        })
                      }
                      variant={formData.color === color ? "filled" : "outlined"}
                      color={formData.color === color ? "primary" : "default"}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" color="text.secondary" mb={1}>
                  Season
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {seasonOptions.map((season) => (
                    <Chip
                      key={season}
                      label={season}
                      onClick={() =>
                        handleChange({
                          target: { name: "season", value: season },
                        })
                      }
                      variant={
                        formData.season === season ? "filled" : "outlined"
                      }
                      color={formData.season === season ? "primary" : "default"}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={3}>
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">{formData.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Category
                </Typography>
                <Typography variant="body1">{formData.category}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Color
                </Typography>
                <Typography variant="body1">{formData.color}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Season
                </Typography>
                <Typography variant="body1">{formData.season}</Typography>
              </Grid>
            </Grid>
          </Stack>
        );
      default:
        return "Unknown step";
    }
  };

  if (loading && activeStep === steps.length - 1) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 8, p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Playfair Display",
          fontStyle: "italic",
          color: "primary.main",
          mb: 4,
          textAlign: "center",
        }}
      >
        Add New Item
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Item added successfully! Redirecting...
        </Alert>
      )}

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {getStepContent(activeStep)}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}>
        {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              borderRadius: 28,
              px: 4,
            }}
          >
            {loading ? "Saving..." : "Save Item"}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              borderRadius: 28,
              px: 4,
            }}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AddItemForm;
