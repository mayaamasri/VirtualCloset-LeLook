export const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    const cleanPath = imagePath.replace(/^\/+/, "");
    return `${"http://localhost:4000"}/${cleanPath}`;
  };
  