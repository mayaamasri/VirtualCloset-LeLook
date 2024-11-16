// src/pages/ItemsPage.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ItemsNavBar from "../components/items/ItemsNavBar";
import ItemCard from "../components/items/ItemCard";
import ItemService from "../services/itemService";
import CategoryService from "../services/categoryService";
import { useNavigate } from "react-router-dom";

const ItemsPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("userId");
        console.log("Fetching items for userId:", userId);

        // Fetch items
        const itemsResponse = await ItemService.getAllItemsByUserId(userId);
        console.log("Items response:", itemsResponse);

        if (itemsResponse.data) {
          setItems(itemsResponse.data);
          console.log("Set items:", itemsResponse.data);
        }

        // Fetch categories
        const categoriesResponse = await CategoryService.getAllCategories();
        if (categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load items");
        setItems([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Filtering items with:", {
      currentFilter,
      itemsCount: items.length,
    });

    const filterItems = () => {
      let filtered = [...items];

      if (currentFilter !== "all") {
        filtered = filtered.filter((item) => {
          const itemCategory =
            item.Category?.category_name || item.category_name;
          return itemCategory?.toLowerCase() === currentFilter.toLowerCase();
        });
      }

      if (searchQuery) {
        filtered = filtered.filter((item) =>
          item.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      console.log("Filtered items:", filtered);
      setFilteredItems(filtered);
    };

    filterItems();
  }, [items, searchQuery, currentFilter]);

  const handleEdit = (item) => {
    navigate(`/items/edit/${item.item_id}`);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    try {
      await ItemService.deleteItem(itemToDelete.item_id);
      setItems((prevItems) =>
        prevItems.filter((item) => item.item_id !== itemToDelete.item_id)
      );
      handleDeleteClose();
    } catch (err) {
      console.error("Failed to delete item:", err);
      setError("Failed to delete item");
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

        {error ? (
          <Typography color="error" textAlign="center" mt={4}>
            {error}
          </Typography>
        ) : filteredItems.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              mt: 8,
              color: "text.secondary",
            }}
          >
            <Typography variant="h6" gutterBottom>
              No items found
            </Typography>
            <Typography variant="body2">
              {items.length === 0
                ? "Start by adding some items to your wardrobe!"
                : "Try adjusting your filters or search query"}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/items/add")}
              sx={{ mt: 2 }}
            >
              Add Item
            </Button>
          </Box>
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

        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteClose}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Delete Item</DialogTitle>
          <DialogContent id="delete-dialog-description">
            <Typography>
              Are you sure you want to delete "{itemToDelete?.name}"? This
              action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDeleteClose}
              variant="outlined"
              color="primary"
              sx={{ borderRadius: 28 }}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
              sx={{ borderRadius: 28 }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ItemsPage;
