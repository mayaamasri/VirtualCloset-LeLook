import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ItemsNavBar from "../../components/Items/itemsDisplay/ItemsNavBar";
import ItemCard from "../../components/Items/itemsDisplay/ItemsCard";
import { DeleteDialog } from "../../components/Items/itemsDisplay/deleteDialog";
import { useItems } from "../../hooks/useItems";
import { useItemFilters } from "../../hooks/useItemFilters";

const ItemsPage = () => {
  const navigate = useNavigate();
  const { items, categories, loading, error, handleDeleteItem } = useItems();
  const {
    searchQuery,
    setSearchQuery,
    currentFilter,
    setCurrentFilter,
    filteredItems,
  } = useItemFilters(items);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleEdit = (item) => {
    navigate(`/items/edit/${item.item_id}`);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete && (await handleDeleteItem(itemToDelete.item_id))) {
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Playfair Display",
            fontStyle: "italic",
            color: "primary.main",
            mb: 4,
          }}
        >
          My Items
        </Typography>

        <ItemsNavBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          categories={categories}
        />

        <Box sx={{ mt: 4 }}>
          {error ? (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.item_id}>
                  <ItemCard
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <DeleteDialog
          open={deleteDialogOpen}
          itemName={itemToDelete?.name}
          onClose={() => {
            setDeleteDialogOpen(false);
            setItemToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
        />
      </Container>
    </Box>
  );
};

export default ItemsPage;
