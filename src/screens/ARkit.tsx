import React, { useRef, useEffect } from 'react';
import { GLView } from 'expo-gl'; // Correct import for GLView
import * as THREE from 'three'; // 0.87.1
import ExpoTHREE from 'expo-three'; // 2.0.2
import { View, Text } from 'react-native';

const ARKit = ({ navigation }: { navigation: any }) => {
  const glViewRef = useRef<any>(null);

  useEffect(() => {
    const onGLContextCreate = async (gl: any) => {
      const width = gl.drawingBufferWidth;
      const height = gl.drawingBufferHeight;
      console.log('width, height', width, height);

      const arSession = await glViewRef.current.startARSessionAsync();

      // const scene = new THREE.Scene();
      // const camera = ExpoTHREE.createARCamera(arSession, width, height, 0.01, 1000);
      // const renderer = ExpoTHREE.createRenderer({ gl });
      // renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

      // scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
      camera.position.set(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ context: gl.getContext() });
      renderer.setSize(width, height);


      // Edit the box dimensions here and see changes immediately!
      const geometry = new THREE.BoxGeometry(0.07, 0.07, 0.07);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.z = -0.4;
      scene.add(cube);

      const animate = () => {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.07;
        cube.rotation.y += 0.04;

        renderer.render(scene, camera);
        gl.endFrameEXP();
      };
      animate();
    };

    if (glViewRef.current) {
      glViewRef.current.onContextCreate = onGLContextCreate;
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>ddd</Text>
      <GLView
        ref={glViewRef}
        style={{ flex: 1 }}
        onContextCreate={glViewRef.current?.onContextCreate}
      />
    </View>

  );
};

export default ARKit;