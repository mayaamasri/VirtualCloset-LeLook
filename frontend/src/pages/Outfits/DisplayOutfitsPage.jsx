import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import OutfitService from "../../services/outfitService";
import OutfitCard from "../../components/Outfits/OutfitsDisplay/outfitCard";
import OutfitsFilter from "../../components/Outfits/OutfitsDisplay/outfitFilter";
import { useOutfits } from "../../hooks/useOutfits";

const OutfitsPage = () => {
  const navigate = useNavigate();
  const {
    loading,
    error,
    outfits,
    filteredOutfits,
    filters,
    setFilters,
    fetchOutfits,
    setError,
  } = useOutfits();

  // Fetch outfits on initial render
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Fetch outfits on initial render
  const handleDelete = async (outfitId) => {
    try {
      await OutfitService.deleteOutfit(outfitId);
      fetchOutfits();
    } catch (err) {
      setError("Failed to delete outfit");
    }
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      {/* Outfits display */}
      <Container maxWidth="xl">
        {/* Page title */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Playfair Display",
            fontStyle: "italic",
            color: "primary.main",
            mb: 4,
          }}
        >
          My Outfits
        </Typography>

        {/* Outfits filter */}
        <OutfitsFilter filters={filters} onFilterChange={handleFilterChange} />

        {filteredOutfits.length === 0 ? (
          <Typography>Start by creating your first outfit!</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredOutfits.map((outfit) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={outfit.outfit_id}>
                <OutfitCard
                  outfit={outfit}
                  onEdit={() => navigate(`/outfits/${outfit.outfit_id}`)}
                  onDelete={() => handleDelete(outfit.outfit_id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default OutfitsPage;
