import http from "../http-common";
import { setToken, removeToken } from "../utils/token";

// AuthService provides methods for user authentication
const login = async (data) => {
  const response = await http.post("/users/login", data);
  if (response.data.token) {
    setToken(response.data.token);
    localStorage.setItem("userId", response.data.user.user_id);
  }
  return response.data;
};

// Get user details by user ID
const getUserDetails = (userId) => {
  return http.get(`/users/${userId}`);
};

const checkUserPreferences = async (userId) => {
  try {
    const response = await http.get(`/userpref/${userId}`);
    return response.data !== "Not found";
  } catch (error) {
    return false;
  }
};

const logout = () => {
  removeToken();
};

const register = (data) => {
  return http.post("/users/register", data);
};

const AuthService = {
  login,
  checkUserPreferences,
  logout,
  register,
  getUserDetails,
};

export default AuthService;
