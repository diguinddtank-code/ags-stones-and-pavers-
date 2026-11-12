import React, { useMemo } from 'react';
import * as THREE from 'three';
import { PBR, usePBR, useScene, NightLight } from './materials';

/*
 * Two-story Southern home with a front-gabled two-car garage wing.
 * Main block x[-5, 8] z[-5, 5]; garage wing x[-12.6, -5] z[-4, 6.2].
 */

export const HOUSE = {
  main: { x0: -5, x1: 8, z0: -5, z1: 5, h: 6 },
  garage: { x0: -12.6, x1: -5, z0: -4, z1: 6.2, h: 3.4 },
  frontDoorX: 3,
};

const TRIM = '#f5f3ee';

function Glass({ w, h }: { w: number; h: number }) {
  const { night } = useScene();
  return (
    <mesh position-z={0.04}>
      <boxGeometry args={[w, h, 0.05]} />
      <meshPhysicalMaterial
        color={night ? '#3a2a14' : '#1b2731'}
        emissive={night ? '#ffb866' : '#000000'}
        emissiveIntensity={night ? 1.4 : 0}
        roughness={0.05}
        metalness={0.25}
        clearcoat={1}
        envMapIntensity={1.4}
      />
    </mesh>
  );
}

export function Window({
  position,
  size = [1.3, 1.6],
  rotation = 0,
  shutters = false,
}: {
  position: [number, number, number];
  size?: [number, number];
  rotation?: number;
  shutters?: boolean;
}) {
  const [w, h] = size;
  return (
    <group position={position} rotation-y={rotation}>
      <mesh castShadow>
        <boxGeometry args={[w + 0.22, h + 0.22, 0.12]} />
        <meshStandardMaterial color={TRIM} roughness={0.6} />
      </mesh>
      <Glass w={w} h={h} />
      <mesh position-z={0.08}>
        <boxGeometry args={[0.05, h, 0.03]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>
      <mesh position-z={0.08}>
        <boxGeometry args={[w, 0.05, 0.03]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>
      <mesh position={[0, -h / 2 - 0.15, 0.08]} castShadow>
        <boxGeometry args={[w + 0.42, 0.08, 0.2]} />
        <meshStandardMaterial color="#e9e5dc" />
      </mesh>
      {shutters &&
        [-1, 1].map((s) => (
          <mesh key={s} position={[s * (w / 2 + 0.42), 0, 0.03]} castShadow>
            <boxGeometry args={[0.55, h + 0.1, 0.05]} />
            <meshStandardMaterial color="#2f3b37" roughness={0.6} />
          </mesh>
        ))}
    </group>
  );
}

/** Gable roof + gable infill. Ridge runs along local z. */
function Gable({
  width,
  depth,
  rise,
  overhang = 0.6,
  roofColor = '#a9adb2',
  wallColor = '#f2f0ea',
}: {
  width: number;
  depth: number;
  rise: number;
  overhang?: number;
  roofColor?: string;
  wallColor?: string;
}) {
  const roof = useMemo(() => {
    const s = new THREE.Shape();
    const hw = width / 2 + overhang;
    const slope = rise / (width / 2);
    s.moveTo(-hw, -overhang * slope);
    s.lineTo(hw, -overhang * slope);
    s.lineTo(0, rise);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: depth + overhang * 2, bevelEnabled: false });
    g.translate(0, 0.02, -(depth + overhang * 2) / 2);
    return g;
  }, [width, depth, rise, overhang]);
  const infill = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-width / 2, 0);
    s.lineTo(width / 2, 0);
    s.lineTo(0, rise - 0.05);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false });
    g.translate(0, 0, -depth / 2);
    return g;
  }, [width, depth, rise]);
  const roofMaps = usePBR('grey_roof_tiles', [0.42, 0.42]);
  const siding = usePBR('white_planks_clean', [1 / 1.4, 1 / 1.4]);
  return (
    <group>
      <mesh geometry={infill} castShadow receiveShadow>
        <meshStandardMaterial {...siding} roughness={1} color={wallColor} />
      </mesh>
      <mesh geometry={roof} castShadow receiveShadow>
        <meshStandardMaterial {...roofMaps} roughness={1} color={roofColor} />
      </mesh>
      {/* fascia boards along both eaves */}
      {[-1, 1].map((s) => (
        <mesh
          key={s}
          position={[s * (width / 2 + overhang - 0.04), -overhang * (rise / (width / 2)) - 0.08, 0]}
          castShadow
        >
          <boxGeometry args={[0.08, 0.22, depth + overhang * 2]} />
          <meshStandardMaterial color={TRIM} />
        </mesh>
      ))}
    </group>
  );
}

