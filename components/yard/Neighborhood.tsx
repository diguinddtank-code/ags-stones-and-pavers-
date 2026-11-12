import React, { useMemo } from 'react';
import * as THREE from 'three';
import { flat, rect, type P } from './geo';
import { GlowDisc, MODELS, Model, NightLight, PBR, useScene } from './materials';
import { Window } from './House';

/*
 * Everything that is not configurable: ground, street, sidewalks, fences,
 * neighbouring homes and the tree line that frames the property.
 */

const FAR = 260;

export function Ground({ poolHole }: { poolHole: P[] }) {
  const geo = useMemo(() => flat(rect(-FAR, -FAR, FAR, FAR), [poolHole]), [poolHole]);
  return (
    <mesh geometry={geo} rotation-x={-Math.PI / 2} receiveShadow>
      <PBR tex="leafy_grass" tile={4.5} color="#a4c487" />
    </mesh>
  );
}

function StreetLamp({ x, z, light }: { x: number; z: number; light?: boolean }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position-y={2.2} castShadow>
        <cylinderGeometry args={[0.06, 0.09, 4.4, 10]} />
        <meshStandardMaterial color="#1e2124" metalness={0.6} roughness={0.5} />
      </mesh>
      <mesh position-y={4.5} castShadow>
        <cylinderGeometry args={[0.28, 0.12, 0.45, 8]} />
        <meshStandardMaterial color="#1e2124" metalness={0.6} roughness={0.5} />
      </mesh>
      <NightLight position={[0, 4.3, 0]} light={light} intensity={30} distance={16} color="#ffd9a8" />
      <GlowDisc position={[0, 0.06, 0]} radius={4} opacity={0.45} />
    </group>
  );
}

function Street() {
  return (
    <group>
      {/* near sidewalk, curb, road, far sidewalk */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 20.75]} receiveShadow>
        <planeGeometry args={[FAR * 2, 2.5]} />
        <PBR tex="brushed_concrete_03" repeat={[FAR, 1.2]} />
      </mesh>
      {[22.1, 34.1].map((z) => (
        <mesh key={z} position={[0, 0.06, z]} receiveShadow castShadow>
          <boxGeometry args={[FAR * 2, 0.16, 0.22]} />
          <meshStandardMaterial color="#c9c5bc" roughness={1} />
        </mesh>
      ))}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.02, 28.1]} receiveShadow>
        <planeGeometry args={[FAR * 2, 12]} />
        <PBR tex="asphalt_02" repeat={[FAR / 2, 3]} />
      </mesh>
      {Array.from({ length: 24 }, (_, i) => -138 + i * 12).map((x) => (
        <mesh key={x} rotation-x={-Math.PI / 2} position={[x, 0.005, 28.1]}>
          <planeGeometry args={[5, 0.16]} />
          <meshStandardMaterial color="#e2cf74" roughness={0.8} />
        </mesh>
      ))}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 35.45]} receiveShadow>
        <planeGeometry args={[FAR * 2, 2.5]} />
        <PBR tex="brushed_concrete_03" repeat={[FAR, 1.2]} />
      </mesh>
      <StreetLamp x={-24} z={22.6} light />
      <StreetLamp x={22} z={22.6} light />
      <StreetLamp x={0} z={33.6} />
      {/* mailbox */}
      <group position={[-16.2, 0, 19.1]}>
        <mesh position-y={0.55} castShadow>
          <boxGeometry args={[0.12, 1.1, 0.12]} />
          <meshStandardMaterial color="#f2efe8" />
        </mesh>
        <mesh position-y={1.18} castShadow>
          <boxGeometry args={[0.28, 0.28, 0.55]} />
          <meshStandardMaterial color="#1f2a26" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

/** Board-on-board privacy fence along a straight run. */
function Fence({ from, to, y = 0, h = 1.8 }: { from: P; to: P; y?: number; h?: number }) {
  const len = Math.hypot(to[0] - from[0], to[1] - from[1]);
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
  const posts = Math.max(2, Math.round(len / 2.4) + 1);
  return (
    <group position={[(from[0] + to[0]) / 2, y, (from[1] + to[1]) / 2]} rotation-y={-angle}>
      <mesh position-y={h / 2} castShadow receiveShadow>
        <boxGeometry args={[len, h, 0.06]} />
        <PBR tex="wood_plank_wall" repeat={[len / 1.6, h / 1.6]} color="#c7b39b" />
      </mesh>
      {Array.from({ length: posts }, (_, i) => -len / 2 + (i * len) / (posts - 1)).map((x) => (
        <mesh key={x} position={[x, h / 2 + 0.05, 0.05]} castShadow>
          <boxGeometry args={[0.12, h + 0.1, 0.12]} />
          <PBR tex="dark_wooden_planks" repeat={[0.2, 1]} />
        </mesh>
      ))}
    </group>
  );
}

