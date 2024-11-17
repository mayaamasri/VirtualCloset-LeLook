import React from "react";
import { Box, Button } from "@mui/material";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FilterInputs from "./filterInputs";

const OutfitsFilter = ({ filters, onFilterChange }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          mb: 3,
        }}
      >
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
      </Box>
    </Box>
  );
};

export default OutfitsFilter;
