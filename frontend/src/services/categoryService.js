import http from "../http-common";

const getAllCategories = () => {
  return http.get("/categories");
};

const CategoryService = {
  getAllCategories
};

export default CategoryService;