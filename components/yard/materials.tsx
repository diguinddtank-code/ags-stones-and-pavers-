import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import { texUrl, type Finish, type ZoneId } from '../../lib/yardPresets';
import { offset, slab, type P } from './geo';

/* ---------------- scene-wide state ---------------- */

export interface SceneState {
  night: boolean;
  active: ZoneId | null;
  quality: 'high' | 'low';
  onSelect: (id: ZoneId) => void;
}
export const SceneContext = createContext<SceneState>({
  night: false,
  active: null,
  quality: 'high',
  onSelect: () => {},
});
export const useScene = () => useContext(SceneContext);

/* ---------------- PBR materials ---------------- */

/** Loads a Poly Haven PBR set and returns repeat-adjusted copies of its maps. */
export function usePBR(tex: string, repeat: [number, number]) {
  const [diff, nor, arm] = useTexture([texUrl(tex, 'diff'), texUrl(tex, 'nor'), texUrl(tex, 'arm')]);
  const [rx, ry] = repeat;
  return useMemo(() => {
    const prep = (t: THREE.Texture, srgb: boolean) => {
      const c = t.clone();
      c.wrapS = c.wrapT = THREE.RepeatWrapping;
      c.repeat.set(rx, ry);
      c.anisotropy = 8;
      c.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      c.needsUpdate = true;
      return c;
    };
    const ao = prep(arm, false);
    return { map: prep(diff, true), normalMap: prep(nor, false), aoMap: ao, roughnessMap: ao };
  }, [diff, nor, arm, rx, ry]);
}

type MatProps = { tex: string; repeat?: [number, number]; tile?: number } & Record<string, unknown>;

/** Standard material from a Poly Haven set. `tile` = meters per repeat on meter-UV geometry. */
export function PBR({ tex, repeat, tile, ...rest }: MatProps) {
  const r: [number, number] = repeat ?? [1 / (tile ?? 2), 1 / (tile ?? 2)];
  const maps = usePBR(tex, r);
  return <meshStandardMaterial {...maps} roughness={1} metalness={0} {...rest} />;
}

/* ---------------- models ---------------- */

export function Model({ url, ...props }: { url: string } & Record<string, unknown>) {
  const { scene } = useGLTF(url);
  const obj = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);
  return <primitive object={obj} {...props} />;
}

export const MODELS = {
  tree: '/yard/models/island_tree_02.glb',
  treeFar: '/yard/models/island_tree_02_far.glb',
  shrubA: '/yard/models/shrub_02.glb',
  shrubB: '/yard/models/shrub_04.glb',
  shrubC: '/yard/models/shrub_03.glb',
  fern: '/yard/models/fern_02.glb',
  dining: '/yard/models/outdoor_table_chair_set_01.glb',
  lounger: '/yard/models/mid_century_lounge_chair.glb',
  firePit: '/yard/models/stone_fire_pit.glb',
  planter: '/yard/models/planter_box_01.glb',
  pot: '/yard/models/potted_plant_04.glb',
  bench: '/yard/models/painted_wooden_bench.glb',
};

/* ---------------- interaction feedback ---------------- */

const GOLD = new THREE.Color('#d4af37');

export function ActiveOutline({ geometry, show }: { geometry: THREE.BufferGeometry; show: boolean }) {
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 35), [geometry]);
  const mat = useMemo(() => new THREE.LineBasicMaterial({ color: GOLD, transparent: true, depthTest: false }), []);
  useFrame((s) => {
    mat.opacity = show ? 0.55 + Math.sin(s.clock.elapsedTime * 4) * 0.35 : 0;
  });
  return <lineSegments geometry={edges} material={mat} renderOrder={5} />;
}

/** Brief light-up of a surface after its finish changes. */
export function useChangeFlash(key: string) {
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  const flash = useRef(0);
  useEffect(() => {
    flash.current = 1;
  }, [key]);
  useFrame((_, dt) => {
    flash.current = Math.max(0, flash.current - dt * 1.4);
    if (!ref.current) return;
    ref.current.emissive.set('#fff6e0');
    ref.current.emissiveIntensity = flash.current * 0.25;
  });
  return ref;
}

/** Click / hover handling for everything that belongs to an area. */
export function ZoneGroup({ id, children, ...rest }: { id: ZoneId; children: React.ReactNode } & Record<string, unknown>) {
  const { onSelect } = useScene();
  const [, setHover] = useState(false);
  return (
    <group
      {...rest}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = '';
      }}
    >
      {children}
    </group>
  );
}

