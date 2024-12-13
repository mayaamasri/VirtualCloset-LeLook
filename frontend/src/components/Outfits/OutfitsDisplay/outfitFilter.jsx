import React from "react";
import { Box, Button } from "@mui/material";
import { Plus, Wand } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FilterInputs from "./filterInputs";

// OutfitsFilter component
const OutfitsFilter = ({ filters, onFilterChange }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        {/* Filter inputs */}
        <FilterInputs filters={filters} onFilterChange={onFilterChange} />
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => navigate("/outfits/create")}
          sx={{
            bgcolor: "primary.main",
            py: 2,
            width: "15vh",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          Add Outfit
        </Button>
        <Button
          variant="contained"
          startIcon={<Wand size={20} />}
          onClick={() => navigate("/ai-generate")}
          sx={{
            bgcolor: "primary.main",
            py: 2,
            width: "17vh",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          Ai Assistant
        </Button>
      </Box>
    </Box>
  );
};

export default OutfitsFilter;
