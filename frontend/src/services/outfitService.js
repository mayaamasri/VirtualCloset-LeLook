import http from "../http-common";

const createOutfit = async (formData) => {
  for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
  }

  return http.post('/outfits', formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  });
};

const getOutfitsByUserId = async (userId) => {
  try {
    console.log('Requesting outfits for user:', userId);
    const response = await http.get(`/outfits/user/${userId}`);
    console.log('Outfits response:', response.data);
    return response;
  } catch (error) {
    console.error('Error in getOutfitsByUserId:', error);
    throw error;
  }
};

const getOutfitById = (id) => {
  return http.get(`/outfits/${id}`);
};

const updateOutfit = async (id, outfitData) => {
  return http.put(`/outfits/${id}`, outfitData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


const deleteOutfit = (id) => {
  return http.delete(`/outfits/${id}`);
};

const OutfitService = {
  createOutfit,
  getOutfitsByUserId,
  getOutfitById,
  updateOutfit,
  deleteOutfit
};

export default OutfitService;