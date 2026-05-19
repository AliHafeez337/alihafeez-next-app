import { useEffect } from 'react';
import { useExperienceStore } from '@/store/useExperienceStore';

/**
 * Detects which GLBs exist via server filesystem — no HEAD requests to missing .glb URLs.
 */
export function useModelsManifest() {
  const setAsset = useExperienceStore((s) => s.setAsset);
  const setManifestReady = useExperienceStore((s) => s.setManifestReady);
  const manifestReady = useExperienceStore((s) => s.manifestReady);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/models-manifest')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setAsset('avatar', Boolean(data.avatar));
        setAsset('office', Boolean(data.office));
        setAsset('contactProps', Boolean(data.contactProps));
        setAsset('contactRoom', Boolean(data.contactRoom));
        setManifestReady(true);
      })
      .catch(() => {
        if (!cancelled) setManifestReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [setAsset, setManifestReady]);

  return manifestReady;
}
