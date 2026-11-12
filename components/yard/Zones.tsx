import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { findFinish, type Finish, type Selection } from '../../lib/yardPresets';
import {
  arcPts, circle, curvePts, flat, offset, rect, ribbon, sector, smooth, wallGeo, type P,
} from './geo';
import { ActiveOutline, GlowDisc, MODELS, Model, NightLight, PBR, PathLight, Paved, ZoneGroup, useChangeFlash, useScene } from './materials';

/* =====================================================================
   Shared building blocks
   ===================================================================== */

const CAP = { tex: 'brushed_concrete_03', color: '#efe9de' };

/** Vertical masonry from a plan footprint (seat walls, retaining walls, risers). */
function Masonry({
  footprint,
  height,
  finish,
  y = 0,
  cap = 0.08,
  capGrow = 0.06,
  outline = false,
}: {
  footprint: P[];
  height: number;
  finish: Pick<Finish, 'tex' | 'scale' | 'id'>;
  y?: number;
  cap?: number;
  capGrow?: number;
  outline?: boolean;
}) {
  const { active } = useScene();
  const body = useMemo(() => wallGeo(footprint, height), [footprint, height]);
  const capGeo = useMemo(() => (cap ? wallGeo(offset(footprint, capGrow), cap) : null), [footprint, cap, capGrow]);
  const flash = useChangeFlash(finish.id);
  return (
    <group rotation-x={-Math.PI / 2} position-y={y}>
      <mesh geometry={body} castShadow receiveShadow>
        <PBR ref={flash} tex={finish.tex} tile={finish.scale} />
      </mesh>
      {capGeo && (
        <mesh geometry={capGeo} position-z={height} castShadow receiveShadow>
          <PBR tex={CAP.tex} tile={1.2} color={CAP.color} />
        </mesh>
      )}
      {outline && <ActiveOutline geometry={body} show={active === 'wall'} />}
    </group>
  );
}

/** Raised solid with a lawn top (upper terrace, planting beds). */
function Plinth({ outline, height, tex = 'leafy_grass', tile = 4.5, color = '#a4c487' }: { outline: P[]; height: number; tex?: string; tile?: number; color?: string }) {
  const geo = useMemo(() => wallGeo(outline, height), [outline, height]);
  return (
    <mesh geometry={geo} rotation-x={-Math.PI / 2} receiveShadow castShadow>
      <PBR tex={tex} tile={tile} color={color} />
    </mesh>
  );
}

function Bed({ outline, y = 0.012 }: { outline: P[]; y?: number }) {
  const geo = useMemo(() => flat(outline), [outline]);
  return (
    <mesh geometry={geo} rotation-x={-Math.PI / 2} position-y={y} receiveShadow>
      <PBR tex="yellow_flower_mulch" tile={2} color="#9a8a78" />
    </mesh>
  );
}

