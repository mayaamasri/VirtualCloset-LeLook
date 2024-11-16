// utils/imageUtils.js
export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    
    // Clean the path by removing leading slashes
    const cleanPath = imagePath.replace(/^\/+/, '');
    
    // Construct the full URL using environment variable or default
    return `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/${cleanPath}`;
  };
  
  // For handling image load errors
  export const handleImageError = (event, fallbackText = '') => {
    console.error('Error loading image:', event.target.src);
    event.target.style.display = 'none';
    
    // Optionally show a fallback element
    if (fallbackText) {
      const fallbackElement = document.createElement('div');
      fallbackElement.textContent = fallbackText;
      fallbackElement.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #666;
        text-align: center;
      `;
      event.target.parentElement.appendChild(fallbackElement);
    }
  };