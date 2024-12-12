import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { Edit2, Trash2 } from "lucide-react";

// OutfitCardMenu component
const OutfitCardMenu = ({ anchorEl, open, onClose, onEdit, onDelete }) => (
  <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
    <MenuItem
      onClick={() => {
        onClose();
        onEdit();
      }}
    >
      {/* Edit icon */}
      <Edit2 size={16} />
      Edit
    </MenuItem>
    <MenuItem
      onClick={() => {
        onClose();
        onDelete();
      }}
    >
      {/* Delete icon */}
      <Trash2 size={16} />
      Delete
    </MenuItem>
  </Menu>
);

export default OutfitCardMenu;