function Flame({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const { night } = useScene();
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (ref.current) ref.current.scale.y = scale * (1 + Math.sin(t * 9) * 0.15 + Math.sin(t * 13.7) * 0.08);
    if (light.current) light.current.intensity = (night ? 14 : 4) + Math.sin(t * 11) * 2;
  });
  return (
    <group position={position}>
      <group ref={ref} scale={[scale, scale, scale]}>
        {[[0, 0, 0.16, 0.55], [0.12, 0.06, 0.1, 0.4], [-0.1, -0.05, 0.11, 0.42], [0.02, -0.12, 0.09, 0.34]].map(([x, z, r, h], i) => (
          <mesh key={i} position={[x, h / 2, z]}>
            <coneGeometry args={[r, h, 8, 1, true]} />
            <meshBasicMaterial
              color={i ? '#ff8a2a' : '#ffc46b'}
              transparent
              opacity={0.55}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
      <GlowDisc position={[0, 0.02, 0]} radius={night ? 4 : 1.4} opacity={night ? 0.6 : 0.25} />
      <pointLight ref={light} position-y={0.9} color="#ff9a40" distance={night ? 14 : 6} decay={2} />
    </group>
  );
}

/* =====================================================================
   Driveway  (garage front z = 6.2, x -12.4 .. -5.2; sidewalk at z = 19.5)
   ===================================================================== */

const PILLARS: Record<string, number[]> = { straight: [-15, -2.4], curved: [-13.9, 1.2], motorCourt: [-12.4, -2.2] };
const DW_BORDER = { tex: 'cobblestone_square', width: 0.42, tile: 1.4, color: '#7a7a7a' };

const DRIVE = {
  straight: [
    [-12.4, 6.2], [-5.2, 6.2], [-5.2, 17.4], [-4.7, 18.8], [-3.6, 19.5],
    [-14, 19.5], [-12.9, 18.8], [-12.4, 17.4],
  ] as P[],
  // 7.2 m at the garage, flaring to a wide apron at the sidewalk
  curved: ribbon(
    curvePts([[-8.8, 6.2], [-8.8, 8.4], [-8.2, 11.4], [-5.8, 15], [-4.8, 17.8], [-4.7, 19.5]], 70),
    (t) => 7.2 + Math.pow(Math.max(0, (t - 0.72) / 0.28), 2.2) * 4.2
  ),
  court: circle(-7.4, 13.4, 6.3, 96),
  courtIsland: circle(-7.4, 13.4, 2.3, 64),
  courtNeck: rect(-12.4, 6.2, -5.2, 9),
  courtExit: [[-10.5, 17.6], [-4.3, 17.6], [-3.4, 19.5], [-11.4, 19.5]] as P[],
  islandCurb: ribbon(arcPts(-7.4, 13.4, 2.15, 0, Math.PI * 2, 64), 0.3),
};
const ISLAND_STONE = { id: 'island', tex: 'stone_wall_04', scale: 2 };

function Driveway({ layout, finish }: { layout: string; finish: Finish }) {
  const { active } = useScene();
  const detailed = active === 'driveway';
  return (
    <ZoneGroup id="driveway">
      {layout === 'straight' && <Paved zone="driveway" outline={DRIVE.straight} finish={finish} border={DW_BORDER} />}
      {layout === 'curved' && (
        <>
          <Paved zone="driveway" outline={DRIVE.curved} finish={finish} border={DW_BORDER} />
          <Bed outline={smooth([[-13.6, 9], [-12.6, 13], [-10.8, 17.4], [-12.6, 17.6], [-15, 13], [-15.2, 9.5]], true, 48)} />
          {[[-13.5, 11.5, 1.3], [-12.6, 14.6, 1.5], [-13.9, 16.3, 1.2]].map(([x, z, s]) => (
            <Model key={`${x}${z}`} url={MODELS.shrubB} position={[x, 0, z]} scale={s} rotation-y={x} />
          ))}
        </>
      )}
      {layout === 'motorCourt' && (
        <>
          <Paved zone="driveway" outline={DRIVE.court} holes={[DRIVE.courtIsland]} finish={finish} border={DW_BORDER} />
          <Paved zone="driveway" outline={DRIVE.courtNeck} finish={finish} y={0.003} />
          <Paved zone="driveway" outline={DRIVE.courtExit} finish={finish} y={0.003} />
          {/* planted island with a specimen planter */}
          <Masonry footprint={DRIVE.islandCurb} height={0.35} finish={ISLAND_STONE} cap={0.06} />
          <Bed outline={circle(-7.4, 13.4, 2.0)} y={0.3} />
          <Model url={MODELS.planter} position={[-7.4, 0.32, 13.4]} scale={1.3} />
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i / 5) * Math.PI * 2;
            return <Model key={i} url={MODELS.shrubC} position={[-7.4 + Math.cos(a) * 1.4, 0.32, 13.4 + Math.sin(a) * 1.4]} scale={1.1} rotation-y={a} />;
          })}
        </>
      )}
      {/* entry pillars + mailbox */}
      {(PILLARS[layout] ?? PILLARS.straight).map((x) => (
        <group key={x} position={[x, 0, 19]}>
          <mesh position-y={0.55} castShadow>
            <boxGeometry args={[0.6, 1.1, 0.6]} />
            <PBR tex="stone_wall_04" repeat={[0.3, 0.5]} />
          </mesh>
          <mesh position-y={1.14} castShadow>
            <boxGeometry args={[0.75, 0.08, 0.75]} />
            <PBR tex={CAP.tex} repeat={[0.4, 0.4]} color={CAP.color} />
          </mesh>
          <NightLight position={[0, 1.3, 0]} />
          <GlowDisc position={[0, 0.05, 0]} radius={1.4} opacity={0.5} />
        </group>
      ))}
      {detailed && (
        <>
          <Model url={MODELS.planter} position={[-13, 0, 6.9]} scale={0.9} />
          <Model url={MODELS.planter} position={[-4.6, 0, 6.9]} scale={0.9} />
          <Model url={MODELS.pot} position={[-12.9, 0, 5.5]} scale={1.2} />
          <Model url={MODELS.pot} position={[-4.7, 0, 5.5]} scale={1.2} />
        </>
      )}
    </ZoneGroup>
  );
}

/* =====================================================================
   Front walkway (porch step at z = 7.6, x = 3; sidewalk at z = 19.5)
   ===================================================================== */

