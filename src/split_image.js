export const splitLogo = (logo) => {
  const halfWidth = logo.width / 2;
  const height = logo.height;

  // Create two canvases for the two halves
  const leftCanvas = document.createElement('canvas');
  const rightCanvas = document.createElement('canvas');

  leftCanvas.width = halfWidth;
  leftCanvas.height = height;
  rightCanvas.width = halfWidth;
  rightCanvas.height = height;

  const leftCtx = leftCanvas.getContext('2d');
  const rightCtx = rightCanvas.getContext('2d');

  // Draw the left half of the logo
  leftCtx.drawImage(logo, 0, 0, halfWidth, height, 0, 0, halfWidth, height);

  // Draw the right half of the logo
  rightCtx.drawImage(logo, halfWidth, 0, halfWidth, height, 0, 0, halfWidth, height);

  // Convert the canvases to data URLs
  const leftLogoDataURL = leftCanvas.toDataURL('image/png');
  const rightLogoDataURL = rightCanvas.toDataURL('image/png');

  // Create Image objects from the data URLs
  const leftLogoImage = new Image();
  const rightLogoImage = new Image();

  leftLogoImage.src = leftLogoDataURL;
  rightLogoImage.src = rightLogoDataURL;

  return { leftLogoImage, rightLogoImage };
};
