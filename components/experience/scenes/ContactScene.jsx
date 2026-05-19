import { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { useExperienceStore } from '@/store/useExperienceStore';
import ContactPropsPlaceholder from './ContactPropsPlaceholder';

function ContactPropsModel() {
  const { scene } = useGLTF('/models/contact-props.glb');
  return <primitive object={scene.clone()} scale={0.5} />;
}

function ContactRoomModel() {
  const { scene } = useGLTF('/models/contact-room.glb');
  return <primitive object={scene.clone()} />;
}

export default function ContactScene({ visible }) {
  const hasProps = useExperienceStore((s) => s.assets.contactProps);
  const hasRoom = useExperienceStore((s) => s.assets.contactRoom);
  const manifestReady = useExperienceStore((s) => s.manifestReady);

  if (!visible) return null;

  return (
    <group visible={visible}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#f5f0e8" />
      </mesh>
      {manifestReady && hasRoom && (
        <Suspense fallback={null}>
          <ContactRoomModel />
        </Suspense>
      )}
      {manifestReady && hasProps ? (
        <Suspense fallback={<ContactPropsPlaceholder />}>
          <ContactPropsModel />
        </Suspense>
      ) : (
        <ContactPropsPlaceholder />
      )}
    </group>
  );
}
