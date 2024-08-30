// import { OrbitControls, useGLTF } from '@react-three/drei';
// import { useEffect } from 'react';
// import * as THREE from 'three';


// export function Model({ cuffColor, heelColor, toeColor, texture }) {
//   const { nodes, materials } = useGLTF('/SockModel.gltf');

//   useEffect(() => {
//     // Apply default textures
//     const defaultCuffTexture = new THREE.TextureLoader().load('/cuffTexture.png');
//     const defaultHeelTexture = new THREE.TextureLoader().load('/cuffTexture.png');
//     const defaultToeTexture = new THREE.TextureLoader().load('/cuffTexture.png');

//     materials.Cuff.map = defaultCuffTexture;
//     materials.Cuff.needsUpdate = true;

//     materials.Heel.map = defaultHeelTexture;
//     materials.Heel.needsUpdate = true;

//     materials.Toe.map = defaultToeTexture;
//     materials.Toe.needsUpdate = true;

//     // Apply sock texture
//     materials.Sock_Texture.map = texture || defaultSockTexture;
//     materials.Sock_Texture.needsUpdate = true;

//     // Apply color changes
//     materials.Cuff.color.set(cuffColor);
//     materials.Cuff.needsUpdate = true;

//     materials.Heel.color.set(heelColor);
//     materials.Heel.needsUpdate = true;

//     materials.Toe.color.set(toeColor);
//     materials.Toe.needsUpdate = true;

//     materials.Sock_Texture.color.set(dsockColor);
//     materials.Sock_Texture.needsUpdate = true;

//   }, [cuffColor, heelColor, toeColor, dsockColor, texture, materials, defaultSockTexture]);

//   return (
//     <group dispose={null} position={[0, -0.15, 0]}>
//       <mesh geometry={nodes.mesh005_3.geometry} material={materials.Cuff} castShadow receiveShadow />
//       <mesh geometry={nodes.mesh005.geometry} material={materials.Sock_Texture} castShadow receiveShadow />
//       <mesh geometry={nodes.mesh005_1.geometry} material={materials.Heel} castShadow receiveShadow />
//       <mesh geometry={nodes.mesh005_2.geometry} material={materials.Toe} castShadow receiveShadow />
//     </group>
//   );
// }
