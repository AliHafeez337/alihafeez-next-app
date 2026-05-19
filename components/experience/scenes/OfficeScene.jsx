import { Suspense } from 'react';
import { Center, useGLTF } from '@react-three/drei';
import { useExperienceStore } from '@/store/useExperienceStore';
import OfficePlaceholder from './OfficePlaceholder';

function OfficeModel() {
  const { scene } = useGLTF('/models/office.glb');
  return (
    <Center top>
      <primitive object={scene.clone()} />
    </Center>
  );
}

export default function OfficeScene({ visible }) {
  const hasOffice = useExperienceStore((s) => s.assets.office);
  const manifestReady = useExperienceStore((s) => s.manifestReady);

  if (!visible) return null;

  if (!manifestReady || !hasOffice) {
    return (
      <group visible={visible}>
        <OfficePlaceholder />
      </group>
    );
  }

  return (
    <group visible={visible}>
      <Suspense fallback={<OfficePlaceholder />}>
        <OfficeModel />
      </Suspense>
    </group>
  );
}
