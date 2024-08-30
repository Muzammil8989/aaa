// import React, { useState, useEffect } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Suspense } from 'react';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import { SketchPicker } from 'react-color';
// import * as THREE from 'three';
// import './index.css';

// function App() {
//   const [cuffColor, setCuffColor] = useState('#ffffff');
//   const [heelColor, setHeelColor] = useState('#ffffff');
//   const [toeColor, setToeColor] = useState('#ffffff');
//   const [texture, setTexture] = useState(null);
//   const [logo, setLogo] = useState(null);
//   const [defaultSockTexture, setDefaultSockTexture] = useState(null);

//   useEffect(() => {
//     // Load the default sock texture
//     const loader = new THREE.TextureLoader();
//     loader.load('/sockTexture.png', (texture) => {
//       texture.encoding = THREE.sRGBEncoding;
//       texture.minFilter = THREE.LinearFilter;
//       texture.magFilter = THREE.LinearFilter;
//       setDefaultSockTexture(texture);
//       // Initialize texture with the default sock texture if no custom texture is set
//       if (!texture) {
//         setTexture(texture);
//       }
//     });
//   }, []);

//   const combineTextures = (sockTexture, newTexture, logo) => {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const canvasWidth = sockTexture.image.width;
//     const canvasHeight = sockTexture.image.height;
//     canvas.width = canvasWidth;
//     canvas.height = canvasHeight;

//     // Draw default sock texture
//     ctx.drawImage(sockTexture.image, 0, 0, canvasWidth, canvasHeight);

//     // Apply new texture
//     if (newTexture) {
//       ctx.globalCompositeOperation = 'multiply';
//       ctx.drawImage(newTexture, 0, 0, canvasWidth, canvasHeight);
//       ctx.globalCompositeOperation = 'source-over';
//     }

//     // Clear previous logo area (if logo exists)
//     if (logo) {
//       const logoWidth = 400; // Adjust as needed
//       const logoHeight = 300; // Adjust as needed
//       const logoX = canvasWidth - logoWidth - 10; // Adjust coordinates as needed
//       const logoY = canvasHeight - logoHeight - 10; // Adjust coordinates as needed

//       // Clear previous logo area
//       ctx.clearRect(logoX, logoY, logoWidth, logoHeight);

//       // Apply new logo
//       ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
//     }

//     return new THREE.CanvasTexture(canvas);
//   };

