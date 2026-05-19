import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperienceStore } from '@/store/useExperienceStore';

function ScanPlatform({ scanProgress }) {
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.y += delta * 0.4;
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.5, 64]} />
        <meshStandardMaterial color="#0a1628" />
      </mesh>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[1.1, 1.25, 64]} />
        <meshBasicMaterial color="#4fc3f7" transparent opacity={0.8} />
      </mesh>
      <pointLight position={[0, 2, 0]} intensity={2} color="#4fc3f7" distance={6} />
      <mesh position={[0, scanProgress * 1.6, 0]}>
        <boxGeometry args={[2.2, 0.02, 0.02]} />
        <meshBasicMaterial color="#4fc3f7" />
      </mesh>
    </group>
  );
}

export default function LabScene({ visible }) {
  const scrollProgress = useExperienceStore((s) => s.scrollProgress);
  const scanProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - 0.35) / 0.2)
  );

  if (!visible) return null;

  return (
    <group visible={visible}>
      <color attach="background" args={['#0a1628']} />
      <fog attach="fog" args={['#0a1628', 8, 22]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[30, 30, 40, 40]} />
        <meshStandardMaterial
          color="#0d2137"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
      <ScanPlatform scanProgress={scanProgress} />
    </group>
  );
}
