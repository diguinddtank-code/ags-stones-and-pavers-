import * as THREE from 'three';

/**
 * Plan-view geometry helpers. Everything is authored in world meters as
 * [x, z] pairs (z toward the street). Shapes are built in THREE's x/y plane
 * with y = -z, so a mesh rotated -90deg about X lands on the ground with its
 * extrusion pointing up and UVs in meters (texture repeat = 1 / tile size).
 */
export type P = [number, number];

const v2 = ([x, z]: P) => new THREE.Vector2(x, -z);

export function shape(pts: P[], holes: P[][] = []) {
  const s = new THREE.Shape(pts.map(v2));
  holes.forEach((h) => s.holes.push(new THREE.Path(h.map(v2))));
  return s;
}

/** Flat slab (paving) of a given thickness, sitting on y = 0 once rotated. */
export const slab = (pts: P[], holes: P[][] = [], depth = 0.08) =>
  new THREE.ExtrudeGeometry(shape(pts, holes), { depth, bevelEnabled: false, curveSegments: 12 });

export const flat = (pts: P[], holes: P[][] = []) => new THREE.ShapeGeometry(shape(pts, holes), 12);

export const rect = (x0: number, z0: number, x1: number, z1: number): P[] => [
  [x0, z0], [x1, z0], [x1, z1], [x0, z1],
];

export const arcPts = (cx: number, cz: number, r: number, a0: number, a1: number, n = 48): P[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n;
    return [cx + Math.cos(a) * r, cz + Math.sin(a) * r];
  });

export const circle = (cx: number, cz: number, r: number, n = 64) => arcPts(cx, cz, r, 0, Math.PI * 2, n).slice(0, -1);

/** Ring sector outline (seat walls, curved steps). Angles in the x/z plane. */
export const sector = (cx: number, cz: number, r0: number, r1: number, a0: number, a1: number, n = 48): P[] => [
  ...arcPts(cx, cz, r1, a0, a1, n),
  ...arcPts(cx, cz, r0, a1, a0, n),
];

export function signedArea(pts: P[]) {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x0, z0] = pts[i];
    const [x1, z1] = pts[(i + 1) % pts.length];
    a += x0 * z1 - x1 * z0;
  }
  return a / 2;
}

/** Offsets a closed polygon; positive d grows it, negative shrinks it. */
export function offset(pts: P[], d: number): P[] {
  const s = Math.sign(signedArea(pts)) || 1;
  const n = pts.length;
  const normal = (a: P, b: P): P => {
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const l = Math.hypot(dx, dz) || 1;
    return [(s * dz) / l, (-s * dx) / l];
  };
  return pts.map((p, i) => {
    const n0 = normal(pts[(i - 1 + n) % n], p);
    const n1 = normal(p, pts[(i + 1) % n]);
    let mx = n0[0] + n1[0];
    let mz = n0[1] + n1[1];
    const ml = Math.hypot(mx, mz) || 1;
    mx /= ml;
    mz /= ml;
    const cos = Math.max(0.35, mx * n1[0] + mz * n1[1]);
    return [p[0] + (mx * d) / cos, p[1] + (mz * d) / cos];
  });
}

/** Closed outline from a smooth curve through control points. */
export function smooth(points: P[], closed = true, n = 120): P[] {
  const curve = new THREE.CatmullRomCurve3(
    points.map(([x, z]) => new THREE.Vector3(x, 0, z)),
    closed,
    'centripetal'
  );
  return curve.getSpacedPoints(n).slice(0, closed ? -1 : undefined).map((p) => [p.x, p.z]);
}

/** A band of constant width along an open centerline (paths, curved walls). */
export function ribbon(center: P[], width: number | ((t: number) => number)): P[] {
  const left: P[] = [];
  const right: P[] = [];
  for (let i = 0; i < center.length; i++) {
    const a = center[Math.max(0, i - 1)];
    const b = center[Math.min(center.length - 1, i + 1)];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const l = Math.hypot(dx, dz) || 1;
    const nx = -dz / l;
    const nz = dx / l;
    const w = typeof width === 'number' ? width : width(i / (center.length - 1));
    left.push([center[i][0] + (nx * w) / 2, center[i][1] + (nz * w) / 2]);
    right.push([center[i][0] - (nx * w) / 2, center[i][1] - (nz * w) / 2]);
  }
  return [...left, ...right.reverse()];
}

/** Evenly spaced points along an open smooth centerline. */
export const curvePts = (points: P[], n = 80) => smooth(points, false, n);

/** Vertical wall from a plan footprint: extruded `height` up from y = 0 (after -90deg X rotation). */
export const wallGeo = (footprint: P[], height: number) =>
  new THREE.ExtrudeGeometry(shape(footprint), { depth: height, bevelEnabled: false, curveSegments: 12 });

export const centroid = (pts: P[]): P => {
  const sx = pts.reduce((a, p) => a + p[0], 0);
  const sz = pts.reduce((a, p) => a + p[1], 0);
  return [sx / pts.length, sz / pts.length];
};