function Neighbor({
  position,
  rotation = 0,
  brick = false,
  color = '#e9e4da',
  roof = '#9a9ea3',
  width = 13,
  depth = 10,
}: {
  position: [number, number, number];
  rotation?: number;
  brick?: boolean;
  color?: string;
  roof?: string;
  width?: number;
  depth?: number;
}) {
  const roofGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-depth / 2 - 0.6, -0.3);
    s.lineTo(depth / 2 + 0.6, -0.3);
    s.lineTo(0, 2.9);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: width + 1, bevelEnabled: false });
    g.translate(0, 0, -(width + 1) / 2);
    return g;
  }, [width, depth]);
  const H = 5.6;
  return (
    <group position={position} rotation-y={rotation}>
      <mesh position-y={H / 2} castShadow receiveShadow>
        <boxGeometry args={[width, H, depth]} />
        <PBR tex={brick ? 'red_brick_03' : 'white_planks_clean'} repeat={[width / (brick ? 1.2 : 1.4), H / (brick ? 1.2 : 1.4)]} color={brick ? '#ffffff' : color} />
      </mesh>
      <group position-y={H} rotation-y={Math.PI / 2}>
        <mesh geometry={roofGeo} castShadow receiveShadow>
          <PBR tex="grey_roof_tiles" repeat={[0.42, 0.42]} color={roof} />
        </mesh>
      </group>
      {[-4, 0, 4].map((x) => (
        <Window key={`u${x}`} position={[x, 4.1, depth / 2 + 0.05]} shutters={!brick} />
      ))}
      {[-4, 4].map((x) => (
        <Window key={`l${x}`} position={[x, 1.6, depth / 2 + 0.05]} shutters={!brick} />
      ))}
      <mesh position={[0, 1.2, depth / 2 + 0.04]}>
        <boxGeometry args={[1.1, 2.3, 0.08]} />
        <meshStandardMaterial color="#3b2a22" />
      </mesh>
      {/* concrete drive to the street */}
      <mesh rotation-x={-Math.PI / 2} position={[-width / 2 + 3, 0.015, depth / 2 + 7]} receiveShadow>
        <planeGeometry args={[5, 14]} />
        <PBR tex="brushed_concrete_03" repeat={[2.5, 7]} />
      </mesh>
      {[-5.5, 5.5].map((x) => (
        <Model key={x} url={MODELS.shrubA} position={[x, 0, depth / 2 + 0.9]} scale={1.4} rotation-y={x} />
      ))}
    </group>
  );
}

const FAR_TREES: [number, number, number, number][] = [
  // behind the upper lawn
  [-26, 1.9, -44, 3.2], [-12, 1.9, -50, 3.6], [2, 1.9, -46, 3.0], [14, 1.9, -52, 3.5], [26, 1.9, -45, 3.1],
  [-20, 1.9, -58, 3.4], [8, 1.9, -59, 3.3], [22, 1.9, -60, 3.6],
  // neighbouring lots
  [-40, 0, -14, 3.2], [-58, 0, 6, 3.4], [-44, 0, 16, 2.8], [40, 0, -16, 3.3], [58, 0, 4, 3.5], [44, 0, 15, 2.9],
  // across the street
  [-42, 0, 50, 3.1], [-14, 0, 54, 3.4], [16, 0, 52, 3.0], [44, 0, 55, 3.3],
  // far horizon fill
  [-70, 0, -40, 4], [-50, 0, -70, 4.2], [-10, 0, -80, 4.3], [30, 0, -78, 4], [66, 0, -42, 4.1], [80, 0, 30, 3.8], [-82, 0, 28, 3.9],
];

export function Neighborhood({ poolHole }: { poolHole: P[] }) {
  const { quality } = useScene();
  const trees = quality === 'high' ? FAR_TREES : FAR_TREES.filter((_, i) => i % 2 === 0);
  return (
    <group>
      <Ground poolHole={poolHole} />
      <Street />
      {/* side + back fences around our lot */}
      <Fence from={[-29.6, -4]} to={[-29.6, -23.4]} />
      <Fence from={[29.6, -4]} to={[29.6, -23.4]} />
      <Fence from={[-29.6, -61.6]} to={[29.6, -61.6]} y={1.9} />
      <Fence from={[-29.6, -24.6]} to={[-29.6, -61.6]} y={1.9} />
      <Fence from={[29.6, -24.6]} to={[29.6, -61.6]} y={1.9} />
      {/* neighbours */}
      <Neighbor position={[-48, 0, 0]} brick />
      <Neighbor position={[47, 0, -1]} color="#d9e1e4" roof="#6f757b" />
      <Neighbor position={[-30, 0, 49]} rotation={Math.PI} color="#efe7d6" />
      <Neighbor position={[0, 0, 50]} rotation={Math.PI} brick roof="#80858a" />
      <Neighbor position={[31, 0, 49]} rotation={Math.PI} color="#e3e8dd" />
      {/* full-detail trees on our own lot */}
      {[[-20, 12, 3.0, 0.3], [19, 13, 2.7, 2.1], [22.5, -7, 2.9, 4.2], [-23.5, -9, 2.8, 1.1]].map(([x, z, s, r]) => (
        <Model key={`h${x}`} url={MODELS.tree} position={[x, 0, z]} scale={s} rotation-y={r} />
      ))}
      {trees.map(([x, y, z, s]) => (
        <Model key={`${x}${z}`} url={MODELS.treeFar} position={[x, y, z]} scale={s} rotation-y={x * 0.37} />
      ))}
    </group>
  );
}
