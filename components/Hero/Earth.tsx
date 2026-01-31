"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Text } from "@react-three/drei";
import * as THREE from "three";

// Seeded random generator
function createSeededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const glowRingRef = useRef<THREE.Mesh>(null);
  const textGroupRef = useRef<THREE.Group>(null);

  // ─── Procedural Earth Texture ───────────────────────────────────
  const earthTexture = useMemo(() => {
    const size = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Deep ocean base
    const oceanGrad = ctx.createLinearGradient(0, 0, size, size);
    oceanGrad.addColorStop(0, "#0a1628");
    oceanGrad.addColorStop(0.3, "#0d2847");
    oceanGrad.addColorStop(0.6, "#0f3460");
    oceanGrad.addColorStop(1, "#122a4a");
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, size, size);

    // Seeded random
    const rand = createSeededRandom(42);

    // Ocean current swirls
    for (let i = 0; i < 30; i++) {
      const x = rand() * size;
      const y = rand() * size;
      const r = 40 + rand() * 180;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(${15 + rand() * 30}, ${60 + rand() * 60}, ${120 + rand() * 80}, ${0.15 + rand() * 0.2})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }

    // Landmasses — organic blobs
    const lands = [
      { x: 0.15, y: 0.35, w: 0.22, h: 0.28 },   // North America
      { x: 0.38, y: 0.25, w: 0.12, h: 0.18 },   // Greenland
      { x: 0.45, y: 0.3,  w: 0.18, h: 0.32 },   // Europe
      { x: 0.52, y: 0.42, w: 0.16, h: 0.26 },   // Africa
      { x: 0.65, y: 0.28, w: 0.2,  h: 0.3  },   // Asia
      { x: 0.72, y: 0.55, w: 0.2,  h: 0.28 },   // Australia
      { x: 0.2,  y: 0.7,  w: 0.15, h: 0.15 },   // South America
      { x: 0.78, y: 0.12, w: 0.14, h: 0.12 },   // Japan / Islands
    ];

    lands.forEach((land) => {
      const cx = land.x * size;
      const cy = land.y * size;
      const rx = land.w * size * 0.5;
      const ry = land.h * size * 0.5;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1 + rand() * 0.15 - 0.07, 1 + rand() * 0.15 - 0.07);
      ctx.rotate(rand() * Math.PI * 2);

      // Shadow under land
      ctx.beginPath();
      ctx.ellipse(4, 4, rx + 8, ry + 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fill();

      // Base land color
      const baseGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, ry));
      baseGrad.addColorStop(0, "#2d5a27");
      baseGrad.addColorStop(0.4, "#3a7a32");
      baseGrad.addColorStop(0.7, "#2e6b28");
      baseGrad.addColorStop(1, "#1a4a1a");
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = baseGrad;
      ctx.fill();

      // Interior texture — forests, mountains
      for (let j = 0; j < 40; j++) {
        const ox = (rand() - 0.5) * rx * 1.6;
        const oy = (rand() - 0.5) * ry * 1.6;
        const sr = 4 + rand() * 14;
        const isMount = rand() > 0.7;
        const color = isMount
          ? `rgba(${70 + rand() * 40}, ${55 + rand() * 30}, ${40 + rand() * 20}, 0.7)`
          : `rgba(${25 + rand() * 40}, ${80 + rand() * 60}, ${25 + rand() * 35}, ${0.4 + rand() * 0.4})`;
        ctx.beginPath();
        ctx.arc(ox, oy, sr, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      // Snow caps on mountains
      for (let j = 0; j < 6; j++) {
        const ox = (rand() - 0.5) * rx * 0.8;
        const oy = (rand() - 0.5) * ry * 0.8;
        ctx.beginPath();
        ctx.arc(ox, oy, 3 + rand() * 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 230, 240, ${0.5 + rand() * 0.4})`;
        ctx.fill();
      }

      ctx.restore();
    });

    // Cloud layer
    for (let i = 0; i < 60; i++) {
      const x = rand() * size;
      const y = rand() * size;
      const w = 30 + rand() * 100;
      const h = 10 + rand() * 30;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rand() * 0.4 - 0.2);
      const cGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.6);
      cGrad.addColorStop(0, `rgba(255,255,255,${0.25 + rand() * 0.3})`);
      cGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.ellipse(0, 0, w * 0.5, h * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = cGrad;
      ctx.fill();
      ctx.restore();
    }

    // City lights on night side (subtle dots)
    for (let i = 0; i < 200; i++) {
      const x = rand() * size;
      const y = rand() * size;
      if (rand() > 0.6) {
        ctx.beginPath();
        ctx.arc(x, y, 0.8 + rand() * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${200 + rand() * 55}, ${180 + rand() * 60}, ${100 + rand() * 80}, ${0.3 + rand() * 0.5})`;
        ctx.fill();
      }
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  // ─── Bump / Normal map for terrain depth ────────────────────────
  const bumpTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, size, size);

    const rand = createSeededRandom(99);

    const lands = [
      { x: 0.15, y: 0.35, w: 0.22, h: 0.28 },
      { x: 0.38, y: 0.25, w: 0.12, h: 0.18 },
      { x: 0.45, y: 0.3,  w: 0.18, h: 0.32 },
      { x: 0.52, y: 0.42, w: 0.16, h: 0.26 },
      { x: 0.65, y: 0.28, w: 0.2,  h: 0.3  },
      { x: 0.72, y: 0.55, w: 0.2,  h: 0.28 },
      { x: 0.2,  y: 0.7,  w: 0.15, h: 0.15 },
      { x: 0.78, y: 0.12, w: 0.14, h: 0.12 },
    ];

    lands.forEach((land) => {
      const cx = land.x * size;
      const cy = land.y * size;
      const rx = land.w * size * 0.5;
      const ry = land.h * size * 0.5;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
      grad.addColorStop(0, "#aaa");
      grad.addColorStop(0.6, "#666");
      grad.addColorStop(1, "#222");
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Mountain peaks
      for (let j = 0; j < 8; j++) {
        const mx = cx + (rand() - 0.5) * rx * 1.2;
        const my = cy + (rand() - 0.5) * ry * 1.2;
        const mr = 5 + rand() * 12;
        const mGrad = ctx.createRadialGradient(mx, my, 0, mx, my, mr);
        mGrad.addColorStop(0, "#fff");
        mGrad.addColorStop(1, "#555");
        ctx.beginPath();
        ctx.arc(mx, my, mr, 0, Math.PI * 2);
        ctx.fillStyle = mGrad;
        ctx.fill();
      }
    });

    return new THREE.CanvasTexture(canvas);
  }, []);

  // ─── Particles ──────────────────────────────────────────────────
  const particleGeometry = useMemo(() => {
    const count = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const rand = createSeededRandom(7777);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 2.8 + rand() * 1.2;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);

      positions[i3]     = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Color: mix of blue, cyan, white
      const t = rand();
      colors[i3]     = 0.2 + t * 0.7;   // R
      colors[i3 + 1] = 0.5 + t * 0.4;   // G
      colors[i3 + 2] = 0.9 + t * 0.1;   // B
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    return geometry;
  }, []);

  // ─── Animation loop ─────────────────────────────────────────────
  useFrame((state: { clock: { getElapsedTime: () => number } }) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.15;
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = time * 0.08;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.04;
      particlesRef.current.rotation.z = time * 0.01;
    }

    if (glowRingRef.current) {
      glowRingRef.current.rotation.x = Math.sin(time * 0.3) * 0.15 + 0.5;
      glowRingRef.current.rotation.z = time * 0.06;
    }

    if (textGroupRef.current) {
      textGroupRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group>
      {/* ── Core Earth sphere with procedural texture ── */}
      <Sphere ref={meshRef} args={[2, 128, 128]}>
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.06}
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>

      {/* ── Atmosphere rim glow (back-face, blue tint) ── */}
      <Sphere ref={atmosphereRef} args={[2.18, 64, 64]}>
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* ── Outer atmosphere halo ── */}
      <Sphere args={[2.45, 64, 64]}>
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* ── Glowing orbital ring ── */}
      <mesh ref={glowRingRef}>
        <torusGeometry args={[3.2, 0.015, 16, 200]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.45} />
      </mesh>

      {/* ── Second ring (tilted) ── */}
      <mesh>
        <torusGeometry args={[3.6, 0.008, 16, 200]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.2} />
      </mesh>

      {/* ── Particle cloud ── */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial size={0.025} transparent opacity={0.7} vertexColors sizeAttenuation />
      </points>

      {/* ── Floating Text Labels ── */}
      <group ref={textGroupRef}>
        {/* Frontend Expert */}
        <Text
          position={[3.5, 1.2, 0]}
          fontSize={0.25}
          color="#60a5fa"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          Frontend Expert
        </Text>

        {/* Next.js Developer */}
        <Text
          position={[0, 3.2, 1.5]}
          fontSize={0.22}
          color="#8b5cf6"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          Next.js Developer
        </Text>

        {/* Expo Developer */}
        <Text
          position={[-3.2, 0.5, 1]}
          fontSize={0.2}
          color="#14b8a6"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          Expo Developer
        </Text>

        {/* Sohag Bhuiyan */}
        <Text
          position={[0, -3, 1]}
          fontSize={0.28}
          color="#f59e0b"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#000000"
          fontWeight={700}
        >
          SOHAG BHUIYAN
        </Text>

        {/* React Native */}
        <Text
          position={[2.8, -1.5, 1.5]}
          fontSize={0.18}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          React Native
        </Text>

        {/* TypeScript Expert */}
        <Text
          position={[-2.5, 2, -1]}
          fontSize={0.19}
          color="#a78bfa"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          TypeScript Expert
        </Text>
      </group>

      {/* ── Lighting ── */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
      <pointLight position={[8, 3, 6]}  intensity={0.9} color="#3b82f6" />
      <pointLight position={[-6, -4, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0, 8, -4]}  intensity={0.35} color="#60a5fa" />
    </group>
  );
}