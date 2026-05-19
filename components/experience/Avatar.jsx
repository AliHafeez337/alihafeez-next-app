import { Suspense, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useExperienceStore } from '@/store/useExperienceStore';
import CartoonAvatarPlaceholder from './CartoonAvatarPlaceholder';

const ANIM = {
  wave: ['wave', 'waving', 'Wave', 'Waving'],
  idle: ['idle', 'Idle', 'standing', 'Standing Idle'],
  sit: ['sit', 'sitting', 'Sitting', 'Typing'],
  stand: ['stand', 'standing up', 'Standing Up'],
  walk: ['walk', 'walking', 'Walking'],
  sleep: ['sleep', 'sleeping', 'Sleeping', 'Sleep'],
  wake: ['wake', 'getting up', 'Getting Up', 'Stand Up'],
};

function findClip(names, clips) {
  if (!clips?.length) return null;
  for (const n of names) {
    const hit = clips.find(
      (c) =>
        c.name.toLowerCase() === n.toLowerCase() ||
        c.name.toLowerCase().includes(n.toLowerCase())
    );
    if (hit) return hit;
  }
  return clips[0];
}

function AvatarModel({ section, introPlayed, setIntroPlayed }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/avatar.glb');
  const { actions, mixer } = useAnimations(animations, group);
  const actionRef = useRef(null);

  useEffect(() => {
    if (!introPlayed && actions) {
      const wave = findClip(ANIM.wave, animations);
      const idle = findClip(ANIM.idle, animations) || findClip(ANIM.sit, animations);
      if (wave) {
        const a = actions[wave.name];
        a.reset().setLoop(THREE.LoopOnce, 1).play();
        a.clampWhenFinished = true;
        const onDone = () => {
          mixer.removeEventListener('finished', onDone);
          if (idle) actions[idle.name]?.reset().fadeIn(0.3).play();
          setIntroPlayed(true);
        };
        mixer.addEventListener('finished', onDone);
      } else if (idle) {
        actions[idle.name]?.reset().play();
        setIntroPlayed(true);
      }
    }
  }, [actions, animations, introPlayed, mixer, setIntroPlayed]);

  useEffect(() => {
    if (!introPlayed || !actions) return undefined;

    let clipNames = ANIM.idle;
    if (section === 'transition') clipNames = [...ANIM.stand, ...ANIM.walk];
    else if (section === 'about') clipNames = ANIM.idle;
    else if (section === 'contact') clipNames = ANIM.sleep;

    const clip = findClip(clipNames, animations);
    if (!clip) return undefined;

    const next = actions[clip.name];
    if (!next || actionRef.current === next) return undefined;

    actionRef.current?.fadeOut(0.3);
    next.reset().fadeIn(0.3).play();
    actionRef.current = next;

    return () => next?.fadeOut(0.2);
  }, [section, introPlayed, actions, animations]);

  return (
    <group ref={group} position={[0, 0, 0.75]} rotation={[0, Math.PI, 0]}>
      <primitive object={scene} scale={1} />
    </group>
  );
}

export default function Avatar() {
  const section = useExperienceStore((s) => s.section);
  const introPlayed = useExperienceStore((s) => s.introPlayed);
  const setIntroPlayed = useExperienceStore((s) => s.setIntroPlayed);
  const hasAvatar = useExperienceStore((s) => s.assets.avatar);
  const manifestReady = useExperienceStore((s) => s.manifestReady);

  if (!manifestReady) {
    return <CartoonAvatarPlaceholder section={section} />;
  }

  if (hasAvatar) {
    return (
      <Suspense fallback={<CartoonAvatarPlaceholder section={section} />}>
        <AvatarModel
          section={section}
          introPlayed={introPlayed}
          setIntroPlayed={setIntroPlayed}
        />
      </Suspense>
    );
  }

  return <CartoonAvatarPlaceholder section={section} />;
}
