import { create } from 'zustand';

export const SECTIONS = [
  'preloader',
  'hero',
  'transition',
  'about',
  'projects',
  'contact',
];

export const useExperienceStore = create((set) => ({
  section: 'preloader',
  scrollProgress: 0,
  loadProgress: 0,
  isReady: false,
  manifestReady: false,
  introPlayed: false,
  audioEnabled: false,
  mouse: { x: 0, y: 0 },
  assets: {
    office: false,
    avatar: false,
    contactRoom: false,
    contactProps: false,
  },

  setSection: (section) => set({ section }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setLoadProgress: (loadProgress) => set({ loadProgress }),
  setReady: (isReady) => set({ isReady }),
  setManifestReady: (manifestReady) => set({ manifestReady }),
  setIntroPlayed: (introPlayed) => set({ introPlayed }),
  setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
  setMouse: (mouse) => set({ mouse }),
  setAsset: (key, value) =>
    set((state) => ({
      assets: { ...state.assets, [key]: value },
    })),
}));
