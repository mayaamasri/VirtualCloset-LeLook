import http from "../http-common";

const createPreferences = (data) => {
  return http.post("/userpref", data);
};

const getPreferences = (userId) => {
  return http.get(`/userpref/${userId}`);
};

const updatePreferences = (userId, data) => {
  return http.put(`/userpref/${userId}`, data);
};

const UserPreferenceService = {
  createPreferences,
  getPreferences,
  updatePreferences,
};

export default UserPreferenceService;