/* ---------------- paving with a contrasting border ---------------- */

interface PavedProps {
  zone: ZoneId;
  outline: P[];
  holes?: P[][];
  finish: Finish;
  border?: { tex: string; width: number; tile?: number; color?: string };
  y?: number;
  thickness?: number;
}

/**
 * A paved area: the field in the chosen finish, framed by a soldier-course
 * style border band. Lies flat on the ground at height `y`.
 */
export function Paved({ zone, outline, holes = [], finish, border, y = 0, thickness = 0.08 }: PavedProps) {
  const { active } = useScene();
  const geos = useMemo(() => {
    if (!border) return { field: slab(outline, holes, thickness), band: null as THREE.ExtrudeGeometry | null, outer: slab(outline, holes, thickness) };
    const inner = offset(outline, -border.width);
    return {
      field: slab(inner, holes, thickness),
      band: slab(outline, [inner], thickness + 0.004),
      outer: slab(outline, holes, thickness),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outline, holes.length, holes[0], holes[1], border?.width ?? 0, thickness]);
  const flashRef = useChangeFlash(finish.id);

  return (
    <group rotation-x={-Math.PI / 2} position-y={y + 0.004}>
      <mesh geometry={geos.field} receiveShadow castShadow>
        <PBR ref={flashRef} tex={finish.tex} tile={finish.scale} color={finish.tint ?? '#ffffff'} />
      </mesh>
      {geos.band && border && (
        <mesh geometry={geos.band} receiveShadow castShadow>
          <PBR tex={border.tex} tile={border.tile ?? 1.6} color={border.color ?? '#ffffff'} />
        </mesh>
      )}
      <ActiveOutline geometry={geos.outer} show={active === zone} />
    </group>
  );
}

/* ---------------- lights that only exist at dusk ---------------- */

let glowTex: THREE.Texture | null = null;
function glowTexture() {
  if (glowTex) return glowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(255,214,150,0.9)');
  grd.addColorStop(0.35, 'rgba(255,190,110,0.35)');
  grd.addColorStop(1, 'rgba(255,170,90,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  glowTex = new THREE.CanvasTexture(c);
  glowTex.colorSpace = THREE.SRGBColorSpace;
  return glowTex;
}

/** Cheap fake light pool on the ground (no real light, no shader cost). */
export function GlowDisc({ position, radius = 1.2, opacity = 0.75 }: { position: [number, number, number]; radius?: number; opacity?: number }) {
  const { night } = useScene();
  if (!night) return null;
  return (
    <mesh position={position} rotation-x={-Math.PI / 2} renderOrder={2}>
      <planeGeometry args={[radius * 2, radius * 2]} />
      <meshBasicMaterial map={glowTexture()} transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </mesh>
  );
}

/**
 * Bulb that glows at dusk. Only pass `light` for the handful of fixtures that
 * should cast real light (each real light costs shader time on every pixel).
 */
export function NightLight({
  position,
  color = '#ffcf8a',
  intensity = 6,
  distance = 7,
  bulb = true,
  light = false,
}: {
  position: [number, number, number];
  color?: string;
  intensity?: number;
  distance?: number;
  bulb?: boolean;
  light?: boolean;
}) {
  const { night } = useScene();
  return (
    <group position={position}>
      {bulb && (
        <mesh>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshBasicMaterial color={night ? color : '#d8d2c4'} toneMapped={!night} />
        </mesh>
      )}
      {night && light && <pointLight color={color} intensity={intensity} distance={distance} decay={2} />}
    </group>
  );
}

/** Low bollard path light with a fake light pool. */
export function PathLight({ position }: { position: [number, number, number] }) {
  const { night } = useScene();
  return (
    <group position={position}>
      <mesh position-y={0.3} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.6, 10]} />
        <meshStandardMaterial color="#2b2b2b" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position-y={0.62}>
        <cylinderGeometry args={[0.11, 0.07, 0.08, 12]} />
        <meshStandardMaterial color="#2b2b2b" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position-y={0.56}>
        <cylinderGeometry args={[0.06, 0.06, 0.06, 10]} />
        <meshBasicMaterial color={night ? '#ffd9a0' : '#cfc7b8'} toneMapped={!night} />
      </mesh>
      <GlowDisc position={[0, 0.1, 0]} radius={1.1} />
    </group>
  );
}