const WALK_CURVE = curvePts([[3, 7.5], [3.2, 9.4], [5.6, 12.2], [6.6, 15.2], [5.2, 18.2], [4.7, 19.6]], 70);
const WALK = {
  curved: ribbon(WALK_CURVE, 1.7),
  straight: rect(2.1, 7.5, 3.9, 19.5),
  landing: smooth([[0.6, 7.5], [5.4, 7.5], [5.6, 8.6], [4.4, 9.6], [1.6, 9.6], [0.4, 8.6]], true, 40),
  stones: WALK_CURVE.filter((_, i) => i % 7 === 3).map((c, i) => {
    const r = 0.5 + ((i * 37) % 10) / 60;
    return smooth(
      Array.from({ length: 7 }, (_, k) => {
        const a = (k / 7) * Math.PI * 2;
        const j = 0.8 + (((i + 3) * (k + 5) * 13) % 10) / 40;
        return [c[0] + Math.cos(a) * r * 1.25 * j, c[1] + Math.sin(a) * r * j] as P;
      }),
      true,
      28
    );
  }),
};

function Walkway({ layout, finish }: { layout: string; finish: Finish }) {
  const lights: [number, number][] =
    layout === 'straight'
      ? [[1.5, 11], [4.5, 13.5], [1.5, 16], [4.5, 18.5]]
      : WALK_CURVE.filter((_, i) => i % 16 === 8).map((p, i) => [p[0] + (i % 2 ? 1.3 : -1.3), p[1]] as [number, number]);
  return (
    <ZoneGroup id="walkway">
      {layout === 'curved' && <Paved zone="walkway" outline={WALK.curved} finish={finish} />}
      {layout === 'straight' && (
        <>
          <Paved zone="walkway" outline={WALK.straight} finish={finish} border={{ tex: 'red_brick_pavers', width: 0.22, tile: 1.4 }} />
          <Paved zone="walkway" outline={WALK.landing} finish={finish} y={0.004} />
        </>
      )}
      {layout === 'stepping' && WALK.stones.map((s, i) => <Paved key={i} zone="walkway" outline={s} finish={finish} thickness={0.06} />)}
      {lights.map(([x, z]) => (
        <PathLight key={`${x}${z}`} position={[x, 0, z]} />
      ))}
      {/* foundation bed along the front of the house */}
      <Bed outline={smooth([[-4.6, 5.2], [0.2, 5.2], [0.2, 6.6], [-1.6, 7.6], [-4.6, 7.2]], true, 40)} />
      <Bed outline={smooth([[5.8, 5.2], [8.2, 5.2], [8.6, 7.4], [6.4, 8], [5.8, 7.2]], true, 40)} />
      {[[-3.8, 6.2, 'A', 1.4], [-1.5, 6.4, 'C', 1.2], [7.2, 6.3, 'A', 1.5], [6.5, 7.2, 'C', 1.1]].map(([x, z, w, s]) => (
        <Model key={`${x}${z}`} url={w === 'A' ? MODELS.shrubA : MODELS.shrubC} position={[x as number, 0, z as number]} scale={s as number} rotation-y={x as number} />
      ))}
      {[[0.9, 7.2], [5.1, 7.2]].map(([x, z]) => (
        <Model key={x} url={MODELS.pot} position={[x, 0.24, z]} scale={1.1} />
      ))}
    </ZoneGroup>
  );
}

/* =====================================================================
   Back patio (house back wall z = -5, x -5 .. 8)
   ===================================================================== */

const PATIO_C: P = [1.5, -5];
const PATIO_R = 7.6;
const PATIO = {
  arc: arcPts(PATIO_C[0], PATIO_C[1], PATIO_R, 0, -Math.PI, 72),
  riser: ribbon(arcPts(PATIO_C[0], PATIO_C[1], PATIO_R + 0.08, -0.02, -Math.PI + 0.02, 72), 0.16),
  seatL: sector(PATIO_C[0], PATIO_C[1], PATIO_R - 1.25, PATIO_R - 0.9, -Math.PI + 0.25, -Math.PI / 2 - 0.42, 30),
  seatR: sector(PATIO_C[0], PATIO_C[1], PATIO_R - 1.25, PATIO_R - 0.9, -Math.PI / 2 + 0.42, -0.25, 30),
  step1: sector(PATIO_C[0], PATIO_C[1], PATIO_R, PATIO_R + 0.45, -Math.PI / 2 - 0.3, -Math.PI / 2 + 0.3, 24),
  step2: sector(PATIO_C[0], PATIO_C[1], PATIO_R + 0.45, PATIO_R + 0.9, -Math.PI / 2 - 0.34, -Math.PI / 2 + 0.34, 24),
  pergola: smooth([[-5.6, -5], [9, -5], [9.3, -11], [7.5, -13.6], [-4, -13.6], [-5.9, -11.5]], true, 60),
  deck: rect(-4.6, -11, 7.4, -5),
  landing: [...arcPts(1.4, -11, 3.4, 0, -Math.PI, 40)] as P[],
};
const STONE = { id: 'veneer', tex: 'stacked_stone_wall', scale: 1.8 };

