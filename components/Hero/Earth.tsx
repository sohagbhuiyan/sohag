"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Text, Line } from "@react-three/drei";
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
  const networkLinesRef = useRef<THREE.Group>(null);
  const textGroupRef = useRef<THREE.Group>(null);

  // ─── Enhanced Procedural Earth Texture with Network/Data Grid ───
  const earthTexture = useMemo(() => {
    const size = 2048;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Deep ocean base with gradient
    const oceanGrad = ctx.createLinearGradient(0, 0, size, size);
    oceanGrad.addColorStop(0, "#0a1520");
    oceanGrad.addColorStop(0.3, "#0d2440");
    oceanGrad.addColorStop(0.6, "#0f3055");
    oceanGrad.addColorStop(1, "#112844");
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, size, size);

    const rand = createSeededRandom(42);

    // Data grid pattern (longitude/latitude lines)
    ctx.strokeStyle = "rgba(100, 180, 255, 0.15)";
    ctx.lineWidth = 1.5;
    
    // Horizontal lines (latitude)
    for (let i = 0; i < 12; i++) {
      const y = (size / 12) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }
    
    // Vertical lines (longitude)
    for (let i = 0; i < 24; i++) {
      const x = (size / 24) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }

    // Network nodes (data points)
    ctx.fillStyle = "rgba(100, 200, 255, 0.3)";
    for (let i = 0; i < 150; i++) {
      const x = rand() * size;
      const y = rand() * size;
      const radius = 2 + rand() * 4;
      
      // Glow effect
      const nodeGrad = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
      nodeGrad.addColorStop(0, "rgba(100, 200, 255, 0.6)");
      nodeGrad.addColorStop(0.5, "rgba(100, 200, 255, 0.3)");
      nodeGrad.addColorStop(1, "transparent");
      ctx.fillStyle = nodeGrad;
      ctx.beginPath();
      ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Core node
      ctx.fillStyle = "rgba(150, 220, 255, 0.8)";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Ocean current swirls
    for (let i = 0; i < 40; i++) {
      const x = rand() * size;
      const y = rand() * size;
      const r = 50 + rand() * 200;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(${20 + rand() * 35}, ${70 + rand() * 70}, ${130 + rand() * 90}, ${0.2 + rand() * 0.25})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }

    // Landmasses — realistic continents
    const lands = [
      { x: 0.15, y: 0.35, w: 0.25, h: 0.32 },   // North America
      { x: 0.38, y: 0.22, w: 0.14, h: 0.20 },   // Greenland
      { x: 0.46, y: 0.28, w: 0.20, h: 0.35 },   // Europe
      { x: 0.54, y: 0.44, w: 0.18, h: 0.30 },   // Africa
      { x: 0.66, y: 0.26, w: 0.24, h: 0.34 },   // Asia
      { x: 0.75, y: 0.58, w: 0.22, h: 0.30 },   // Australia
      { x: 0.22, y: 0.68, w: 0.16, h: 0.18 },   // South America
      { x: 0.80, y: 0.12, w: 0.15, h: 0.14 },   // Japan/Islands
    ];

    lands.forEach((land) => {
      const cx = land.x * size;
      const cy = land.y * size;
      const rx = land.w * size * 0.5;
      const ry = land.h * size * 0.5;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1 + rand() * 0.18 - 0.09, 1 + rand() * 0.18 - 0.09);
      ctx.rotate(rand() * Math.PI * 2);

      // Land shadow
      ctx.beginPath();
      ctx.ellipse(6, 6, rx + 12, ry + 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fill();

      // Base land with rich gradient
      const baseGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, ry));
      baseGrad.addColorStop(0, "#2d5f28");
      baseGrad.addColorStop(0.3, "#3d8035");
      baseGrad.addColorStop(0.6, "#2f6e2a");
      baseGrad.addColorStop(0.85, "#1f4f1f");
      baseGrad.addColorStop(1, "#143814");
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = baseGrad;
      ctx.fill();

      // Forests and terrain details
      for (let j = 0; j < 60; j++) {
        const ox = (rand() - 0.5) * rx * 1.7;
        const oy = (rand() - 0.5) * ry * 1.7;
        const sr = 5 + rand() * 18;
        const isMount = rand() > 0.75;
        const color = isMount
          ? `rgba(${80 + rand() * 50}, ${60 + rand() * 35}, ${45 + rand() * 25}, 0.8)`
          : `rgba(${30 + rand() * 50}, ${90 + rand() * 70}, ${30 + rand() * 40}, ${0.45 + rand() * 0.45})`;
        ctx.beginPath();
        ctx.arc(ox, oy, sr, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      // Snow caps
      for (let j = 0; j < 10; j++) {
        const ox = (rand() - 0.5) * rx * 0.9;
        const oy = (rand() - 0.5) * ry * 0.9;
        ctx.beginPath();
        ctx.arc(ox, oy, 4 + rand() * 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 240, 250, ${0.6 + rand() * 0.35})`;
        ctx.fill();
      }

      ctx.restore();
    });

    // Enhanced cloud layer
    for (let i = 0; i < 80; i++) {
      const x = rand() * size;
      const y = rand() * size;
      const w = 40 + rand() * 120;
      const h = 15 + rand() * 35;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rand() * 0.5 - 0.25);
      const cGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.7);
      cGrad.addColorStop(0, `rgba(255,255,255,${0.3 + rand() * 0.35})`);
      cGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.ellipse(0, 0, w * 0.5, h * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = cGrad;
      ctx.fill();
      ctx.restore();
    }

    // City lights (glowing dots)
    for (let i = 0; i < 300; i++) {
      const x = rand() * size;
      const y = rand() * size;
      if (rand() > 0.5) {
        const lightGrad = ctx.createRadialGradient(x, y, 0, x, y, 3);
        lightGrad.addColorStop(0, `rgba(${220 + rand() * 35}, ${200 + rand() * 55}, ${120 + rand() * 100}, ${0.6 + rand() * 0.4})`);
        lightGrad.addColorStop(1, "transparent");
        ctx.fillStyle = lightGrad;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  // ─── Enhanced Bump/Normal map ────────────────────────
  const bumpTexture = useMemo(() => {
    const size = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#181818";
    ctx.fillRect(0, 0, size, size);

    const rand = createSeededRandom(99);

    const lands = [
      { x: 0.15, y: 0.35, w: 0.25, h: 0.32 },
      { x: 0.38, y: 0.22, w: 0.14, h: 0.20 },
      { x: 0.46, y: 0.28, w: 0.20, h: 0.35 },
      { x: 0.54, y: 0.44, w: 0.18, h: 0.30 },
      { x: 0.66, y: 0.26, w: 0.24, h: 0.34 },
      { x: 0.75, y: 0.58, w: 0.22, h: 0.30 },
      { x: 0.22, y: 0.68, w: 0.16, h: 0.18 },
      { x: 0.80, y: 0.12, w: 0.15, h: 0.14 },
    ];

    lands.forEach((land) => {
      const cx = land.x * size;
      const cy = land.y * size;
      const rx = land.w * size * 0.5;
      const ry = land.h * size * 0.5;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
      grad.addColorStop(0, "#cccccc");
      grad.addColorStop(0.5, "#777777");
      grad.addColorStop(1, "#222222");
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Mountain peaks
      for (let j = 0; j < 12; j++) {
        const mx = cx + (rand() - 0.5) * rx * 1.3;
        const my = cy + (rand() - 0.5) * ry * 1.3;
        const mr = 6 + rand() * 15;
        const mGrad = ctx.createRadialGradient(mx, my, 0, mx, my, mr);
        mGrad.addColorStop(0, "#ffffff");
        mGrad.addColorStop(0.6, "#888888");
        mGrad.addColorStop(1, "#444444");
        ctx.beginPath();
        ctx.arc(mx, my, mr, 0, Math.PI * 2);
        ctx.fillStyle = mGrad;
        ctx.fill();
      }
    });

    return new THREE.CanvasTexture(canvas);
  }, []);

  // ─── Network connection lines (3D curved lines) ──────
  const networkLines = useMemo(() => {
    const rand = createSeededRandom(555);
    const lines = [];
    
    for (let i = 0; i < 30; i++) {
      const radius = 2.05;
      
      // Random points on sphere surface
      const theta1 = rand() * Math.PI * 2;
      const phi1 = Math.acos(2 * rand() - 1);
      const point1 = new THREE.Vector3(
        radius * Math.sin(phi1) * Math.cos(theta1),
        radius * Math.sin(phi1) * Math.sin(theta1),
        radius * Math.cos(phi1)
      );
      
      const theta2 = rand() * Math.PI * 2;
      const phi2 = Math.acos(2 * rand() - 1);
      const point2 = new THREE.Vector3(
        radius * Math.sin(phi2) * Math.cos(theta2),
        radius * Math.sin(phi2) * Math.sin(theta2),
        radius * Math.cos(phi2)
      );
      
      // Create arc between points
      const midPoint = point1.clone().add(point2).multiplyScalar(0.5);
      midPoint.normalize().multiplyScalar(radius + 0.3 + rand() * 0.4);
      
      const curve = new THREE.QuadraticBezierCurve3(point1, midPoint, point2);
      const points = curve.getPoints(20);
      
      lines.push({
        points,
        color: new THREE.Color().setHSL(0.55 + rand() * 0.15, 0.7, 0.6),
      });
    }
    
    return lines;
  }, []);

  // ─── Particles (data points) ────────────────────────
  const particleGeometry = useMemo(() => {
    const count = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const rand = createSeededRandom(7777);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 2.6 + rand() * 1.5;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Varied colors: blue, cyan, purple tints
      const hue = 0.5 + rand() * 0.2;
      const color = new THREE.Color().setHSL(hue, 0.7, 0.6);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      sizes[i] = 0.5 + rand() * 1.5;
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

    return geometry;
  }, []);

  // ─── Animation loop ─────────────────────────────────
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.12;
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = time * 0.06;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
      particlesRef.current.rotation.z = time * 0.02;
    }

    if (networkLinesRef.current) {
      networkLinesRef.current.rotation.y = time * 0.08;
    }

    if (textGroupRef.current) {
      textGroupRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group>
      {/* ── Core Earth sphere ── */}
      <Sphere ref={meshRef} args={[2, 256, 256]}>
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.08}
          roughness={0.65}
          metalness={0.15}
          emissive="#0a1520"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* ── Inner atmosphere glow ── */}
      <Sphere ref={atmosphereRef} args={[2.15, 128, 128]}>
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* ── Outer atmosphere halo ── */}
      <Sphere args={[2.5, 128, 128]}>
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* ── Network connection lines ── */}
      <group ref={networkLinesRef}>
        {networkLines.map((line, idx) => (
          <Line
            key={idx}
            points={line.points}
            color={line.color}
            lineWidth={1.5}
            transparent
            opacity={0.4}
          />
        ))}
      </group>

      {/* ── Particle cloud ── */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          size={0.03}
          transparent
          opacity={0.75}
          vertexColors
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ── Floating Text Labels (2-line format) ── */}
      <group ref={textGroupRef}>
        {/* Frontend Expert */}
        <group position={[2.4, 1.5, 0]}>
          <Text
            fontSize={0.22}
            color="#60a5fa"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.015}
            outlineColor="#000000"
          >
            Frontend
          </Text>
          <Text
            position={[0, -0.35, 0]}
            fontSize={0.22}
            color="#60a5fa"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.015}
            outlineColor="#000000"
          >
            Expert
          </Text>
        </group>

        {/* Next.js Developer */}
        <group position={[0, 2.3, 1.8]}>
          <Text
            fontSize={0.2}
            color="#8b5cf6"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.015}
            outlineColor="#000000"
          >
            Next.js
          </Text>
          <Text
            position={[0, -0.32, 0]}
            fontSize={0.2}
            color="#8b5cf6"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.015}
            outlineColor="#000000"
          >
            Developer
          </Text>
        </group>

        {/* Expo Developer */}
        <group position={[-2.4, 0.8, 1.2]}>
          <Text
            fontSize={0.19}
            color="#14b8a6"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.015}
            outlineColor="#000000"
          >
            Expo
          </Text>
          <Text
            position={[0, -0.3, 0]}
            fontSize={0.19}
            color="#14b8a6"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.015}
            outlineColor="#000000"
          >
            Developer
          </Text>
        </group>

        {/* Name: Sohag Bhuiyan */}
        <group position={[0, -2.3, 1.2]}>
          <Text
            fontSize={0.26}
            color="#f59e0b"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
            fontWeight={700}
          >
            SOHAG
          </Text>
          <Text
            position={[0, -0.38, 0]}
            fontSize={0.26}
            color="#f59e0b"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
            fontWeight={700}
          >
            BHUIYAN
          </Text>
        </group>

        {/* React Native */}
        <group position={[2.2, -1.8, 1.8]}>
          <Text
            fontSize={0.18}
            color="#3b82f6"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.015}
            outlineColor="#000000"
          >
            React
          </Text>
          <Text
            position={[0, -0.28, 0]}
            fontSize={0.18}
            color="#3b82f6"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.015}
            outlineColor="#000000"
          >
            Native
          </Text>
        </group>

        {/* TypeScript Expert */}
        <group position={[-3, 2.2, -1.2]}>
          <Text
            fontSize={0.19}
            color="#a78bfa"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.015}
            outlineColor="#000000"
          >
            TypeScript
          </Text>
          <Text
            position={[0, -0.3, 0]}
            fontSize={0.19}
            color="#a78bfa"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.015}
            outlineColor="#000000"
          >
            Expert
          </Text>
        </group>
      </group>

      {/* ── Enhanced Lighting ── */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 6, 6]} intensity={1.6} color="#ffffff" />
      <pointLight position={[10, 4, 8]} intensity={1.2} color="#4da6ff" />
      <pointLight position={[-8, -5, -6]} intensity={0.7} color="#8b5cf6" />
      <pointLight position={[0, 10, -5]} intensity={0.5} color="#60a5fa" />
      <hemisphereLight intensity={0.3} color="#87ceeb" groundColor="#1a1a2e" />
    </group>
  );
}