/** Camera waypoints — position & lookAt per narrative beat */

export const CAMERA_WAYPOINTS = {
  hero: {
    position: [3.2, 2.1, 4.8],
    target: [0, 1.1, 0],
  },
  transition: {
    position: [1.5, 1.8, 6],
    target: [0, 1, 0],
  },
  about: {
    position: [0, 1.2, 4.2],
    target: [0, 0.85, 0],
  },
  projects: {
    position: [0, 2, 8],
    target: [0, 0, 0],
  },
  contact: {
    position: [2, 1.4, 5],
    target: [0, 0.6, 0],
  },
};

export const SCROLL_SECTION_OFFSETS = {
  hero: 0,
  transition: 0.22,
  about: 0.38,
  projects: 0.62,
  contact: 0.82,
};

export function getCameraState(progress) {
  const p = Math.max(0, Math.min(1, progress));
  const keys = ['hero', 'transition', 'about', 'projects', 'contact'];
  const stops = keys.map((k) => SCROLL_SECTION_OFFSETS[k]);

  let i = 0;
  while (i < stops.length - 1 && p > stops[i + 1]) i += 1;

  const fromKey = keys[i];
  const toKey = keys[Math.min(i + 1, keys.length - 1)];
  const from = stops[i];
  const to = stops[Math.min(i + 1, stops.length - 1)];
  const t = to === from ? 0 : (p - from) / (to - from);

  const a = CAMERA_WAYPOINTS[fromKey];
  const b = CAMERA_WAYPOINTS[toKey];

  return {
    position: [
      a.position[0] + (b.position[0] - a.position[0]) * t,
      a.position[1] + (b.position[1] - a.position[1]) * t,
      a.position[2] + (b.position[2] - a.position[2]) * t,
    ],
    target: [
      a.target[0] + (b.target[0] - a.target[0]) * t,
      a.target[1] + (b.target[1] - a.target[1]) * t,
      a.target[2] + (b.target[2] - a.target[2]) * t,
    ],
    section: p < stops[1] ? 'hero' : p < stops[2] ? 'transition' : p < stops[3] ? 'about' : p < stops[4] ? 'projects' : 'contact',
  };
}
