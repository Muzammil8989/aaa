import * as THREE from 'three';
import { applylogo } from './apply_logo';
// import { log } from 'three/examples/jsm/nodes/Nodes.js';

export const combineLogoChange = (sockTexture, logo, logoPlacement) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const canvasWidth = sockTexture.image.width;
  const canvasHeight = sockTexture.image.height;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
    
  console.log("clearing");
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  console.log("cleared");
    
  // Draw default sock texture
  ctx.drawImage(sockTexture.image, 0, 0, canvasWidth, canvasHeight);

  // Apply logo if any
  if (logo) {
    // console.log(logoPlacement);
    console.log(logo);
    applylogo(ctx, canvasWidth, canvasHeight, logo, logoPlacement,sockTexture.image);

    console.log("change:",logoPlacement);
  }

  return new THREE.CanvasTexture(canvas);
};
