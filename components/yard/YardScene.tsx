import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { CameraControls, Environment, Html, useGLTF } from '@react-three/drei';
import { ZONES, OVERVIEW_VIEW, getZone, type Selection, type ZoneId } from '../../lib/yardPresets';
import { House } from './House';
import { Neighborhood } from './Neighborhood';
import { ConfigurableYard, poolShape } from './Zones';
import { MODELS, SceneContext, type SceneState } from './materials';

/*
 * Photo-real sample property for the 3D Yard Studio.
 * Units are meters; +z points to the street and the house sits at the origin.
 * Materials and models are CC0 scans from Poly Haven (scripts/prepare-yard-assets.mjs).
 */

function CameraRig({ active }: { active: ZoneId | null }) {
  const ref = useRef<CameraControls>(null);
  const first = useRef(true);
  const aspect = useThree((s) => s.size.width / s.size.height);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const base = active ? getZone(active).view : OVERVIEW_VIEW;
    // Portrait screens see less sideways: pull the camera back along its view line.
    const k = aspect < 1 ? Math.min(1.9, 1 / aspect) * (active ? 0.85 : 1) : 1;
    const v = {
      target: base.target,
      position: base.position.map((p, i) => base.target[i] + (p - base.target[i]) * k) as [number, number, number],
    };
    if (first.current) {
      first.current = false;
      const p = v.position;
      c.setLookAt(p[0] * 1.6, p[1] * 1.9, p[2] * 1.6, ...v.target, false);
    }
    // Opening an area flies in close and low; leaving it rises back over the property.
    c.smoothTime = active ? 0.9 : 0.75;
    c.setLookAt(...v.position, ...v.target, true);
  }, [active, aspect]);
  return <CameraControls ref={ref} makeDefault minDistance={3} maxDistance={95} maxPolarAngle={Math.PI / 2.05} dollyToCursor />;
}

function Lights({ night, quality }: { night: boolean; quality: 'high' | 'low' }) {
  return (
    <>
      <Environment
        files={night ? '/yard/sky-dusk.hdr' : '/yard/sky.hdr'}
        background
        backgroundBlurriness={0.02}
        environmentIntensity={night ? 0.4 : 1.05}
        backgroundIntensity={night ? 0.7 : 1}
      />
      <fog attach="fog" args={[night ? '#2a2d3a' : '#c4d2dc', 90, 280]} />
      {night && <hemisphereLight args={['#5c6c96', '#1c1a14', 0.35]} />}
      {/* soft fill so faces turned away from the sun don't go muddy */}
      <directionalLight position={[30, 20, -40]} intensity={night ? 0.08 : 0.75} color={night ? '#8fa6d6' : '#dfe8f2'} />
      <directionalLight
        position={night ? [40, 14, -30] : [-28, 38, 22]}
        intensity={night ? 0.55 : 2.6}
        color={night ? '#ffb27a' : '#fff4e2'}
        castShadow
        shadow-mapSize={quality === 'high' ? [4096, 4096] : [1536, 1536]}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-far={160}
        shadow-bias={-0.0003}
        shadow-normalBias={0.04}
      />
    </>
  );
}

export interface YardSceneProps {
  selection: Selection;
  active: ZoneId | null;
  onSelect: (id: ZoneId | null) => void;
  quality: 'high' | 'low';
  night: boolean;
}

export const YardScene: React.FC<YardSceneProps> = ({ selection, active, onSelect, quality, night }) => {
  const ctx: SceneState = useMemo(
    () => ({ night, active, quality, onSelect: (id: ZoneId) => onSelect(id) }),
    [night, active, quality, onSelect]
  );
  const poolHole = poolShape(selection.poolDeck.layout);

  return (
    <SceneContext.Provider value={ctx}>
      <Lights night={night} quality={quality} />
      <group onPointerMissed={() => onSelect(null)}>
        <House />
        <Suspense fallback={null}>
          <ConfigurableYard selection={selection} />
        </Suspense>
        <Suspense fallback={null}>
          <Neighborhood poolHole={poolHole} />
        </Suspense>
        {!active &&
          ZONES.map((z) => (
            <Html key={z.id} position={z.pin} center zIndexRange={[20, 0]}>
              <button
                type="button"
                onClick={() => onSelect(z.id)}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-brand-dark/75 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-brand-gold hover:bg-brand-dark"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-gold opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-gold" />
                </span>
                {z.name}
              </button>
            </Html>
          ))}
      </group>
      <CameraRig active={active} />
    </SceneContext.Provider>
  );
};

Object.values(MODELS).forEach((u) => useGLTF.preload(u));
