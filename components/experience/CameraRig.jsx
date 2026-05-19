import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperienceStore } from '@/store/useExperienceStore';
import { getCameraState } from '@/lib/three/waypoints';

const PARALLAX = 0.35;
const SMOOTH = 0.08;

export default function CameraRig() {
  const { camera } = useThree();
  const scrollProgress = useExperienceStore((s) => s.scrollProgress);
  const mouse = useExperienceStore((s) => s.mouse);
  const lookAt = useRef(new THREE.Vector3());
  const goalPos = useRef(new THREE.Vector3());

  useFrame(() => {
    const { position, target } = getCameraState(scrollProgress);
    const px = mouse.x * PARALLAX;
    const py = mouse.y * PARALLAX * 0.5;

    goalPos.current.set(position[0] + px, position[1] + py, position[2]);
    lookAt.current.set(target[0], target[1], target[2]);

    camera.position.lerp(goalPos.current, SMOOTH);
    camera.lookAt(lookAt.current);
  });

  return null;
}