function PatioFurniture({ y }: { y: number }) {
  const { active } = useScene();
  return (
    <>
      <Model url={MODELS.dining} position={[1.5, y, -8.8]} scale={1.05} />
      <Model url={MODELS.pot} position={[-4.3, y, -5.8]} scale={1.3} />
      <Model url={MODELS.pot} position={[7.5, y, -5.8]} scale={1.3} />
      {active === 'patio' && (
        <>
          <Model url={MODELS.planter} position={[-3.2, y, -7.4]} scale={1} rotation-y={0.5} />
          <Model url={MODELS.planter} position={[6.4, y, -7.4]} scale={1} rotation-y={-0.5} />
        </>
      )}
    </>
  );
}

function Pergola() {
  const posts: [number, number][] = [[-3.8, -6.2], [6.8, -6.2], [-3.8, -12], [6.8, -12]];
  return (
    <group>
      {posts.map(([x, z]) => (
        <group key={`${x}${z}`} position={[x, 0, z]}>
          <mesh position-y={0.3} castShadow>
            <boxGeometry args={[0.55, 0.6, 0.55]} />
            <PBR tex="stacked_stone_wall" repeat={[0.3, 0.3]} />
          </mesh>
          <mesh position-y={1.75} castShadow>
            <boxGeometry args={[0.24, 2.4, 0.24]} />
            <PBR tex="dark_wooden_planks" repeat={[0.2, 1]} />
          </mesh>
        </group>
      ))}
      {[-6.2, -12].map((z) => (
        <mesh key={z} position={[1.5, 3.05, z]} castShadow>
          <boxGeometry args={[12.2, 0.28, 0.16]} />
          <PBR tex="dark_wooden_planks" repeat={[4, 0.2]} />
        </mesh>
      ))}
      {Array.from({ length: 15 }, (_, i) => -4.4 + i * 0.85).map((x) => (
        <mesh key={x} position={[x, 3.28, -9.1]} castShadow>
          <boxGeometry args={[0.1, 0.2, 7.2]} />
          <PBR tex="dark_wooden_planks" repeat={[0.1, 2]} />
        </mesh>
      ))}
      {/* string lights */}
      {Array.from({ length: 9 }, (_, i) => i).map((i) => (
        <NightLight key={i} position={[-3.4 + i * 1.25, 2.85 - Math.sin((i / 8) * Math.PI) * 0.25, -9.1]} intensity={9} distance={10} light={i === 4} />
      ))}
    </group>
  );
}

function Deck() {
  const [x0, z1, x1, z0] = [-4.6, -11, 7.4, -5];
  const H = 0.9;
  const railPosts = useMemo(() => {
    const out: [number, number][] = [];
    for (let x = x0; x <= x1 + 0.01; x += 1.5) {
      if (x < 0.2 || x > 2.6) out.push([x, z1]);
    }
    for (let z = z0 - 1.5; z >= z1; z -= 1.5) out.push([x0, z], [x1, z]);
    return out;
  }, [x0, x1, z0, z1]);
  return (
    <group>
      <mesh position={[(x0 + x1) / 2, H / 2, (z0 + z1) / 2]} castShadow receiveShadow>
        <boxGeometry args={[x1 - x0, H, z0 - z1]} />
        <PBR tex="dark_wooden_planks" repeat={[6, 0.6]} />
      </mesh>
      <mesh position={[(x0 + x1) / 2, H + 0.03, (z0 + z1) / 2]} receiveShadow castShadow>
        <boxGeometry args={[x1 - x0 + 0.2, 0.06, z0 - z1 + 0.1]} />
        <PBR tex="wood_floor_deck" repeat={[(x1 - x0) / 2, (z0 - z1) / 2]} />
      </mesh>
      {railPosts.map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, H + 0.5, z]} castShadow>
          <boxGeometry args={[0.12, 1, 0.12]} />
          <meshStandardMaterial color="#f2efe8" />
        </mesh>
      ))}
      {(
        [
          [(x0 + 0.2) / 2, z1, 0.2 - x0, 0],
          [(2.6 + x1) / 2, z1, x1 - 2.6, 0],
          [x0, (z0 + z1) / 2, z0 - z1, Math.PI / 2],
          [x1, (z0 + z1) / 2, z0 - z1, Math.PI / 2],
        ] as [number, number, number, number][]
      ).map(([x, z, len, r]) => (
        <mesh key={`${x}${z}`} position={[x, H + 1, z]} rotation-y={r} castShadow>
          <boxGeometry args={[len, 0.08, 0.16]} />
          <meshStandardMaterial color="#f2efe8" />
        </mesh>
      ))}
      {/* stairs down to the landing */}
      {[0, 1, 2].map((i) => {
        const top = H + 0.06 - (i + 1) * 0.22;
        return (
          <mesh key={i} position={[1.4, top / 2, z1 - 0.17 - i * 0.34]} castShadow receiveShadow>
            <boxGeometry args={[2.4, top, 0.34]} />
            <PBR tex="wood_floor_deck" repeat={[1.2, 0.3]} />
          </mesh>
        );
      })}
    </group>
  );
}