//   const handleTextureChange = (event) => {
//     const file = event.target.files[0];
//     if (file && defaultSockTexture) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = new Image();
//         img.src = e.target.result;
//         img.onload = () => {
//           const newTexture = img;
//           const mergedTexture = combineTextures(defaultSockTexture, newTexture, logo);
//           mergedTexture.encoding = THREE.sRGBEncoding;
//           mergedTexture.minFilter = THREE.LinearFilter;
//           mergedTexture.magFilter = THREE.LinearFilter;
//           setTexture(mergedTexture);
//         };
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleLogoChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = new Image();
//         img.src = e.target.result;
//         img.onload = () => {
//           setLogo(null)
//           setLogo(img);
//           // Update the texture with the new logo
//           if (defaultSockTexture) {
//             const updatedTexture = combineTextures(defaultSockTexture, texture?.image, img);
//             updatedTexture.encoding = THREE.sRGBEncoding;
//             updatedTexture.minFilter = THREE.LinearFilter;
//             updatedTexture.magFilter = THREE.LinearFilter;
//             setTexture(updatedTexture);
//           }
//         };
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   function Model({ cuffColor, heelColor, toeColor, texture }) {
//     const { nodes, materials } = useGLTF('/SockModel.gltf');

//     useEffect(() => {
//       const defaultCuffTexture = new THREE.TextureLoader().load('/cuffTexture.png');
//       const defaultHeelTexture = new THREE.TextureLoader().load('/cuffTexture.png');
//       const defaultToeTexture = new THREE.TextureLoader().load('/cuffTexture.png');

//       // Apply default textures
//       materials.Cuff.map = defaultCuffTexture;
//       materials.Cuff.needsUpdate = true;

//       materials.Heel.map = defaultHeelTexture;
//       materials.Heel.needsUpdate = true;

//       materials.Toe.map = defaultToeTexture;
//       materials.Toe.needsUpdate = true;

//       // Apply sock texture
//       if (texture) {
//         materials.Sock_Texture.map = texture;
//       } else if (defaultSockTexture) {
//         materials.Sock_Texture.map = defaultSockTexture;
//       }
//       materials.Sock_Texture.needsUpdate = true;

//       // Apply color changes
//       materials.Cuff.color.set(cuffColor);
//       materials.Cuff.needsUpdate = true;

//       materials.Heel.color.set(heelColor);
//       materials.Heel.needsUpdate = true;

//       materials.Toe.color.set(toeColor);
//       materials.Toe.needsUpdate = true;

//     }, [cuffColor, heelColor, toeColor, texture, materials, defaultSockTexture]);

//     return (
//       <group dispose={null} position={[0, -0.15, 0]}>
//         <mesh geometry={nodes.mesh005_3.geometry} material={materials.Cuff} castShadow receiveShadow />
//         <mesh geometry={nodes.mesh005.geometry} material={materials.Sock_Texture} castShadow receiveShadow />
//         <mesh geometry={nodes.mesh005_1.geometry} material={materials.Heel} castShadow receiveShadow />
//         <mesh geometry={nodes.mesh005_2.geometry} material={materials.Toe} castShadow receiveShadow />
//       </group>
//     );
//   }

//   return (
//     <div className="App">
//       <div className="container">
//         <div className="model-container">
//           <Canvas camera={{ position: [1, 0, 1], fov: 50 }} shadows>
//             <Suspense fallback={null}>
//               <ambientLight intensity={0.6} />
//               <spotLight
//                 intensity={0.9}
//                 angle={0.7}
//                 penumbra={0}
//                 position={[0, 5, 2]}
//                 castShadow
//                 shadow-mapSize-width={2048}
//                 shadow-mapSize-height={2048}
//               />
//               <Model cuffColor={cuffColor} heelColor={heelColor} toeColor={toeColor} texture={texture} />
//               <mesh receiveShadow position={[0, -0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//                 <planeGeometry args={[5, 5]} />
//                 <shadowMaterial opacity={0.1} />
//               </mesh>
//               <OrbitControls
//                 enablePan={true}
//                 enableZoom={true}
//                 enableRotate={true}
//                 maxDistance={0.75}
//                 minDistance={0.3}
//               />
//             </Suspense>
//           </Canvas>
//         </div>
//         <div className="controls-container">
//           <div className="controls">
//             <div>
//               <h3>Upload Texture</h3>
//               <input type="file" accept="image/*" onChange={handleTextureChange} />
//             </div>
//             <div>
//               <h3>Upload Logo</h3>
//               <input type="file" accept="image/*" onChange={handleLogoChange} />
//             </div>
//             <div>
//               <h3>Cuff Color</h3>
//               <SketchPicker color={cuffColor} onChange={(color) => setCuffColor(color.hex)} />
//             </div>
//             <div>
//               <h3>Heel Color</h3>
//               <SketchPicker color={heelColor} onChange={(color) => setHeelColor(color.hex)} />
//             </div>
//             <div>
//               <h3>Toe Color</h3>
//               <SketchPicker color={toeColor} onChange={(color) => setToeColor(color.hex)} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
// -------------patterns

// import React, { useState, useEffect } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Suspense } from 'react';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import { SketchPicker } from 'react-color';
// import * as THREE from 'three';
// import './index.css';

// const combineTextures = (sockTexture, newTexture, logo, pattern) => {
//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');
//   const canvasWidth = sockTexture.image.width;
//   const canvasHeight = sockTexture.image.height;
//   canvas.width = canvasWidth;
//   canvas.height = canvasHeight;

//   // Draw default sock texture
//   ctx.drawImage(sockTexture.image, 0, 0, canvasWidth, canvasHeight);

//   // Apply pattern overlay
//   if (pattern) {
//     applyPattern(ctx, canvasWidth, canvasHeight, pattern);
//   }

//   // Apply new texture
//   if (newTexture) {
//     ctx.globalCompositeOperation = 'multiply';
//     ctx.drawImage(newTexture, 0, 0, canvasWidth, canvasHeight);
//     ctx.globalCompositeOperation = 'source-over';
//   }

//   // Clear previous logo area (if logo exists)
//   if (logo) {
//     const logoWidth = 400; // Adjust as needed
//     const logoHeight = 300; // Adjust as needed
//     const logoX = canvasWidth - logoWidth - 10; // Adjust coordinates as needed
//     const logoY = canvasHeight - logoHeight - 10; // Adjust coordinates as needed

//     // Clear previous logo area
//     ctx.clearRect(logoX, logoY, logoWidth, logoHeight);

//     // Apply new logo
//     ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
//   }

//   return new THREE.CanvasTexture(canvas);
// };

// const applyPattern = (ctx, canvasWidth, canvasHeight, pattern) => {
//   const patternCanvas = document.createElement('canvas');
//   const patternCtx = patternCanvas.getContext('2d');
//   patternCanvas.width = 100; // Pattern width
//   patternCanvas.height = 100; // Pattern height

//   // Draw selected pattern
//   if (pattern === 'stripes') {
//     patternCtx.fillStyle = '#000'; // Stripe color
//     for (let y = 0; y < 100; y += 20) {
//       patternCtx.fillRect(0, y, 100, 10); // Stripes
//     }
//   } else if (pattern === 'dots') {
//     patternCtx.fillStyle = '#000'; // Dot color
//     for (let y = 10; y < 100; y += 20) {
//       for (let x = 10; x < 100; x += 20) {
//         patternCtx.beginPath();
//         patternCtx.arc(x, y, 5, 0, Math.PI * 2); // Dots
//         patternCtx.fill();
//       }
//     }
//   } else {
//     return; // No pattern
//   }

//   const patternImg = ctx.createPattern(patternCanvas, 'repeat');
//   ctx.fillStyle = patternImg;
//   ctx.fillRect(0, 0, canvasWidth, canvasHeight);
// };

// function App() {
//   const [cuffColor, setCuffColor] = useState('#ffffff');
//   const [heelColor, setHeelColor] = useState('#ffffff');
//   const [toeColor, setToeColor] = useState('#ffffff');
//   const [texture, setTexture] = useState(null);
//   const [logo, setLogo] = useState(null);
//   const [defaultSockTexture, setDefaultSockTexture] = useState(null);
//   const [pattern, setPattern] = useState('none'); // Pattern state

//   useEffect(() => {
//     // Load the default sock texture
//     const loader = new THREE.TextureLoader();
//     loader.load('/sockTexture.png', (texture) => {
//       texture.encoding = THREE.sRGBEncoding;
//       texture.minFilter = THREE.LinearFilter;
//       texture.magFilter = THREE.LinearFilter;
//       setDefaultSockTexture(texture);
//       if (!texture) {
//         setTexture(texture);
//       }
//     });
//   }, []);

//   const handleTextureChange = (event) => {
//     const file = event.target.files[0];
//     if (file && defaultSockTexture) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = new Image();
//         img.src = e.target.result;
//         img.onload = () => {
//           const newTexture = img;
//           const mergedTexture = combineTextures(defaultSockTexture, newTexture, logo, pattern);
//           mergedTexture.encoding = THREE.sRGBEncoding;
//           mergedTexture.minFilter = THREE.LinearFilter;
//           mergedTexture.magFilter = THREE.LinearFilter;
//           setTexture(mergedTexture);
//         };
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleLogoChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = new Image();
//         img.src = e.target.result;
//         img.onload = () => {
//           setLogo(img);
//           if (defaultSockTexture) {
//             const updatedTexture = combineTextures(defaultSockTexture, texture?.image, img, pattern);
//             updatedTexture.encoding = THREE.sRGBEncoding;
//             updatedTexture.minFilter = THREE.LinearFilter;
//             updatedTexture.magFilter = THREE.LinearFilter;
//             setTexture(updatedTexture);
//           }
//         };
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handlePatternChange = (event) => {
//     setPattern(event.target.value);
//     if (defaultSockTexture) {
//       const updatedTexture = combineTextures(defaultSockTexture, texture?.image, logo, event.target.value);
//       updatedTexture.encoding = THREE.sRGBEncoding;
//       updatedTexture.minFilter = THREE.LinearFilter;
//       updatedTexture.magFilter = THREE.LinearFilter;
//       setTexture(updatedTexture);
//     }
//   };

//   function Model({ cuffColor, heelColor, toeColor, texture }) {
//     const { nodes, materials } = useGLTF('/SockModel.gltf');

//     useEffect(() => {
//       const defaultCuffTexture = new THREE.TextureLoader().load('/cuffTexture.png');
//       const defaultHeelTexture = new THREE.TextureLoader().load('/cuffTexture.png');
//       const defaultToeTexture = new THREE.TextureLoader().load('/cuffTexture.png');

//       // Apply default textures
//       materials.Cuff.map = defaultCuffTexture;
//       materials.Cuff.needsUpdate = true;

//       materials.Heel.map = defaultHeelTexture;
//       materials.Heel.needsUpdate = true;

//       materials.Toe.map = defaultToeTexture;
//       materials.Toe.needsUpdate = true;

//       // Apply sock texture
//       if (texture) {
//         materials.Sock_Texture.map = texture;
//       } else if (defaultSockTexture) {
//         materials.Sock_Texture.map = defaultSockTexture;
//       }
//       materials.Sock_Texture.needsUpdate = true;

//       // Apply color changes
//       materials.Cuff.color.set(cuffColor);
//       materials.Cuff.needsUpdate = true;

//       materials.Heel.color.set(heelColor);
//       materials.Heel.needsUpdate = true;

//       materials.Toe.color.set(toeColor);
//       materials.Toe.needsUpdate = true;

//     }, [cuffColor, heelColor, toeColor, texture, materials, defaultSockTexture]);

//     return (
//       <group dispose={null} position={[0, -0.15, 0]}>
//         <mesh geometry={nodes.mesh005_3.geometry} material={materials.Cuff} castShadow receiveShadow />
//         <mesh geometry={nodes.mesh005.geometry} material={materials.Sock_Texture} castShadow receiveShadow />
//         <mesh geometry={nodes.mesh005_1.geometry} material={materials.Heel} castShadow receiveShadow />
//         <mesh geometry={nodes.mesh005_2.geometry} material={materials.Toe} castShadow receiveShadow />
//       </group>
//     );
//   }

//   return (
//     <div className="App">
//       <div className="container">
//         <div className="model-container">
//           <Canvas camera={{ position: [1, 0, 1], fov: 50 }} shadows>
//             <Suspense fallback={null}>
//               <ambientLight intensity={0.6} />
//               <spotLight
//                 intensity={0.9}
//                 angle={0.7}
//                 penumbra={0}
//                 position={[0, 5, 2]}
//                 castShadow
//                 shadow-mapSize-width={2048}
//                 shadow-mapSize-height={2048}
//               />
//               <Model cuffColor={cuffColor} heelColor={heelColor} toeColor={toeColor} texture={texture} />
//               <mesh receiveShadow position={[0, -0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//                 <planeGeometry args={[5, 5]} />
//                 <shadowMaterial opacity={0.1} />
//               </mesh>
//               <OrbitControls
//                 enablePan={true}
//                 enableZoom={true}
//                 enableRotate={true}
//                 maxDistance={0.75}
//                 minDistance={0.3}
//               />
//             </Suspense>
//           </Canvas>
//         </div>
//         <div className="controls-container">
//           <div className="controls">
//             <div>
//               <h3>Upload Texture</h3>
//               <input type="file" accept="image/*" onChange={handleTextureChange} />
//             </div>
//             <div>
//               <h3>Upload Logo</h3>
//               <input type="file" accept="image/*" onChange={handleLogoChange} />
//             </div>
//             <div>
//               <h3>Cuff Color</h3>
//               <SketchPicker color={cuffColor} onChange={(color) => setCuffColor(color.hex)} />
//             </div>
//             <div>
//               <h3>Heel Color</h3>
//               <SketchPicker color={heelColor} onChange={(color) => setHeelColor(color.hex)} />
//             </div>
//             <div>
//               <h3>Toe Color</h3>
//               <SketchPicker color={toeColor} onChange={(color) => setToeColor(color.hex)} />
//             </div>
//             <div>
//               <h3>Select Pattern</h3>
//               <select onChange={handlePatternChange} value={pattern}>
//                 <option value="none">None</option>
//                 <option value="stripes">Stripes</option>
//                 <option value="dots">Dots</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
// ----------------------------------apattern change
