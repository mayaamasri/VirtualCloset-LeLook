import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemService from "../services/itemService";
import CategoryService from "../services/categoryService";

export const useItemForm = (id = null) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    color: "",
    season: "",
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await CategoryService.getAllCategories();
        setCategories(categoriesResponse.data);

        if (id) {
          const itemResponse = await ItemService.getItemById(id);
          const item = itemResponse.data;

          if (item.image_url) {
            const imageUrl = item.image_url.startsWith("http")
              ? item.image_url
              : `${"http://localhost:4000"}/${item.image_url.replace(/^\/+/, "")}`;
            setCurrentImageUrl(imageUrl);
          }

          setFormData({
            name: item.name || "",
            category: item.Category?.category_name || item.category_name || "",
            color: item.color || "",
            season: item.season || "",
            image: null,
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          id ? "Failed to load item details" : "Failed to load categories"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError("");

      if (id) {
        await ItemService.updateItem(id, formData);
      } else {
        await ItemService.createItem(formData);
      }

      setSuccess(true);
      setTimeout(() => navigate("/items"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.error || `Failed to ${id ? "update" : "save"} item`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return {
    loading,
    submitting,
    success,
    error,
    categories,
    formData,
    currentImageUrl,
    setFormData,
    setError,
    handleSubmit,
    navigate,
  };
};
