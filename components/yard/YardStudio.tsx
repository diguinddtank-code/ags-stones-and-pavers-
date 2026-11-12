import React, { Suspense, useCallback, useEffect, useState, useTransition } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Moon, MousePointerClick, RotateCcw, Sparkles, Sun } from 'lucide-react';
import { YardScene } from './YardScene';
import {
  DEFAULT_SELECTION, STYLES, ZONES, findFinish, findLayout, getZone, thumbUrl, type Selection, type ZoneId,
} from '../../lib/yardPresets';

const swatch = (zone: ZoneId, finishId: string) => thumbUrl(findFinish(zone, finishId).tex);

function Loader() {
  const { active, progress } = useProgress();
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active && progress >= 100) {
      const t = window.setTimeout(() => setDone(true), 400);
      return () => window.clearTimeout(t);
    }
  }, [active, progress]);
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[#15181d] text-white transition-opacity duration-1000 ${
        done ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <span className="font-serif text-2xl">Building your yard</span>
      <span className="h-1 w-56 overflow-hidden rounded-full bg-white/10">
        <span className="block h-full bg-brand-gold transition-[width] duration-300" style={{ width: `${Math.round(progress)}%` }} />
      </span>
      <span className="text-xs tracking-[0.2em] text-white/50">{Math.round(progress)}%</span>
    </div>
  );
}

/** Short cinematic title card while the camera flies into an area. */
function EnterCard({ zone }: { zone: ZoneId }) {
  const z = getZone(zone);
  return (
    <div key={zone} className="yard-enter pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <div className="yard-enter-veil absolute inset-0 bg-brand-dark" />
      <div className="yard-enter-title relative text-center text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold">{z.service}</p>
        <p className="mt-2 font-serif text-4xl sm:text-5xl">{z.name}</p>
      </div>
    </div>
  );
}

const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
};

