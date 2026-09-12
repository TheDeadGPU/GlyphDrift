'use client';

import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import TextParticles from '@/components/TextParticles';
import ColorPickerOverlay from '@/components/ColorPickerOverlay';

interface SceneProps {
  text: string;
  colorHex: string;
}
function Scene({ text, colorHex }: SceneProps) {
  return (
    <React.Suspense fallback={null}>
      <TextParticles text={text} colorHex={colorHex} />
      {/* Starry Background Component */}
      <Stars 
        radius={50}   // Radius of the inner sphere (default 100)
        depth={50}    // Depth area where stars are spread (default 50)
        count={5000}  // Number of stars (default 5000)
        factor={4}    // Size factor of the stars (default 4)
        saturation={0}// Color saturation (0 is white, 1 is full color)
        fade          // Fade stars that are further away
        speed={1}     // Speed of twinkling/rotation animation
      />
    </React.Suspense>
  );
}
import DriftControlCenter from '@/components/DriftControlCenter';
import GitHubButton from '@/components/GitHubButton';

export default function Page() {
  const [text, setText] = useState('Next.js + R3F');
  const [color, setColor] = useState("#0FFF50")
  const orbitControlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <main className="h-screen w-full bg-slate-950">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <Scene text={text} colorHex={color} />
        <OrbitControls ref={orbitControlsRef} />
      </Canvas>
      <DriftControlCenter onResetView={() => orbitControlsRef.current?.reset()} />
      <input
        type="text"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <GitHubButton className='absolute bottom-4 right-4'/>
    </main>
  );
}