function Box({
  size,
  position,
  tex,
  tile = 1.4,
  color = '#ffffff',
}: {
  size: [number, number, number];
  position: [number, number, number];
  tex: string;
  tile?: number;
  color?: string;
}) {
  // Box UVs are 0-1 per face; repeat by the larger face so texel size stays roughly constant.
  const rep: [number, number] = [Math.max(size[0], size[2]) / tile, size[1] / tile];
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <PBR tex={tex} repeat={rep} color={color} />
    </mesh>
  );
}

function GarageDoor({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 1.2, 0.04]} castShadow>
        <boxGeometry args={[2.8, 2.4, 0.08]} />
        <PBR tex="wooden_garage_door" repeat={[1, 1]} color="#c9b49a" />
      </mesh>
      {/* trim */}
      <mesh position={[0, 2.5, 0.06]}>
        <boxGeometry args={[3.2, 0.2, 0.1]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 1.5, 1.2, 0.06]}>
          <boxGeometry args={[0.2, 2.6, 0.1]} />
          <meshStandardMaterial color={TRIM} />
        </mesh>
      ))}
      {/* row of glass lites */}
      <mesh position={[0, 2.0, 0.09]}>
        <boxGeometry args={[2.4, 0.32, 0.02]} />
        <meshPhysicalMaterial color="#1b2731" roughness={0.05} clearcoat={1} />
      </mesh>
    </group>
  );
}

function Sconce({ position, light = false }: { position: [number, number, number]; light?: boolean }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.18, 0.32, 0.14]} />
        <meshStandardMaterial color="#1f1f1f" metalness={0.5} roughness={0.4} />
      </mesh>
      <NightLight position={[0, 0, 0.1]} intensity={8} distance={8} light={light} />
    </group>
  );
}

