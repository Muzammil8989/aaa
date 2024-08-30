import * as THREE from 'three';
import { applylogo } from './apply_logo';

export const combineTextures = (sockTexture, newTexture, logo,logoPlacement) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const canvasWidth = sockTexture.image.width;
  const canvasHeight = sockTexture.image.height;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // Draw default sock texture
  ctx.drawImage(sockTexture.image, 0, 0, canvasWidth, canvasHeight);

  // Apply new texture if any
  if (newTexture) {
    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(newTexture, 0, 0, canvasWidth, canvasHeight);
    ctx.globalCompositeOperation = 'source-over';
  }

  // Apply logo if any
  if (logo) {
    // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    applylogo(ctx,canvasWidth,canvasHeight,logo,logoPlacement,sockTexture.image)

  }

  return new THREE.CanvasTexture(canvas);
};

