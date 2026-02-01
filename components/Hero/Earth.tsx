"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Line } from "@react-three/drei";
import * as THREE from "three";

// Seeded random generator
function createSeededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function AINetworkCircle() {
  const circleRef = useRef<THREE.Group>(null);
  const webLinesRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const orbitingNodesRef = useRef<THREE.Group>(null);
  const pulseRingsRef = useRef<THREE.Group>(null);
  const textGroupRef = useRef<THREE.Group>(null);

  // ─── Main Network Globe (Transparent Sphere with Grid) ───
  const globeGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(2.0, 64, 64);
    return geometry;
  }, []);

  // ─── Spider Web Network Lines (3D Globe) ───
  const webLines = useMemo(() => {
    const rand = createSeededRandom(555);
    const lines = [];
    const radius = 2.05;
    const latLines = 12;
    const lonLines = 24;

    // Latitude lines (horizontal rings around globe)
    for (let lat = 0; lat < latLines; lat++) {
      const theta = (lat / latLines) * Math.PI;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      const points = [];
      
      for (let i = 0; i <= lonLines; i++) {
        const phi = (i / lonLines) * Math.PI * 2;
        points.push(new THREE.Vector3(
          radius * sinTheta * Math.cos(phi),
          radius * sinTheta * Math.sin(phi),
          radius * cosTheta
        ));
      }
      
      lines.push({
        points,
        color: new THREE.Color().setHSL(0.55 + rand() * 0.1, 0.8, 0.6),
        opacity: 0.3 + (lat / latLines) * 0.3,
      });
    }

    // Longitude lines (vertical lines from pole to pole)
    for (let lon = 0; lon < lonLines; lon++) {
      const phi = (lon / lonLines) * Math.PI * 2;
      const points = [];
      
      for (let i = 0; i <= latLines * 2; i++) {
        const theta = (i / (latLines * 2)) * Math.PI;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        
        points.push(new THREE.Vector3(
          radius * sinTheta * Math.cos(phi),
          radius * sinTheta * Math.sin(phi),
          radius * cosTheta
        ));
      }
      
      lines.push({
        points,
        color: new THREE.Color().setHSL(0.6 + rand() * 0.15, 0.9, 0.5),
        opacity: 0.35,
      });
    }

    // Connecting arcs (spider web connections across globe)
    for (let i = 0; i < 60; i++) {
      const theta1 = rand() * Math.PI;
      const phi1 = rand() * Math.PI * 2;
      const theta2 = rand() * Math.PI;
      const phi2 = rand() * Math.PI * 2;
      
      const p1 = new THREE.Vector3(
        radius * Math.sin(theta1) * Math.cos(phi1),
        radius * Math.sin(theta1) * Math.sin(phi1),
        radius * Math.cos(theta1)
      );
      
      const p2 = new THREE.Vector3(
        radius * Math.sin(theta2) * Math.cos(phi2),
        radius * Math.sin(theta2) * Math.sin(phi2),
        radius * Math.cos(theta2)
      );
      
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(radius + 0.2 + rand() * 0.3);
      
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      lines.push({
        points: curve.getPoints(20),
        color: new THREE.Color().setHSL(0.52 + rand() * 0.2, 0.85, 0.55),
        opacity: 0.25 + rand() * 0.25,
      });
    }

    return lines;
  }, []);

  // ─── Data Particles (flowing through network) ───
  const particleGeometry = useMemo(() => {
    const count = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities = new Float32Array(count * 3);

    const rand = createSeededRandom(7777);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 2.1 + rand() * 0.8;
      const theta = Math.acos(2 * rand() - 1);
      const phi = rand() * Math.PI * 2;

      positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i3 + 2] = radius * Math.cos(theta);

      // AI-themed colors: cyan, blue, purple, pink
      const colorType = rand();
      let color;
      if (colorType < 0.3) {
        color = new THREE.Color().setHSL(0.55, 0.9, 0.6); // Cyan
      } else if (colorType < 0.6) {
        color = new THREE.Color().setHSL(0.65, 0.85, 0.55); // Blue
      } else if (colorType < 0.85) {
        color = new THREE.Color().setHSL(0.75, 0.8, 0.6); // Purple
      } else {
        color = new THREE.Color().setHSL(0.85, 0.9, 0.65); // Pink
      }
      
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      sizes[i] = 0.02 + rand() * 0.04;
      
      // Tangential velocity for orbital motion
      const vTheta = (rand() - 0.5) * 0.008;
      const vPhi = (rand() - 0.5) * 0.012;
      
      velocities[i3] = vTheta;
      velocities[i3 + 1] = vPhi;
      velocities[i3 + 2] = (rand() - 0.5) * 0.004;
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
    geometry.userData.velocities = velocities;

    return geometry;
  }, []);

  // ─── Orbiting Data Nodes ───
  const orbitingNodes = useMemo(() => {
    const rand = createSeededRandom(999);
    const nodes = [];
    const count = 20;
    
    for (let i = 0; i < count; i++) {
      const theta = Math.acos(2 * rand() - 1);
      const phi = rand() * Math.PI * 2;
      const radius = 2.15;
      
      nodes.push({
        position: new THREE.Vector3(
          radius * Math.sin(theta) * Math.cos(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(theta)
        ),
        color: new THREE.Color().setHSL(0.5 + rand() * 0.3, 0.9, 0.6),
        size: 0.06 + rand() * 0.04,
        speed: 0.3 + rand() * 0.5,
      });
    }
    
    return nodes;
  }, []);

  // ─── Pulse Rings (expanding waves) ───
  const pulseRings = useMemo(() => {
    return [
      { delay: 0, color: "#00d9ff", opacity: 0.6 },
      { delay: 0.5, color: "#4d7cff", opacity: 0.5 },
      { delay: 1.0, color: "#a855f7", opacity: 0.4 },
    ];
  }, []);

  // ─── Animation loop ───
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (circleRef.current) {
      circleRef.current.rotation.y = time * 0.15;
      circleRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }

    if (webLinesRef.current) {
      webLinesRef.current.rotation.y = time * 0.08;
      webLinesRef.current.rotation.z = time * 0.03;
    }

    // Animate particles in 3D
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const velocities = particlesRef.current.geometry.userData.velocities;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        // Convert to spherical coordinates
        const r = Math.sqrt(x * x + y * y + z * z);
        let theta = Math.acos(z / r);
        let phi = Math.atan2(y, x);
        
        // Update angles
        theta += velocities[i];
        phi += velocities[i + 1];
        
        // Keep theta in valid range
        theta = Math.max(0.1, Math.min(Math.PI - 0.1, theta));
        
        // Convert back to Cartesian
        const newR = r + velocities[i + 2];
        positions[i] = newR * Math.sin(theta) * Math.cos(phi);
        positions[i + 1] = newR * Math.sin(theta) * Math.sin(phi);
        positions[i + 2] = newR * Math.cos(theta);
        
        // Reset if too far
        const dist = Math.sqrt(positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2);
        if (dist > 3.5 || dist < 1.8) {
          const resetTheta = Math.acos(2 * Math.random() - 1);
          const resetPhi = Math.random() * Math.PI * 2;
          const resetR = 2.1 + Math.random() * 0.5;
          positions[i] = resetR * Math.sin(resetTheta) * Math.cos(resetPhi);
          positions[i + 1] = resetR * Math.sin(resetTheta) * Math.sin(resetPhi);
          positions[i + 2] = resetR * Math.cos(resetTheta);
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Rotate orbiting nodes
    if (orbitingNodesRef.current) {
      orbitingNodesRef.current.rotation.y = time * 0.25;
      orbitingNodesRef.current.rotation.x = time * 0.1;
    }

    // Pulse rings
    if (pulseRingsRef.current) {
      pulseRingsRef.current.children.forEach((ring, idx) => {
        const scale = 1 + ((time * 0.5 + pulseRings[idx].delay) % 2);
        ring.scale.set(scale, scale, scale);
        const mat = (ring as THREE.Mesh).material;
        if (Array.isArray(mat)) {
          mat.forEach((m: any) => m.opacity = Math.max(0, 0.5 - scale * 0.25));
        } else {
          (mat as any).opacity = Math.max(0, 0.5 - scale * 0.25);
        }
      });
      pulseRingsRef.current.rotation.y = time * 0.2;
    }

    if (textGroupRef.current) {
      textGroupRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <group>
      {/* ── Main Globe Sphere ── */}
      <group ref={circleRef}>
        <mesh geometry={globeGeometry}>
          <meshBasicMaterial
            color="#00d9ff"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
            wireframe={false}
          />
        </mesh>
        
        {/* Wireframe overlay */}
        <mesh geometry={globeGeometry}>
          <meshBasicMaterial
            color="#00d9ff"
            transparent
            opacity={0.3}
            wireframe={true}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* ── Spider Web Network Lines ── */}
      <group ref={webLinesRef}>
        {webLines.map((line, idx) => (
          <Line
            key={idx}
            points={line.points}
            color={line.color}
            lineWidth={1.2}
            transparent
            opacity={line.opacity}
          />
        ))}
      </group>

      {/* ── Particle System ── */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          size={0.04}
          transparent
          opacity={0.8}
          vertexColors
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ── Orbiting Data Nodes ── */}
      <group ref={orbitingNodesRef}>
        {orbitingNodes.map((node, idx) => (
          <mesh key={idx} position={node.position}>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.9}
              blending={THREE.AdditiveBlending}
            />
            {/* Glow effect */}
            <mesh>
              <sphereGeometry args={[node.size * 2, 16, 16]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </mesh>
        ))}
      </group>

      {/* ── Pulse Rings (3D Shells) ── */}
      <group ref={pulseRingsRef}>
        {pulseRings.map((ring, idx) => (
          <mesh key={idx}>
            <sphereGeometry args={[2.0, 32, 32]} />
            <meshBasicMaterial
              color={ring.color}
              transparent
              opacity={ring.opacity}
              wireframe={true}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>

      {/* ── Center Core Glow ── */}
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial
          color="#4d7cff"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ── Floating Text Labels (3D distributed) ── */}
      <group ref={textGroupRef}>
        {/* Frontend Expert */}
        <group position={[2.8, 1.0, 0.5]}>
          <Text
            fontSize={0.18}
            color="#00d9ff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            Frontend
          </Text>
          <Text
            position={[0, -0.28, 0]}
            fontSize={0.18}
            color="#00d9ff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            Expert
          </Text>
        </group>

        {/* Next.js Developer */}
        <group position={[0.5, 2.8, 1.0]}>
          <Text
            fontSize={0.17}
            color="#a855f7"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            Next.js
          </Text>
          <Text
            position={[0, -0.26, 0]}
            fontSize={0.17}
            color="#a855f7"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            Developer
          </Text>
        </group>

        {/* Expo Developer */}
        <group position={[-2.6, 0.8, 1.2]}>
          <Text
            fontSize={0.16}
            color="#14b8a6"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            Expo
          </Text>
          <Text
            position={[0, -0.24, 0]}
            fontSize={0.16}
            color="#14b8a6"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            Developer
          </Text>
        </group>

        {/* Name: Sohag Bhuiyan */}
        <group position={[0, -2.2, 1.0]}>
          <Text
            fontSize={0.24}
            color="#f59e0b"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.025}
            outlineColor="#000000"
            fontWeight={700}
          >
            SOHAG
          </Text>
          <Text
            position={[0, -0.35, 0]}
            fontSize={0.24}
            color="#f59e0b"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.025}
            outlineColor="#000000"
            fontWeight={700}
          >
            BHUIYAN
          </Text>
        </group>

        {/* React Native */}
        <group position={[2.2, -1.8, 1.5]}>
          <Text
            fontSize={0.16}
            color="#4d7cff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            React
          </Text>
          <Text
            position={[0, -0.24, 0]}
            fontSize={0.16}
            color="#4d7cff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            Native
          </Text>
        </group>

        {/* TypeScript Expert */}
        <group position={[-2.0, 1.5, -1.2]}>
          <Text
            fontSize={0.16}
            color="#a78bfa"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            TypeScript
          </Text>
          <Text
            position={[0, -0.24, 0]}
            fontSize={0.16}
            color="#a78bfa"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            Expert
          </Text>
        </group>
      </group>

      {/* ── Enhanced Lighting for AI Vibe ── */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 3]} intensity={1.5} color="#00d9ff" />
      <pointLight position={[3, 3, 2]} intensity={1.0} color="#a855f7" />
      <pointLight position={[-3, -3, 2]} intensity={0.8} color="#4d7cff" />
      <pointLight position={[0, 0, -2]} intensity={0.6} color="#00ffff" />
    </group>
  );
}