function Patio({ layout, finish }: { layout: string; finish: Finish }) {
  return (
    <ZoneGroup id="patio">
      {layout === 'curvedTerrace' && (
        <>
          <Paved zone="patio" outline={PATIO.arc} finish={finish} y={0.37} border={{ tex: CAP.tex, width: 0.35, tile: 1.2, color: CAP.color }} />
          <Masonry footprint={PATIO.riser} height={0.45} finish={STONE} cap={0} />
          <Masonry footprint={PATIO.seatL} height={0.5} finish={STONE} y={0.45} />
          <Masonry footprint={PATIO.seatR} height={0.5} finish={STONE} y={0.45} />
          <Paved zone="patio" outline={PATIO.step1} finish={finish} y={0.22} thickness={0.08} border={{ tex: CAP.tex, width: 0.12, tile: 1.2, color: CAP.color }} />
          <Paved zone="patio" outline={PATIO.step2} finish={finish} y={0.07} thickness={0.08} border={{ tex: CAP.tex, width: 0.12, tile: 1.2, color: CAP.color }} />
          <PatioFurniture y={0.45} />
          <GlowDisc position={[PATIO_C[0] - 1.6, 0.04, -13.3]} radius={1} />
          <GlowDisc position={[PATIO_C[0] + 1.6, 0.04, -13.3]} radius={1} />
        </>
      )}
      {layout === 'pergola' && (
        <>
          <Paved zone="patio" outline={PATIO.pergola} finish={finish} border={{ tex: CAP.tex, width: 0.4, tile: 1.2, color: CAP.color }} />
          <Pergola />
          <PatioFurniture y={0.08} />
          <Model url={MODELS.bench} position={[-2.2, 0.08, -12.6]} />
        </>
      )}
      {layout === 'deck' && (
        <>
          <Deck />
          <Paved zone="patio" outline={PATIO.landing} finish={finish} border={{ tex: CAP.tex, width: 0.3, tile: 1.2, color: CAP.color }} />
          <PatioFurniture y={0.93} />
          <Model url={MODELS.bench} position={[1.4, 0.08, -13.6]} rotation-y={Math.PI} />
        </>
      )}
    </ZoneGroup>
  );
}

/* =====================================================================
   Pool deck (pool centred around x = 8, z = -18.4)
   ===================================================================== */

const POOL_SHAPES: Record<string, P[]> = {
  freeform: smooth(
    [[4, -17.2], [6.2, -15.9], [9.4, -16.6], [12.3, -15.8], [13.4, -17.9], [12, -20.3], [8.6, -20.4], [5.6, -21], [3.8, -19.6]],
    true,
    120
  ),
  roman: [...arcPts(11, -18.4, 2, -Math.PI / 2, Math.PI / 2, 32), ...arcPts(5, -18.4, 2, Math.PI / 2, Math.PI * 1.5, 32)],
  rectangle: rect(3.4, -20.6, 12.6, -16.2),
};
const DECK_OUTER: Record<string, P[]> = {
  freeform: smooth(offset(POOL_SHAPES.freeform, 2.4).filter((_, i) => i % 6 === 0), true, 120),
  roman: offset(POOL_SHAPES.roman, 2.3),
  rectangle: rect(1, -23, 15.6, -13.8),
};

export const poolShape = (layout: string) => POOL_SHAPES[layout] ?? POOL_SHAPES.freeform;

