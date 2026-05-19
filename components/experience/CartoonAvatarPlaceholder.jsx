import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useExperienceStore } from '@/store/useExperienceStore';

const SKIN = '#e8c4a0';
const SHIRT = '#2d2a24';
const PANTS = '#1a1a1a';
const HAIR = '#5d4037';

/** Cartoon dev at desk — placeholder until Mixamo Adam GLB is added */
export default function CartoonAvatarPlaceholder({ section }) {
  const headRef = useRef();
  const armRef = useRef();
  const t = useRef(0);
  const setIntroPlayed = useExperienceStore((s) => s.setIntroPlayed);
  const introPlayed = useExperienceStore((s) => s.introPlayed);

  useEffect(() => {
    const id = setTimeout(() => setIntroPlayed(true), 2200);
    return () => clearTimeout(id);
  }, [setIntroPlayed]);

  useFrame((_, delta) => {
    t.current += delta;
    if (!headRef.current || !armRef.current) return;

    if (section === 'contact') {
      headRef.current.rotation.x = 0.35;
      headRef.current.position.y = 1.38;
      armRef.current.rotation.z = 0.2;
      return;
    }

    if (section === 'hero' && !introPlayed) {
      armRef.current.rotation.z = -0.9 + Math.sin(t.current * 6) * 0.35;
      headRef.current.rotation.y = Math.PI + Math.sin(t.current * 3) * 0.12;
    } else {
      armRef.current.rotation.z = -0.15;
      headRef.current.rotation.y = Math.PI;
      headRef.current.rotation.x = 0;
      headRef.current.position.y = 1.42;
    }
  });

  const seated = section !== 'contact' && section !== 'about';
  const rootY = seated ? 0 : 0;
  const rootZ = seated ? 0.88 : 0;

  return (
    <group position={[0, rootY, rootZ]} rotation={[0, seated ? Math.PI : 0, 0]}>
      {/* Chair seat hint */}
      {seated && (
        <mesh position={[0, 0.42, 0.08]}>
          <boxGeometry args={[0.5, 0.06, 0.45]} />
          <meshStandardMaterial color="#e0e0e0" visible={false} />
        </mesh>
      )}

      {/* Legs */}
      <mesh position={[-0.12, 0.28, 0.15]} castShadow>
        <capsuleGeometry args={[0.09, 0.35, 6, 12]} />
        <meshStandardMaterial color={PANTS} />
      </mesh>
      <mesh position={[0.12, 0.28, 0.15]} castShadow>
        <capsuleGeometry args={[0.09, 0.35, 6, 12]} />
        <meshStandardMaterial color={PANTS} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.78, 0.05]} castShadow>
        <capsuleGeometry args={[0.2, 0.42, 8, 16]} />
        <meshStandardMaterial color={SHIRT} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 1.42, 0.05]}>
        <mesh castShadow>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshStandardMaterial color={SKIN} />
        </mesh>
        <mesh position={[0, 0.12, -0.08]} castShadow>
          <sphereGeometry args={[0.23, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={HAIR} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.07, 0.02, 0.18]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0.07, 0.02, 0.18]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      </group>

      {/* Waving / resting arm */}
      <group ref={armRef} position={[0.28, 0.88, 0.08]}>
        <mesh castShadow rotation={[0, 0, -0.4]}>
          <capsuleGeometry args={[0.06, 0.28, 6, 10]} />
          <meshStandardMaterial color={SHIRT} />
        </mesh>
      </group>

      {/* Other arm on desk */}
      <mesh position={[-0.3, 0.72, 0.2]} rotation={[0.6, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.06, 0.26, 6, 10]} />
        <meshStandardMaterial color={SHIRT} />
      </mesh>
    </group>
  );
}
