/** Parcels, envelopes, CD, cassette — until contact-props.glb is added */

const BOXES = [
  { pos: [-1.1, 0.14, 0.5], size: [0.45, 0.28, 0.38], rot: 0.1 },
  { pos: [0.15, 0.1, 0.75], size: [0.5, 0.32, 0.4], rot: -0.15 },
  { pos: [1, 0.12, 0.35], size: [0.4, 0.26, 0.35], rot: 0.05 },
];

export default function ContactPropsPlaceholder() {
  return (
    <group>
      {BOXES.map((b, i) => (
        <mesh
          key={i}
          position={b.pos}
          rotation={[0, b.rot, 0]}
          castShadow
        >
          <boxGeometry args={b.size} />
          <meshStandardMaterial color="#c49a6c" />
        </mesh>
      ))}
      {/* Envelope */}
      <mesh position={[0.55, 0.04, 0.55]} rotation={[-Math.PI / 2, 0, 0.3]}>
        <planeGeometry args={[0.28, 0.2]} />
        <meshStandardMaterial color="#f8f4ec" side={2} />
      </mesh>
      {/* CD */}
      <mesh position={[-0.4, 0.02, 0.85]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.015, 32]} />
        <meshStandardMaterial color="#90caf9" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Cassette */}
      <mesh position={[0.85, 0.08, 0.9]} castShadow>
        <boxGeometry args={[0.22, 0.08, 0.14]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}