function PoolBody({ layout }: { layout: string }) {
  const pool = poolShape(layout);
  const shell = useMemo(() => wallGeo(pool, 1.7), [pool]);
  const water = useMemo(() => flat(pool), [pool]);
  const coping = useMemo(() => offset(pool, 0.42), [pool]);
  const { night } = useScene();
  return (
    <group>
      <mesh geometry={shell} rotation-x={-Math.PI / 2} position-y={-1.7} receiveShadow>
        <meshStandardMaterial color="#7fcbd9" roughness={0.35} side={THREE.BackSide} />
      </mesh>
      <mesh geometry={water} rotation-x={-Math.PI / 2} position-y={-0.14}>
        <meshPhysicalMaterial
          color={night ? '#1a8fb0' : '#2a9dc0'}
          emissive={night ? '#0e6d8f' : '#000000'}
          emissiveIntensity={night ? 0.9 : 0}
          transparent
          opacity={0.72}
          roughness={0.03}
          clearcoat={1}
          envMapIntensity={1.6}
        />
      </mesh>
      <Paved zone="poolDeck" outline={coping} holes={[pool]} finish={{ id: 'coping', name: '', detail: '', tex: CAP.tex, scale: 1.2, tint: '#f6f1e6' }} thickness={0.12} y={0.01} />
      {night && <pointLight position={[8, -0.8, -18.4]} color="#5fd7ff" intensity={18} distance={9} decay={2} />}
    </group>
  );
}

function PoolDeck({ layout, finish }: { layout: string; finish: Finish }) {
  const { active } = useScene();
  const pool = poolShape(layout);
  const deckHole = useMemo(() => offset(pool, 0.42), [pool]);
  return (
    <ZoneGroup id="poolDeck">
      <Paved zone="poolDeck" outline={DECK_OUTER[layout] ?? DECK_OUTER.freeform} holes={[deckHole]} finish={finish} />
      <PoolBody layout={layout} />
      <Model url={MODELS.pot} position={[2, 0.08, -14.6]} scale={1.3} />
      <Model url={MODELS.pot} position={[14.4, 0.08, -14.6]} scale={1.3} />
      {active === 'poolDeck' && (
        <>
          <Model url={MODELS.planter} position={[14.6, 0.08, -21.6]} rotation-y={Math.PI / 2} />
          <Model url={MODELS.pot} position={[1.6, 0.08, -21.8]} scale={1.4} />
          {/* market umbrella */}
          <group position={[12.4, 0.08, -22.1]}>
            <mesh position-y={1.2} castShadow>
              <cylinderGeometry args={[0.04, 0.04, 2.4, 8]} />
              <meshStandardMaterial color="#d9d4ca" />
            </mesh>
            <mesh position-y={2.35} castShadow>
              <coneGeometry args={[1.5, 0.5, 8, 1, true]} />
              <meshStandardMaterial color="#f4f0e6" side={THREE.DoubleSide} roughness={0.9} />
            </mesh>
          </group>
        </>
      )}
    </ZoneGroup>
  );
}

/* =====================================================================
   Fire & kitchen (centred around x = -9, z = -18)
   ===================================================================== */

const FIRE = {
  round: circle(-9, -18, 4.3, 96),
  seat: sector(-9, -18, 3.25, 3.65, Math.PI / 2 + 0.75, Math.PI / 2 + Math.PI * 2 - 0.75, 64),
  square: smooth([[-14, -22.6], [-4.8, -22.6], [-4.6, -16.4], [-6, -14.1], [-12.6, -14.1], [-14.3, -16.4]], true, 60),
};

function Fireplace() {
  return (
    <group position={[-9, 0.08, -21.6]}>
      <mesh position-y={0.7} castShadow receiveShadow>
        <boxGeometry args={[4.2, 1.4, 1.3]} />
        <PBR tex="stacked_stone_wall" repeat={[2, 0.7]} />
      </mesh>
      {/* firebox: dark recess with a stone hearth in front */}
      <mesh position={[0, 0.72, 0.58]}>
        <boxGeometry args={[1.6, 1.05, 0.2]} />
        <meshStandardMaterial color="#0d0b0a" roughness={1} />
      </mesh>
      <mesh position={[0, 0.12, 0.95]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.24, 0.7]} />
        <PBR tex={CAP.tex} repeat={[1, 0.4]} color={CAP.color} />
      </mesh>
      <mesh position={[0, 1.45, 0.1]} castShadow>
        <boxGeometry args={[4.4, 0.12, 1.5]} />
        <PBR tex={CAP.tex} repeat={[2, 0.6]} color={CAP.color} />
      </mesh>
      <mesh position={[0, 3.1, -0.05]} castShadow>
        <boxGeometry args={[2.6, 3.2, 1]} />
        <PBR tex="stacked_stone_wall" repeat={[1.2, 1.5]} />
      </mesh>
      <mesh position={[0, 4.75, -0.05]} castShadow>
        <boxGeometry args={[2.9, 0.14, 1.2]} />
        <PBR tex={CAP.tex} repeat={[1.2, 0.5]} color={CAP.color} />
      </mesh>
      <Flame position={[0, 0.25, 0.72]} scale={1.2} />
    </group>
  );
}