export function House() {
  const { main: M, garage: G } = HOUSE;
  const MW = M.x1 - M.x0;
  const MD = M.z1 - M.z0;
  const mx = (M.x0 + M.x1) / 2;
  const GW = G.x1 - G.x0;
  const GD = G.z1 - G.z0;
  const gx = (G.x0 + G.x1) / 2;
  const gz = (G.z0 + G.z1) / 2;

  return (
    <group>
      {/* ---------- main two-story block ---------- */}
      <Box size={[MW + 0.14, 0.9, MD + 0.14]} position={[mx, 0.45, 0]} tex="stone_wall_04" tile={2.2} />
      <Box size={[MW, M.h - 0.9, MD]} position={[mx, (M.h - 0.9) / 2 + 0.9, 0]} tex="white_planks_clean" tile={1.4} color="#fbf8f1" />
      {/* belly band between floors */}
      <mesh position={[mx, 3.1, 0]} castShadow>
        <boxGeometry args={[MW + 0.1, 0.16, MD + 0.1]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>
      <group position={[mx, M.h, 0]} rotation-y={Math.PI / 2}>
        <Gable width={MD} depth={MW} rise={3.1} />
      </group>
      {/* chimney */}
      <Box size={[1.5, 9.8, 1.5]} position={[M.x1 + 0.6, 4.9, -0.8]} tex="stone_wall_04" tile={2.2} />
      <mesh position={[M.x1 + 0.6, 9.85, -0.8]} castShadow>
        <boxGeometry args={[1.8, 0.14, 1.8]} />
        <meshStandardMaterial color="#cfc9be" />
      </mesh>

      {/* ---------- garage wing (gable to the street) ---------- */}
      <Box size={[GW + 0.14, 0.9, GD + 0.14]} position={[gx, 0.45, gz]} tex="stone_wall_04" tile={2.2} />
      <Box size={[GW, G.h - 0.9, GD]} position={[gx, (G.h - 0.9) / 2 + 0.9, gz]} tex="white_planks_clean" tile={1.4} color="#fbf8f1" />
      <group position={[gx, G.h, gz]}>
        <Gable width={GW} depth={GD} rise={2.6} />
      </group>
      <GarageDoor x={-10.65} z={G.z1} />
      <GarageDoor x={-6.95} z={G.z1} />
      <Sconce position={[-12.3, 2.5, G.z1 + 0.1]} />
      <Sconce position={[-8.8, 2.5, G.z1 + 0.1]} light />
      <Sconce position={[-5.3, 2.5, G.z1 + 0.1]} />
      {/* gable vent */}
      <mesh position={[gx, G.h + 1.2, G.z1 + 0.05]}>
        <circleGeometry args={[0.45, 24]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>
      <Window position={[G.x0 - 0.05, 2.2, 1]} rotation={-Math.PI / 2} />

      {/* ---------- front porch + door ---------- */}
      <group position={[HOUSE.frontDoorX, 0, M.z1]}>
        <mesh position={[0, 1.3, 0.05]} castShadow>
          <boxGeometry args={[1.15, 2.35, 0.08]} />
          <meshStandardMaterial color="#25352f" roughness={0.45} />
        </mesh>
        <mesh position={[0, 1.4, 0.02]}>
          <boxGeometry args={[1.6, 2.7, 0.06]} />
          <meshStandardMaterial color={TRIM} />
        </mesh>
        {/* sidelights */}
        {[-0.95, 0.95].map((x) => (
          <group key={x} position={[x, 1.3, 0.04]}>
            <Glass w={0.3} h={2.1} />
          </group>
        ))}
        {/* porch slab, roof, columns */}
        <mesh position={[0, 0.12, 1.3]} receiveShadow castShadow>
          <boxGeometry args={[5.2, 0.24, 2.6]} />
          <PBR tex="brushed_concrete_03" repeat={[2, 1]} />
        </mesh>
        <mesh position={[0, 3.25, 1.35]} castShadow>
          <boxGeometry args={[5.4, 0.22, 2.9]} />
          <meshStandardMaterial color={TRIM} />
        </mesh>
        <mesh position={[0, 3.55, 1.1]} rotation-x={-0.32} castShadow>
          <boxGeometry args={[5.6, 0.1, 2.6]} />
          <PBR tex="grey_roof_tiles" repeat={[2.2, 1]} color="#a9adb2" />
        </mesh>
        {[-2.35, 2.35].map((x) => (
          <group key={x} position={[x, 0, 2.4]}>
            <mesh position-y={0.45} castShadow>
              <boxGeometry args={[0.5, 0.7, 0.5]} />
              <PBR tex="stone_wall_04" repeat={[0.4, 0.4]} />
            </mesh>
            <mesh position-y={2.05} castShadow>
              <boxGeometry args={[0.26, 2.5, 0.26]} />
              <meshStandardMaterial color={TRIM} />
            </mesh>
          </group>
        ))}
        <NightLight position={[0, 3.05, 1.4]} intensity={6} distance={7} light />
      </group>

      {/* ---------- windows ---------- */}
      <Window position={[-2.6, 1.75, M.z1 + 0.05]} shutters />
      <Window position={[6.6, 1.75, M.z1 + 0.05]} shutters />
      <Window position={[-2.6, 4.5, M.z1 + 0.05]} shutters />
      <Window position={[HOUSE.frontDoorX, 4.5, M.z1 + 0.05]} shutters />
      <Window position={[6.6, 4.5, M.z1 + 0.05]} shutters />
      {/* back: wide sliding doors to the patio */}
      <group position={[2.5, 0, M.z0 - 0.05]} rotation-y={Math.PI}>
        <mesh position-y={1.25} castShadow>
          <boxGeometry args={[4.4, 2.5, 0.12]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.4} roughness={0.5} />
        </mesh>
        <group position-y={1.2}>
          <Glass w={4.1} h={2.25} />
        </group>
      </group>
      <Window position={[-3, 1.75, M.z0 - 0.05]} rotation={Math.PI} />
      <Window position={[6.6, 1.75, M.z0 - 0.05]} rotation={Math.PI} />
      {[-3, 1, 5].map((x) => (
        <Window key={x} position={[x, 4.5, M.z0 - 0.05]} rotation={Math.PI} />
      ))}
      <Window position={[M.x1 + 0.05, 1.75, 2.5]} rotation={Math.PI / 2} />
      <Window position={[M.x1 + 0.05, 4.5, 2.5]} rotation={Math.PI / 2} />
      <NightLight position={[2.5, 2.8, M.z0 - 0.25]} intensity={7} distance={8} light />
    </group>
  );
}
