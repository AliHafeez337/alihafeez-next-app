import { useExperienceStore } from '@/store/useExperienceStore';
import CameraRig from './CameraRig';
import Avatar from './Avatar';
import OfficeScene from './scenes/OfficeScene';
import LabScene from './scenes/LabScene';
import ContactScene from './scenes/ContactScene';

export default function ExperienceRoot() {
  const section = useExperienceStore((s) => s.section);
  const scrollProgress = useExperienceStore((s) => s.scrollProgress);

  // Ranges must not overlap — lab wireframe floor was bleeding under the office rug
  const showContact = scrollProgress >= 0.78 || section === 'contact';
  const showLab =
    !showContact && scrollProgress >= 0.36 && scrollProgress < 0.68;
  const showOffice =
    !showContact && !showLab && scrollProgress < 0.36;

  const officeBg = showOffice;
  const labBg = showLab;

  return (
    <>
      {officeBg && <color attach="background" args={['#f5f0e8']} />}
      {labBg && !showContact && <color attach="background" args={['#0a1628']} />}
      {showContact && <color attach="background" args={['#f5f0e8']} />}

      <ambientLight intensity={officeBg ? 0.85 : 0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={officeBg ? 1.2 : 0.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {officeBg && (
        <pointLight position={[-2, 3, 2]} intensity={0.4} color="#fff5e6" />
      )}

      <OfficeScene visible={showOffice && !showContact} />
      <LabScene visible={showLab && !showContact} />
      <ContactScene visible={showContact} />

      {(showOffice || showLab) && !showContact && <Avatar />}
      {showContact && <Avatar />}

      <CameraRig />
    </>
  );
}
