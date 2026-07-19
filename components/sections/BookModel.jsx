"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const SKY = "#38BDF8";
const SKY_LIGHT = "#7DD3FC";
const COVER = "#0A1120";

export default function BookModel({ open, ...props }) {
  const frontCover = useRef();
  const group = useRef();
  const pageStack = useRef();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
    }
    if (frontCover.current) {
      const target = open ? -Math.PI * 0.92 : 0;
      frontCover.current.rotation.y = THREE.MathUtils.damp(
        frontCover.current.rotation.y,
        target,
        4.5,
        delta
      );
    }
    if (pageStack.current) {
      const targetOpacity = open ? 1 : 0;
      pageStack.current.children.forEach((mesh, i) => {
        if (mesh.material) {
          mesh.material.opacity = THREE.MathUtils.damp(
            mesh.material.opacity,
            targetOpacity,
            5,
            delta
          );
        }
      });
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Back cover (fixed) */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[1.6, 2.1, 0.06]} />
        <meshStandardMaterial color={COVER} metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Page stack, fades in when open */}
      <group ref={pageStack} position={[0.02, 0, 0.02]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0.02 * i, 0, 0.01 + i * 0.01]}>
            <planeGeometry args={[1.5, 2]} />
            <meshStandardMaterial
              color="#0E1826"
              transparent
              opacity={0}
              emissive={SKY}
              emissiveIntensity={0.15}
            />
          </mesh>
        ))}
      </group>

      {/* Hinge + front cover */}
      <group position={[-0.78, 0, 0]}>
        <group ref={frontCover} position={[0.78, 0, 0.03]}>
          <mesh>
            <boxGeometry args={[1.6, 2.1, 0.06]} />
            <meshStandardMaterial
              color={COVER}
              metalness={0.7}
              roughness={0.3}
              emissive={SKY}
              emissiveIntensity={0.08}
            />
          </mesh>
          <mesh position={[0, 0.65, 0.035]}>
            <planeGeometry args={[1.1, 0.02]} />
            <meshStandardMaterial
              color={SKY}
              emissive={SKY}
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
          <Text
            position={[0, 0.15, 0.035]}
            fontSize={0.16}
            color={SKY_LIGHT}
            anchorX="center"
            anchorY="middle"
            maxWidth={1.2}
          >
            PORTFOLIO
          </Text>
          <Text
            position={[0, -0.15, 0.035]}
            fontSize={0.09}
            color="#7DD3FC88"
            anchorX="center"
            anchorY="middle"
          >
            tap to open
          </Text>
        </group>
      </group>
    </group>
  );
}
