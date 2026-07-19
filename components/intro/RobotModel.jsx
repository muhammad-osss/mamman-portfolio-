"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A stylized, low-poly humanoid built from primitives rather than an
// imported GLTF (no external 3D asset pipeline in this environment).
// Swap this out for a rigged GLTF model later for full photorealism —
// see README "Upgrading the robot" for guidance on where to plug it in.

const SKY = "#38BDF8";
const SKY_LIGHT = "#7DD3FC";
const METAL = "#101826";
const METAL_LIGHT = "#1C2A3D";

function GlowMat({ color = SKY, intensity = 1.4 }) {
  return (
    <meshStandardMaterial
      color={METAL}
      emissive={color}
      emissiveIntensity={intensity}
      metalness={0.6}
      roughness={0.35}
    />
  );
}

export default function RobotModel({ stage = "idle", ...props }) {
  const group = useRef();
  const head = useRef();
  const armL = useRef();
  const armR = useRef();
  const visor = useRef();
  const ring = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Ambient idle bob + sway, always running underneath stage animation
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.9) * 0.06;
      group.current.rotation.y = Math.sin(t * 0.35) * 0.06;
    }
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.6) * 0.12;
    }
    if (visor.current) {
      visor.current.material.emissiveIntensity = 1.2 + Math.sin(t * 2) * 0.3;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.4;
    }

    // Right arm: idle rest -> greet wave -> point toward CTA
    if (armR.current) {
      const target = new THREE.Euler();
      if (stage === "greet") {
        target.z = -2.1 + Math.sin(t * 6) * 0.35;
        target.x = 0.15;
      } else if (stage === "point") {
        target.z = -1.15;
        target.x = 0.5;
      } else {
        target.z = -0.15 + Math.sin(t * 0.8) * 0.03;
      }
      armR.current.rotation.z = THREE.MathUtils.damp(
        armR.current.rotation.z,
        target.z,
        6,
        delta
      );
      armR.current.rotation.x = THREE.MathUtils.damp(
        armR.current.rotation.x,
        target.x,
        6,
        delta
      );
    }

    // Left arm: raised alongside during greet, otherwise resting
    if (armL.current) {
      const targetZ = stage === "greet" ? 1.5 : 0.15 + Math.sin(t * 0.8 + 1) * 0.03;
      armL.current.rotation.z = THREE.MathUtils.damp(
        armL.current.rotation.z,
        targetZ,
        6,
        delta
      );
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Floating ring platform */}
      <mesh ref={ring} position={[0, -1.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.02, 16, 100]} />
        <meshStandardMaterial
          color={SKY}
          emissive={SKY}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Torso */}
      <mesh position={[0, -0.15, 0]}>
        <capsuleGeometry args={[0.42, 0.75, 8, 16]} />
        <GlowMat color={SKY} intensity={0.5} />
      </mesh>

      {/* Chest core light */}
      <mesh position={[0, -0.05, 0.4]}>
        <circleGeometry args={[0.14, 24]} />
        <meshStandardMaterial
          color={SKY_LIGHT}
          emissive={SKY_LIGHT}
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>

      {/* Head group */}
      <group ref={head} position={[0, 0.65, 0]}>
        <mesh>
          <capsuleGeometry args={[0.28, 0.18, 8, 16]} />
          <GlowMat color={METAL_LIGHT} intensity={0.25} />
        </mesh>
        {/* Visor */}
        <mesh ref={visor} position={[0, 0.02, 0.24]}>
          <boxGeometry args={[0.36, 0.14, 0.06]} />
          <meshStandardMaterial
            color={SKY}
            emissive={SKY_LIGHT}
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Left arm */}
      <group position={[-0.55, 0.35, 0]} rotation={[0, 0, 0.15]}>
        <group ref={armL}>
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.11, 0.55, 8, 16]} />
            <GlowMat color={METAL_LIGHT} intensity={0.3} />
          </mesh>
          <mesh position={[0, -0.65, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={SKY}
              emissive={SKY}
              emissiveIntensity={1.6}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>

      {/* Right arm (waves / points) */}
      <group position={[0.55, 0.35, 0]} rotation={[0, 0, -0.15]}>
        <group ref={armR}>
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.11, 0.55, 8, 16]} />
            <GlowMat color={METAL_LIGHT} intensity={0.3} />
          </mesh>
          <mesh position={[0, -0.65, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={SKY}
              emissive={SKY}
              emissiveIntensity={1.6}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>

      {/* Legs */}
      {[-0.2, 0.2].map((x, i) => (
        <mesh key={i} position={[x, -1.15, 0]}>
          <capsuleGeometry args={[0.13, 0.7, 8, 16]} />
          <GlowMat color={METAL_LIGHT} intensity={0.25} />
        </mesh>
      ))}
    </group>
  );
}
