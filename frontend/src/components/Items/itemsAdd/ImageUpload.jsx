import React, { useState } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { Upload, Sparkles } from "lucide-react";
import AiService from "../../../services/aiService";

// ImageUpload component
const ImageUpload = ({ onImageSelect, currentImageUrl, onAiAnalysis }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  // Handle image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setIsProcessing(true);
        setError(null);
        setCurrentFile(file);

        // Read file as data URL
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result);
          setIsProcessing(false);
        };
        reader.onerror = () => {
          setError("Failed to load image");
          setIsProcessing(false);
        };
        reader.readAsDataURL(file);

        // Call onImageSelect callback
        onImageSelect(file);
      } catch (err) {
        console.error("Error handling image:", err);
        setError("Failed to process image");
        setIsProcessing(false);
      }
    }
  };

  // Handle AI analysis
  const handleAiAnalysis = async () => {
    if (!currentFile) {
      setError("No image file available for analysis");
      return;
    }

    try {
      // Set analyzing state
      setIsAnalyzing(true);
      setError(null);
      // Call AI service to analyze image
      const response = await AiService.analyzeClothingImage(currentFile);
      onAiAnalysis(response);
    } catch (err) {
      setError("Failed to analyze image with AI");
      console.error("AI analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 300,
        border: "2px dashed",
        borderColor: error ? "error.main" : "primary.main",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        mb: 3,
      }}
    >
      {/* File input */}
      <input
        accept="image/*"
        type="file"
        onChange={handleImageChange}
        disabled={isProcessing || isAnalyzing}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: isProcessing || isAnalyzing ? "not-allowed" : "pointer",
          zIndex: 1,
        }}
      />

      {isProcessing || isAnalyzing ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={40} color="primary" />
          <Typography variant="body1" color="primary" mt={2}>
            {isAnalyzing ? "Analyzing image with AI..." : "Processing image..."}
          </Typography>
        </Box>
      ) : previewUrl || currentImageUrl ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Box
            component="img"
            src={previewUrl || currentImageUrl}
            alt="Preview"
            sx={{
              maxWidth: "90%",
              maxHeight: "70%",
              objectFit: "contain",
              display: "block",
            }}
          />

          {currentFile && !currentImageUrl && (
            <Button
              variant="contained"
              startIcon={<Sparkles size={16} />}
              onClick={handleAiAnalysis}
              disabled={isAnalyzing}
              sx={{
                mt: 2,
                borderRadius: 28,
                zIndex: 1,
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Analyze with AI
            </Button>
          )}

          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              width: "100%",
              textAlign: "center",
              color: "text.secondary",
              zIndex: 0,
            }}
          >
            Click or drag to replace image
          </Box>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center", zIndex: 0 }}>
          <Upload size={40} color="#6D5E52" />
          <Typography variant="body1" color="primary" mt={2}>
            Click or drag image to upload
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Supports: JPG, PNG (Max 5MB)
          </Typography>
        </Box>
      )}
      {error && (
        <Typography
          color="error"
          variant="body2"
          sx={{
            position: "absolute",
            bottom: 8,
            width: "100%",
            textAlign: "center",
            px: 2,
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;
