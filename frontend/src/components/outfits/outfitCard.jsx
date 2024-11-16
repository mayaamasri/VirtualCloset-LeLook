import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";

const OutfitCard = ({ outfit, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    const cleanPath = imagePath.replace(/^\/+/, "");
    return `${"http://localhost:4000"}/${cleanPath}`;
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: 4,
        bgcolor: "#d0c7b8",
        "&:hover": {
          boxShadow: 10,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          paddingTop: "100%",
          backgroundColor: "secondary.main",
        }}
      >
        <Box
          component="img"
          src={getImageUrl(outfit.image_url)}
          alt={outfit.name}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "107%",
            height: "100%",
            objectFit: "contain",
          }}
        />

        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
          }}
          onClick={handleMenuClick}
        >
          <MoreVertical size={20} />
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {outfit.name}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            label={
              outfit.season.toLowerCase() === "all_seasons"
                ? "All Seasons"
                : outfit.season
            }
            size="small"
            sx={{
              bgcolor: "primary.lighter",
            }}
          />
          <Chip
            label={outfit.occasion}
            size="small"
            sx={{
              bgcolor: "primary.lighter",
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {outfit.ClothingItems?.length || 0} items
          </Typography>
        </Box>
      </CardContent>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onEdit();
          }}
        >
          <Edit2 size={16} style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onDelete();
          }}
          sx={{ color: "error.main" }}
        >
          <Trash2 size={16} style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default OutfitCard;
