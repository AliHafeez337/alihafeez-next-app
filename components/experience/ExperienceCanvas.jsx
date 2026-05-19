import { Canvas } from '@react-three/fiber';
import ExperienceRoot from './ExperienceRoot';

export default function ExperienceCanvas() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ fov: 38, position: [3.2, 2.1, 4.8], near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <ExperienceRoot />
    </Canvas>
  );
}