const YardStudio: React.FC = () => {
  const [selection, setSelection] = useState<Selection>(DEFAULT_SELECTION);
  const [active, setActive] = useState<ZoneId | null>(null);
  const [styleId, setStyleId] = useState<string | null>('resort');
  const [night, setNight] = useState(false);
  const [, startTransition] = useTransition();
  const [webgl] = useState(hasWebGL);
  const [quality] = useState<'high' | 'low'>(() =>
    window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches ? 'high' : 'low'
  );
  const zone = active ? getZone(active) : null;

  useEffect(() => () => void (document.body.style.cursor = ''), []);
  const select = useCallback((id: ZoneId | null) => setActive(id), []);

  const update = (zoneId: ZoneId, patch: Partial<Selection[ZoneId]>) => {
    // A transition keeps the current design on screen while new textures load.
    startTransition(() => setSelection((s) => ({ ...s, [zoneId]: { ...s[zoneId], ...patch } })));
    setStyleId(null);
  };

  if (!webgl) {
    return (
      <div className="flex h-[60svh] items-center justify-center rounded-[28px] border border-white/10 bg-white/5 p-8 text-center text-white/70">
        Your browser can’t display the 3D studio. Try a recent version of Chrome, Safari or Edge, or
        <Link to="/quote" className="ml-1 text-brand-gold underline">
          tell us about your project
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_400px]">
      {/* 3D viewport */}
      <div
        data-lenis-prevent
        className="relative h-[64svh] min-h-[460px] overflow-hidden rounded-[28px] border border-white/10 bg-[#15181d] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] lg:h-[80svh] lg:min-h-[640px]"
      >
        <Canvas
          shadows
          dpr={quality === 'high' ? [1, 1.5] : [1, 1.25]}
          camera={{ fov: 40, near: 0.3, far: 700, position: [60, 60, 80] }}
          gl={{ antialias: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        >
          <Suspense fallback={null}>
            <YardScene selection={selection} active={active} onSelect={select} quality={quality} night={night} />
          </Suspense>
        </Canvas>
        {active && <EnterCard zone={active} />}
        <Loader />

        {/* top bar: quick looks + day / dusk */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-3 sm:p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="pointer-events-auto hidden items-center gap-1.5 rounded-full bg-brand-dark/80 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gold backdrop-blur-md sm:inline-flex">
              <Sparkles size={13} /> Complete looks
            </span>
            {STYLES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  startTransition(() => setSelection(s.selection));
                  setStyleId(s.id);
                }}
                className={`pointer-events-auto rounded-full px-3.5 py-2 text-xs font-semibold shadow-md backdrop-blur-md transition-colors ${
                  styleId === s.id ? 'bg-brand-gold text-brand-dark' : 'bg-white/85 text-brand-dark hover:bg-white'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setNight((n) => !n)}
            aria-pressed={night}
            className="pointer-events-auto inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-dark/80 px-3.5 py-2 text-xs font-semibold text-white shadow-md backdrop-blur-md hover:bg-brand-dark"
          >
            {night ? <Sun size={14} className="text-brand-gold" /> : <Moon size={14} className="text-brand-gold" />}
            {night ? 'Daytime' : 'Evening lights'}
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-3 p-3 sm:p-4">
          <p className="hidden items-center gap-2 rounded-full bg-brand-dark/70 px-3 py-2 text-[11px] text-white/80 backdrop-blur-md sm:inline-flex">
            <MousePointerClick size={14} className="text-brand-gold" />
            {active ? 'Drag to look around · scroll to move closer' : 'Click an area to open it · drag to orbit · scroll to zoom'}
          </p>
          {active && (
            <button
              type="button"
              onClick={() => setActive(null)}
              className="pointer-events-auto ml-auto inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-brand-dark shadow-md backdrop-blur-md hover:bg-white"
            >
              <RotateCcw size={14} /> Whole property
            </button>
          )}
        </div>
      </div>

      {/* control panel */}
      <aside className="flex flex-col rounded-[28px] border border-white/10 bg-white/[0.04] p-5 text-white backdrop-blur-xl sm:p-6 lg:max-h-[80svh] lg:overflow-y-auto" data-lenis-prevent>
        {zone ? (
          <div key={zone.id} className="animate-fade-up">
            <button
              type="button"
              onClick={() => setActive(null)}
              className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/60 hover:text-brand-gold"
            >
              <ArrowLeft size={14} /> All areas
            </button>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">{zone.service}</p>
            <h3 className="mt-1 font-serif text-3xl">{zone.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{zone.blurb}</p>

            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">1 · Design style</p>
            <div className="mt-3 space-y-2">
              {zone.layouts.map((l) => {
                const on = selection[zone.id].layout === l.id;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => update(zone.id, { layout: l.id })}
                    aria-pressed={on}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                      on ? 'border-brand-gold bg-brand-gold/10' : 'border-white/10 hover:border-white/35'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        on ? 'border-brand-gold bg-brand-gold text-brand-dark' : 'border-white/30'
                      }`}
                    >
                      {on && <Check size={12} strokeWidth={3} />}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{l.name}</span>
                      <span className="block text-xs text-white/55">{l.detail}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">2 · Material</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {zone.finishes.map((f) => {
                const on = selection[zone.id].finish === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => update(zone.id, { finish: f.id })}
                    aria-pressed={on}
                    className={`group overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                      on ? 'border-brand-gold ring-2 ring-brand-gold/40' : 'border-white/10 hover:border-white/40'
                    }`}
                  >
                    <span className="block aspect-[4/3] overflow-hidden">
                      <img
                        src={swatch(zone.id, f.id)}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </span>
                    <span className="block px-3 py-2.5">
                      <span className="block text-sm font-semibold leading-tight">{f.name}</span>
                      <span className="block text-[11px] text-white/55">{f.detail}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <Link to={zone.servicePath} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:text-white">
              About {zone.service.toLowerCase()} <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Open an area</p>
            <h3 className="mt-1 font-serif text-3xl">Your design</h3>
            <p className="mt-2 text-sm text-white/60">Pick an area to step inside it, then change its style and stone.</p>
            <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {ZONES.map((z) => {
                const f = findFinish(z.id, selection[z.id].finish);
                const l = findLayout(z.id, selection[z.id].layout);
                return (
                  <li key={z.id}>
                    <button type="button" onClick={() => setActive(z.id)} className="group flex w-full items-center gap-3 py-3 text-left">
                      <img src={swatch(z.id, f.id)} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{z.name}</span>
                        <span className="block truncate text-xs text-white/55">
                          {l.name} · {f.name}
                        </span>
                      </span>
                      <ArrowRight size={16} className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-brand-gold" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-6">
          <Link
            to="/quote"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-4 text-sm font-bold uppercase tracking-wider text-brand-dark transition-colors hover:bg-white"
          >
            Get an estimate for this look <ArrowRight size={16} />
          </Link>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-white/45">
            A sample property for inspiration. We plan layout and materials around your own site.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default YardStudio;
