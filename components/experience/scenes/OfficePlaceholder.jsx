/** Stylized office diorama until `public/models/office.glb` is added */

function Screen({ position, color = '#1e88e5' }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.62, 0.42, 0.05]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0, 0, 0.028]}>
        <planeGeometry args={[0.54, 0.34]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

export default function OfficePlaceholder() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#e5ddd0" />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.8, -3.2]} receiveShadow>
        <boxGeometry args={[10, 5.6, 0.15]} />
        <meshStandardMaterial color="#f5f0e8" />
      </mesh>

      {/* Side wall */}
      <mesh position={[-4.5, 2.5, -1]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[6, 5, 0.12]} />
        <meshStandardMaterial color="#ede6da" />
      </mesh>

      {/* Window */}
      <mesh position={[2.8, 2.2, -3.05]}>
        <boxGeometry args={[2.2, 1.6, 0.08]} />
        <meshStandardMaterial color="#b3e5fc" emissive="#87ceeb" emissiveIntensity={0.2} />
      </mesh>

      {/* Corkboard */}
      <mesh position={[-1.2, 2.1, -3.05]} castShadow>
        <boxGeometry args={[1.6, 1.1, 0.06]} />
        <meshStandardMaterial color="#c4a574" />
      </mesh>
      <mesh position={[-1.35, 2.25, -2.98]}>
        <planeGeometry args={[0.5, 0.35]} />
        <meshStandardMaterial color="#e3f2fd" />
      </mesh>
      <mesh position={[-0.95, 2.05, -2.98]}>
        <planeGeometry args={[0.45, 0.3]} />
        <meshStandardMaterial color="#fff9c4" />
      </mesh>

      {/* Shelf */}
      <mesh position={[-3.2, 2.5, -2.5]} castShadow>
        <boxGeometry args={[0.9, 0.06, 0.35]} />
        <meshStandardMaterial color="#8d6e63" />
      </mesh>
      <mesh position={[-3.35, 2.72, -2.45]} castShadow>
        <boxGeometry args={[0.12, 0.28, 0.18]} />
        <meshStandardMaterial color="#ff8c42" />
      </mesh>
      <mesh position={[-3.05, 2.72, -2.45]} castShadow>
        <boxGeometry args={[0.1, 0.26, 0.16]} />
        <meshStandardMaterial color="#5c6bc0" />
      </mesh>

      {/* Desk */}
      <mesh position={[0, 0.72, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.09, 1.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-1.05, 0.38, 0.05]} castShadow>
        <boxGeometry args={[0.1, 0.76, 0.1]} />
        <meshStandardMaterial color="#c4a574" />
      </mesh>
      <mesh position={[1.05, 0.38, 0.05]} castShadow>
        <boxGeometry args={[0.1, 0.76, 0.1]} />
        <meshStandardMaterial color="#c4a574" />
      </mesh>

      <Screen position={[-0.42, 1.08, -0.02]} color="#7e57c2" />
      <Screen position={[0.42, 1.08, -0.02]} color="#26a69a" />

      {/* Keyboard / mouse */}
      <mesh position={[0, 0.78, 0.35]} castShadow>
        <boxGeometry args={[0.55, 0.03, 0.2]} />
        <meshStandardMaterial color="#ddd" />
      </mesh>
      <mesh position={[0.5, 0.77, 0.42]} castShadow>
        <boxGeometry args={[0.1, 0.04, 0.14]} />
        <meshStandardMaterial color="#bbb" />
      </mesh>

      {/* Chair */}
      <mesh position={[0, 0.42, 0.95]} castShadow>
        <boxGeometry args={[0.55, 0.08, 0.55]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[0, 0.75, 1.18]} castShadow>
        <boxGeometry args={[0.5, 0.55, 0.08]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.45]}>
        <planeGeometry args={[2.8, 2]} />
        <meshStandardMaterial color="#ffb74d" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0.45]}>
        <planeGeometry args={[2.2, 1.5]} />
        <meshStandardMaterial color="#ffa726" />
      </mesh>

      {/* Plant */}
      <mesh position={[2.2, 0.35, 0.6]} castShadow>
        <cylinderGeometry args={[0.2, 0.24, 0.45, 12]} />
        <meshStandardMaterial color="#eceff1" />
      </mesh>
      <mesh position={[2.2, 1.05, 0.6]} castShadow>
        <sphereGeometry args={[0.42, 12, 12]} />
        <meshStandardMaterial color="#66bb6a" />
      </mesh>

      {/* Penguin desk buddy */}
      <mesh position={[-1.05, 0.82, 0.25]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </group>
  );
}
