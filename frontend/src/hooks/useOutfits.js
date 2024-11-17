import { useState, useEffect } from 'react';
import OutfitService from '../services/outfitService';

export const useOutfits = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [outfits, setOutfits] = useState([]);
  const [filteredOutfits, setFilteredOutfits] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    season: "all",
    occasion: "all",
  });

  const fetchOutfits = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const response = await OutfitService.getOutfitsByUserId(userId);

      if (response?.data?.outfits) {
        setOutfits(response.data.outfits);
        setFilteredOutfits(response.data.outfits);
      } else {
        setOutfits([]);
        setFilteredOutfits([]);
      }
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to load outfits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutfits();
  }, []);

  useEffect(() => {
    if (!outfits) return;

    let filtered = [...outfits];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter((outfit) =>
        outfit.name.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.season !== "all") {
      filtered = filtered.filter(
        (outfit) => outfit.season.toLowerCase() === filters.season.toLowerCase()
      );
    }

    if (filters.occasion !== "all") {
      filtered = filtered.filter(
        (outfit) => outfit.occasion.toLowerCase() === filters.occasion.toLowerCase()
      );
    }

    setFilteredOutfits(filtered);
  }, [filters, outfits]);

  return {
    loading,
    error,
    outfits,
    filteredOutfits,
    filters,
    setFilters,
    fetchOutfits,
    setError
  };
};