function Kitchen() {
  const run: [number, number, number, number, number][] = [
    // cx, cz, length, depth, rotationY
    [-10, -21.8, 7.2, 0.85, 0],
    [-13.2, -18.8, 5, 0.85, Math.PI / 2],
  ];
  return (
    <group>
      {run.map(([x, z, len, d, r]) => (
        <group key={`${x}${z}`} position={[x, 0.08, z]} rotation-y={r}>
          <mesh position-y={0.46} castShadow receiveShadow>
            <boxGeometry args={[len, 0.92, d]} />
            <PBR tex="stacked_stone_wall" repeat={[len / 1.8, 0.5]} />
          </mesh>
          <mesh position-y={0.95} castShadow receiveShadow>
            <boxGeometry args={[len + 0.1, 0.06, d + 0.12]} />
            <PBR tex="marble_01" repeat={[len / 2, 0.5]} />
          </mesh>
        </group>
      ))}
      {/* built-in grill */}
      <group position={[-9.2, 1.06, -21.8]}>
        <mesh castShadow>
          <boxGeometry args={[1.1, 0.16, 0.6]} />
          <meshStandardMaterial color="#c9ccd0" metalness={1} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.2, -0.24]} rotation-x={-0.5} castShadow>
          <boxGeometry args={[1.1, 0.45, 0.08]} />
          <meshStandardMaterial color="#c9ccd0" metalness={1} roughness={0.25} />
        </mesh>
      </group>
      {/* stainless doors on the base */}
      {[-11.4, -9.2, -7.6].map((x) => (
        <mesh key={x} position={[x, 0.5, -21.36]}>
          <boxGeometry args={[0.9, 0.6, 0.03]} />
          <meshStandardMaterial color="#c9ccd0" metalness={1} roughness={0.3} />
        </mesh>
      ))}
      <NightLight position={[-10, 2.2, -22.2]} intensity={8} distance={8} bulb={false} light />
      <Model url={MODELS.dining} position={[-8.4, 0.08, -16.8]} />
    </group>
  );
}

function FireArea({ layout, finish }: { layout: string; finish: Finish }) {
  const { active } = useScene();
  const ring = { tex: 'red_brick_pavers', width: 0.4, tile: 1.4, color: '#c9b8a8' };
  return (
    <ZoneGroup id="firePit">
      {layout === 'pitSeatWall' && (
        <>
          <Paved zone="firePit" outline={FIRE.round} finish={finish} border={ring} />
          <Masonry footprint={FIRE.seat} height={0.48} finish={STONE} y={0.08} />
          <Model url={MODELS.firePit} position={[-9, 0.08, -18]} scale={1.15} />
          <Flame position={[-9, 0.35, -18]} />
        </>
      )}
      {layout === 'fireplace' && (
        <>
          <Paved zone="firePit" outline={FIRE.square} finish={finish} border={ring} />
          <Fireplace />
          <Model url={MODELS.pot} position={[-12, 0.08, -21.6]} scale={1.4} />
          <Model url={MODELS.pot} position={[-6, 0.08, -21.6]} scale={1.4} />
        </>
      )}
      {layout === 'kitchen' && (
        <>
          <Paved zone="firePit" outline={FIRE.square} finish={finish} border={ring} />
          <Kitchen />
        </>
      )}
      {active === 'firePit' && (
        <>
          <Model url={MODELS.planter} position={[-13.6, 0.08, -14.4]} rotation-y={0.6} />
          <Model url={MODELS.fern} position={[-13.8, 0, -13.8]} scale={1.6} />
          <Model url={MODELS.fern} position={[-4.2, 0, -22.6]} scale={1.5} />
        </>
      )}
    </ZoneGroup>
  );
}

/* =====================================================================
   Retaining wall + upper terrace
   ===================================================================== */

const T_BACK = -62;
const W_CURVE = curvePts([[-30, -24.2], [-18, -24.8], [-6, -27.4], [6, -27.2], [18, -24.6], [30, -24.2]], 90);
const W_STRAIGHT_L = rect(-30, -24.35, -3.95, -23.65);
const W_STRAIGHT_R = rect(-0.25, -24.35, 30, -23.65);
const W_LOW = curvePts([[-30, -23.9], [0, -24.6], [30, -23.9]], 60);
const W_HIGH = W_LOW.map(([x, z]) => [x, z - 2.5] as P);

