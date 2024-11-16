import http from "../http-common";

const createItem = async (itemData) => {
  try {
    const formData = new FormData();
    formData.append("user_id", localStorage.getItem("userId"));
    formData.append("name", itemData.name);
    formData.append("category_name", itemData.category);
    formData.append("color", itemData.color);
    formData.append("season", itemData.season);

    if (itemData.image) {
      formData.append("image", itemData.image);
    }

    const response = await http.post("/clothingitems", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Request error details:", {
      message: error.message,
      response: error.response?.data,
      requestData: error.config?.data,
    });
    throw error;
  }
};

const getItemById = (id) => {
  return http.get(`/clothingitems/${id}`);
};

const getAllItemsByUserId = async (userId) => {
  try {
    console.log("Fetching items for user:", userId);
    const response = await http.get(`/clothingitems/user/${userId}`);
    console.log("API Response:", response.data);

    const items = response.data.items || response.data || [];
    return { data: Array.isArray(items) ? items : [] };
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

const getItemByCategory = (userId, category) => {
  return http.get(`/clothingitems/category/${userId}/${category}`);
};

const getItemBySeason = (userId, season) => {
  return http.get(`/clothingitems/season/${userId}/${season}`);
};

const getItemByColor = (userId, color) => {
  return http.get(`/clothingitems/color/${userId}/${color}`);
};

const updateItem = (id, itemData) => {
  const formData = new FormData();

  formData.append("name", itemData.name);
  formData.append("category_name", itemData.category);
  formData.append("color", itemData.color);
  formData.append("season", itemData.season);

  if (itemData.image) {
    formData.append("image", itemData.image);
  }

  return http.put(`/clothingitems/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteItem = (id) => {
  return http.delete(`/clothingitems/${id}`);
};

const ItemService = {
  createItem,
  getItemById,
  getAllItemsByUserId,
  getItemByCategory,
  getItemBySeason,
  getItemByColor,
  updateItem,
  deleteItem,
};

export default ItemService;
