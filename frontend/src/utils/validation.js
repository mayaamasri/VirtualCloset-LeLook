export const validateOutfit = (outfitData) => {
    const { name, season, occasion, items } = outfitData;
    if (!name || !season || !occasion) {
      return { valid: false, error: 'Please fill in all required fields' };
    }
    if (!items || items.length === 0) {
      return { valid: false, error: 'Please add at least one item to the outfit' };
    }
    return { valid: true };
  };
  