const back = (line: P[], d: number) => line.map(([x, z]) => [x, z - d] as P);
const WALL_LAYOUTS = {
  curved: {
    walls: [{ fp: ribbon(W_CURVE, 0.6), h: 1.9 }],
    terrace: [...back(W_CURVE, 0.25), [30, T_BACK], [-30, T_BACK]] as P[],
    bed: null as P[] | null,
  },
  terraced: {
    walls: [
      { fp: ribbon(W_LOW, 0.5), h: 1.0 },
      { fp: ribbon(W_HIGH, 0.5), h: 1.9 },
    ],
    terrace: [...back(W_HIGH, 0.2), [30, T_BACK], [-30, T_BACK]] as P[],
    bed: [...back(W_LOW, 0.2), ...[...W_HIGH].reverse().map(([x, z]) => [x, z + 0.2] as P)] as P[],
  },
  stairs: {
    walls: [
      { fp: W_STRAIGHT_L, h: 1.9 },
      { fp: W_STRAIGHT_R, h: 1.9 },
      { fp: rect(-4.3, -24.35, -3.95, -21.6), h: 1.9 },
      { fp: rect(-0.25, -24.35, 0.1, -21.6), h: 1.9 },
    ],
    terrace: [[-30, -24.1], [30, -24.1], [30, T_BACK], [-30, T_BACK]] as P[],
    bed: null as P[] | null,
  },
};

function RetainingWall({ layout, finish }: { layout: string; finish: Finish }) {
  const L = WALL_LAYOUTS[layout as keyof typeof WALL_LAYOUTS] ?? WALL_LAYOUTS.curved;
  const bedPlants = useMemo(
    () => (L.bed ? W_LOW.filter((_, i) => i % 5 === 2).map(([x, z], i) => [x, z - 1.25, i] as [number, number, number]) : []),
    [L.bed]
  );
  return (
    <group>
      <ZoneGroup id="wall">
        {L.walls.map((w, i) => (
          <Masonry key={`${layout}${i}`} footprint={w.fp} height={w.h} finish={finish} outline />
        ))}
        {layout === 'stairs' &&
          Array.from({ length: 6 }, (_, i) => (
            <mesh key={i} position={[-2.1, ((i + 1) * 0.317) / 2, -21.8 - i * 0.4 - (6 - i) * 0]} castShadow receiveShadow>
              <boxGeometry args={[3.7, (i + 1) * 0.317, 0.42 + 0]} />
              <PBR tex={CAP.tex} repeat={[1.6, 0.4]} color={CAP.color} />
            </mesh>
          ))}
        {layout === 'stairs' &&
          [-3.6, -0.6].map((x) => <GlowDisc key={x} position={[x, 2.0, -22.2]} radius={1} />)}
        {L.walls.length &&
          [-18, -6, 6, 18].map((x) => (
            <group key={x}>
              <NightLight position={[x, layout === 'terraced' ? 1.15 : 2.05, layout === 'curved' ? (Math.abs(x) === 6 ? -26.6 : -24.3) : -23.5]} light={x === 6} intensity={6} distance={7} />
              <GlowDisc position={[x, 0.04, layout === 'curved' ? (Math.abs(x) === 6 ? -25.6 : -23.2) : -22.6]} radius={1.6} opacity={0.55} />
            </group>
          ))}
      </ZoneGroup>
      <Plinth outline={L.terrace} height={1.9} />
      {L.bed && (
        <>
          <Plinth outline={L.bed} height={1.0} tex="yellow_flower_mulch" tile={2} color="#9a8a78" />
          {bedPlants.map(([x, z, i]) => (
            <Model key={`${x}${z}`} url={i % 2 ? MODELS.fern : MODELS.shrubC} position={[x, 1.0, z]} scale={i % 2 ? 1.6 : 1.3} rotation-y={x} />
          ))}
        </>
      )}
      {/* return walls at the lot edges */}
      {[-30.35, 30.35].map((x) => (
        <mesh key={x} position={[x, 0.95, (-24 + T_BACK) / 2]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 1.9, Math.abs(T_BACK + 24)]} />
          <PBR tex={finish.tex} repeat={[Math.abs(T_BACK + 24) / finish.scale, 1.9 / finish.scale]} />
        </mesh>
      ))}
    </group>
  );
}

/* =====================================================================
   Everything the visitor can configure
   ===================================================================== */

export function ConfigurableYard({ selection }: { selection: Selection }) {
  const f = (z: keyof Selection) => findFinish(z, selection[z].finish);
  return (
    <>
      <Driveway layout={selection.driveway.layout} finish={f('driveway')} />
      <Walkway layout={selection.walkway.layout} finish={f('walkway')} />
      <Patio layout={selection.patio.layout} finish={f('patio')} />
      <PoolDeck layout={selection.poolDeck.layout} finish={f('poolDeck')} />
      <FireArea layout={selection.firePit.layout} finish={f('firePit')} />
      <RetainingWall layout={selection.wall.layout} finish={f('wall')} />
    </>
  );
}
