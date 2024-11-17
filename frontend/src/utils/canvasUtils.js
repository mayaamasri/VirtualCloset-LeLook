import html2canvas from 'html2canvas';

export const captureCanvas = async (canvasRef) => {
  if (!canvasRef.current) return null;

  try {
    const canvas = await html2canvas(canvasRef.current, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
      logging: true,
    });

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png', 0.95);
    });
  } catch (error) {
    console.error('Error capturing canvas:', error);
    return null;
  }
};