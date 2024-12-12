import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import DraggableItem from "./draggableItem";

//  OutfitCanvas component
const OutfitCanvas = ({
  canvasRef,
  selectedItems,
  onDrag,
  onRemove,
  onResize,
}) => {
  return (
    <Paper
      ref={canvasRef}
      elevation={3}
      sx={{
        height: "67vh",
        backgroundColor: "#e8e1d7",
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        border: "2px dashed",
        borderColor: alpha("#6D5E52", 0.2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selectedItems.length === 0 ? (
        <Box sx={{ textAlign: "center", color: "text.secondary", p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Outfit Canvas
          </Typography>
          <Typography variant="body2">
            Click on items from the left panel to add them here.
            <br />
            Drag items to position them and use the controls to resize.
          </Typography>
        </Box>
      ) : (
        selectedItems.map((item) => (
          <DraggableItem
            key={item.id}
            item={item}
            onDrag={onDrag}
            onRemove={onRemove}
            onResize={onResize}
          />
        ))
      )}
    </Paper>
  );
};

export default OutfitCanvas;
