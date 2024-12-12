import { useState, useEffect } from "react";

export const useItemFilters = (items) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
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

      setFilteredItems(filtered);
    };

    filterItems();
  }, [items, searchQuery, currentFilter]);

  return {
    searchQuery,
    setSearchQuery,
    currentFilter,
    setCurrentFilter,
    filteredItems,
  };
};
