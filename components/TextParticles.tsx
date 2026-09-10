'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

interface TextParticlesProps {
    text: string;
    colorHex: string;
}

function TextParticles({ text, colorHex }: TextParticlesProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const particleCount = 1600;
  
  // Store original sampled positions, live positions, and colors
  const [originalPositions, currentPositions, colors] = useMemo(() => {
    return [
      new Float32Array(particleCount * 3),
      new Float32Array(particleCount * 3),
      new Float32Array(particleCount * 3),
    ];
  }, [particleCount]);

  // Track the current 3D mouse position in mesh local space
  const mousePos = useRef(new THREE.Vector3(999, 999, 999));

  // Sample points whenever the text or color changes
  useEffect(() => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    mesh.geometry.computeVertexNormals();

    const sampler = new MeshSurfaceSampler(mesh).build();
    const tempPosition = new THREE.Vector3();
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      sampler.sample(tempPosition);

      originalPositions[i * 3] = tempPosition.x;
      originalPositions[i * 3 + 1] = tempPosition.y;
      originalPositions[i * 3 + 2] = tempPosition.z;

      currentPositions[i * 3] = tempPosition.x;
      currentPositions[i * 3 + 1] = tempPosition.y;
      currentPositions[i * 3 + 2] = tempPosition.z;

      color.set(colorHex);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  }, [text, colorHex, originalPositions, currentPositions, colors]);

  // Physics loop (runs every frame)
  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttribute = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];
      const oz = originalPositions[idx + 2];

      let cx = currentPositions[idx];
      let cy = currentPositions[idx + 1];
      let cz = currentPositions[idx + 2];

      // Calculate distance to the local mouse position on the mesh
      const dx = cx - mousePos.current.x;
      const dy = cy - mousePos.current.y;
      const dz = cz - mousePos.current.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      const scatterRadius = 1.2;

      if (dist < scatterRadius) {
        // Push particle away from mouse in 3D
        const force = (scatterRadius - dist) / scatterRadius;
        cx += (dx / dist) * force * 0.15;
        cy += (dy / dist) * force * 0.15;
        cz += (dz / dist) * force * 0.15;
      } else {
        // Spring back to original position
        cx += (ox - cx) * 0.08;
        cy += (oy - cy) * 0.08;
        cz += (oz - cz) * 0.08;
      }

      currentPositions[idx] = cx;
      currentPositions[idx + 1] = cy;
      currentPositions[idx + 2] = cz;

      posAttribute.setXYZ(i, cx, cy, cz);
    }

    posAttribute.needsUpdate = true;
  });

  return (
    <group>
      <Center key={text}>
        <Text3D
          ref={meshRef}
          visible={false}
          font="/fonts/Satoshi_Variable_Bold.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          onPointerMove={(e) => {
            // Map world intersection point directly to local space coordinates
            const localPoint = e.point.clone();
            meshRef.current?.worldToLocal(localPoint);
            mousePos.current.copy(localPoint);
          }}
          onPointerOut={() => {
            // Move mouse tracking far away when cursor leaves the mesh
            mousePos.current.set(999, 999, 999);
          }}
        >
          {text}
        </Text3D>

        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[currentPositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.04}
            vertexColors
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </Center>
    </group>
  );
}

export default TextParticles;