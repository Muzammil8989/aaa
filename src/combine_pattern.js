import { applyPattern } from "./pattern";
import * as THREE from "three";
import { applylogo } from "./apply_logo";

export const combinePattern = (
  sockTexture,
  logo,
  pattern,
  logoPlacement,
  dotColors,
  checkBoardColors,
  illusionistic_colors,
  csts1,
  csts2,
  csts3,
  csts4
) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const canvasWidth = sockTexture.image.width;
  const canvasHeight = sockTexture.image.height;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(sockTexture.image, 0, 0, canvasWidth, canvasHeight);

  if (pattern) {
    const patternCanvas = document.createElement("canvas");
    const patternCtx = patternCanvas.getContext("2d");

    patternCanvas.width = canvasWidth;
    patternCanvas.height = canvasHeight;

    patternCtx.drawImage(sockTexture.image, 0, 0, canvasWidth, canvasHeight);

    // Add debug logs
    console.log("Pattern:", pattern);
    console.log("dotColors:", dotColors);
    console.log("checkBoardColors:", checkBoardColors);
    console.log("illusionistic_colors:", illusionistic_colors);
    console.log("csts1:", csts1);
    console.log("csts2:", csts2);
    console.log("csts3:", csts3);
    console.log("csts4:", csts4);
    applyPattern(
      patternCtx,
      canvasWidth,
      canvasHeight,
      pattern,
      logoPlacement,
      dotColors,
      checkBoardColors,
      illusionistic_colors,
      csts1,
      csts2,
      csts3,
      csts4
    );

    const patternImg = patternCtx.createPattern(patternCanvas, "no-repeat");
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = patternImg;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.globalCompositeOperation = "source-over";
  }

  if (logo) {
    applylogo(
      ctx,
      canvasWidth,
      canvasHeight,
      logo,
      logoPlacement,
      sockTexture.image
    );
  }

  return new THREE.CanvasTexture(canvas);
};
