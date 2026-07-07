'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useMemo, useRef, useEffect, Suspense } from 'react'
import * as THREE from 'three'
import { projects } from '@/lib/portfolio-data'

/* ---------- Camera Path Keyframes ---------- */
const cameraKeyframes = [
  { p: 0.0, pos: [0, 2.0, 9.0], lookAt: [0, 0, 0] },
  { p: 0.25, pos: [3.0, 0.5, 7.5], lookAt: [0, 0, 0] },
  { p: 0.5, pos: [-3.0, -1.5, 7.0], lookAt: [0, -1.5, 0] },
  { p: 0.75, pos: [0, -4.5, 6.0], lookAt: [0, -4.5, -4.0] },
  { p: 1.0, pos: [0, -8.0, 8.5], lookAt: [0, -8.0, 0] }
]

function getInterpolatedState(progress: number) {
  const safeProgress = Math.max(0, Math.min(1, progress))
  let i = 0
  for (; i < cameraKeyframes.length - 1; i++) {
    if (safeProgress <= cameraKeyframes[i + 1].p) break
  }
  
  // Guard against array out of bounds just in case
  const kf1 = cameraKeyframes[i]
  const kf2 = cameraKeyframes[i + 1] || cameraKeyframes[i]
  
  const segmentProgress = kf2.p === kf1.p ? 0 : (safeProgress - kf1.p) / (kf2.p - kf1.p)

  const pos = new THREE.Vector3().fromArray(kf1.pos).lerp(new THREE.Vector3().fromArray(kf2.pos), segmentProgress)
  const lookAt = new THREE.Vector3().fromArray(kf1.lookAt).lerp(new THREE.Vector3().fromArray(kf2.lookAt), segmentProgress)

  return { pos, lookAt }
}

/* ---------- 3D Hero Crystal Shape ---------- */
function HeroCrystal() {
  const meshRef = useRef<THREE.Group>(null)

  const isDragging = useRef(false)
  const previousMouse = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0.002, y: 0.003 })

  const mouse3D = useRef(new THREE.Vector3(0, 0, 0))

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.8, 1), [])

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffedd5', // Warm peach glass
    emissive: '#fed7aa', // Soft orange inner glow
    emissiveIntensity: 0.4,
    roughness: 0.1,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transmission: 0.85,
    thickness: 2.0,
    flatShading: true,
    transparent: true,
    opacity: 0.95
  }), [])

  // Shader wireframe material with local proximity mouse glow (dark lines glowing bright orange)
  const wireMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uMouse3D: { value: new THREE.Vector3(0, 0, 0) },
      uGlobalGlow: { value: 0.0 },
    },
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uMouse3D;
      uniform float uGlobalGlow;
      varying vec3 vWorldPos;
      void main() {
        // Base dark warm brown lines
        vec3 baseColor = vec3(0.23, 0.09, 0.01);
        float baseAlpha = 0.18;
        
        // Calculate distance from this pixel on the wireframe to the mouse 3D position
        float dist = distance(vWorldPos, uMouse3D);
        
        // Localized glow (bright orange when mouse is close)
        float localGlow = clamp(1.0 - (dist * 0.55), 0.0, 1.0);
        localGlow = pow(localGlow, 2.5); // sharpen the falloff
        
        // Blend between base line color and bright glowing orange
        vec3 glowColor = vec3(0.92, 0.35, 0.05); // vibrant warm orange
        vec3 finalColor = mix(baseColor, glowColor, localGlow + uGlobalGlow);
        
        float finalAlpha = clamp(baseAlpha + localGlow * 0.82 + uGlobalGlow * 0.5, 0.0, 1.0);
        
        gl_FragColor = vec4(finalColor, finalAlpha);
      }
    `,
    wireframe: true,
    transparent: true,
    depthWrite: false,
  }), [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += velocity.current.x
      meshRef.current.rotation.x += velocity.current.y

      if (!isDragging.current) {
        velocity.current.x = THREE.MathUtils.lerp(velocity.current.x, 0.002, 0.05)
        velocity.current.y = THREE.MathUtils.lerp(velocity.current.y, 0.003, 0.05)
      }

      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, state.pointer.x * 0.4, 0.08)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, (Math.sin(state.clock.elapsedTime * 0.8) * 0.15) + state.pointer.y * 0.3, 0.08)
    }

    // Raycast to find intersection point on the crystal to update uMouse3D
    mouse3D.current.set(state.pointer.x * 5.0, state.pointer.y * 3.0, 1.5)
    wireMaterial.uniforms.uMouse3D.value.lerp(mouse3D.current, 0.2)
    wireMaterial.uniforms.uGlobalGlow.value = THREE.MathUtils.lerp(wireMaterial.uniforms.uGlobalGlow.value, isDragging.current ? 0.3 : 0.0, delta * 5.0)
  })

  useEffect(() => {
    const handlePointerUp = () => { isDragging.current = false }
    window.addEventListener('pointerup', handlePointerUp)
    return () => window.removeEventListener('pointerup', handlePointerUp)
  }, [])

  return (
    <group
      ref={meshRef}
      position={[0, 0.2, 0]}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'grab'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
      }}
      onPointerDown={(e) => {
        e.stopPropagation()
        isDragging.current = true
        document.body.style.cursor = 'grabbing'
        previousMouse.current = { x: e.clientX, y: e.clientY }
      }}
      onPointerMove={(e) => {
        e.stopPropagation()
        if (isDragging.current) {
          const deltaX = e.clientX - previousMouse.current.x
          const deltaY = e.clientY - previousMouse.current.y
          velocity.current.x = deltaX * 0.006
          velocity.current.y = deltaY * 0.006
          previousMouse.current = { x: e.clientX, y: e.clientY }
        }
      }}
    >
      <mesh geometry={geometry} material={material} />
      <mesh geometry={geometry} material={wireMaterial} scale={1.005} />
    </group>
  )
}

/* ---------- 3D Glass Encased Project Cards ---------- */
function GlassProjectCards() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      const children = groupRef.current.children
      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        child.position.y = child.userData.baseY + Math.sin(state.clock.elapsedTime * 0.8 + i) * 0.12
        child.rotation.y = Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.08
        child.rotation.x = Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.05
      }
    }
  })

  const cardData = useMemo(() => {
    return projects.map((p, i) => {
      const x = (i % 2 === 0 ? -2.4 : 2.4)
      const y = -4.5 + (i < 2 ? 0.8 : -0.8)
      const z = -1.5

      let accentColor = '#ea580c'
      if (p.accent === 'cyan') accentColor = '#ea580c'
      else if (p.accent === 'magenta') accentColor = '#f97316'
      else if (p.accent === 'violet') accentColor = '#d97706'
      else if (p.accent === 'gold') accentColor = '#7c2d12'

      return {
        ...p,
        position: [x, y, z] as [number, number, number],
        accentColor,
      }
    })
  }, [])

  return (
    <group ref={groupRef}>
      {cardData.map((project, i) => (
        <group key={project.title} position={project.position} userData={{ baseY: project.position[1] }}>
          <mesh>
            <boxGeometry args={[2.0, 1.3, 0.25]} />
            <meshPhysicalMaterial
              color="#ffedd5" // Warm peach card
              transmission={0.8}
              thickness={1.2}
              roughness={0.12}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              transparent
              opacity={0.9}
            />
          </mesh>
          <mesh scale={1.02}>
            <boxGeometry args={[2.0, 1.3, 0.25]} />
            <meshBasicMaterial
              color={project.accentColor}
              wireframe
              transparent
              opacity={0.25}
            />
          </mesh>
          <Text
            position={[-0.7, 0.35, 0.16]}
            fontSize={0.25}
            font="https://fonts.gstatic.com/s/orbitron/v30/yJnKeDCoZ35ld94Tgt51Qo3s2c4.woff"
            color={project.accentColor}
            anchorX="left"
            anchorY="middle"
          >
            {`0${i + 1}`}
          </Text>
          <Text
            position={[-0.7, -0.1, 0.16]}
            fontSize={0.14}
            maxWidth={1.4}
            color="#3b1803" // Dark warm brown text
            anchorX="left"
            anchorY="middle"
          >
            {project.title}
          </Text>
          <Text
            position={[-0.7, -0.45, 0.16]}
            fontSize={0.09}
            color="#78350f" // Medium warm brown
            anchorX="left"
            anchorY="middle"
          >
            {project.category.toUpperCase()}
          </Text>
        </group>
      ))}
    </group>
  )
}

/* ---------- Custom Volumetric / Swirling Particles ---------- */
interface DustParticlesProps {
  scrollSpeedRef: React.RefObject<number>
  hoverActiveRef: React.RefObject<boolean>
}

function DustParticles({ scrollSpeedRef, hoverActiveRef }: DustParticlesProps) {
  const ref = useRef<THREE.Points>(null)

  const { positions, colors, sizes, phases, targetPositions } = useMemo(() => {
    const count = 12000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)
    const targetPositions = new Float32Array(count * 3)

    const color1 = new THREE.Color('#ea580c') // Saturated orange
    const color2 = new THREE.Color('#f97316') // Warm orange
    const color3 = new THREE.Color('#78350f') // Deep warm amber for contrast

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Spread further out to ensure they are seen across the page
      positions[i3] = (Math.random() - 0.5) * 45
      positions[i3 + 1] = (Math.random() - 0.5) * 45
      positions[i3 + 2] = (Math.random() - 0.5) * 45

      const mix = Math.random()
      let color = color1.clone()
      if (mix > 0.6) {
        color.lerp(color2, (mix - 0.6) * 2.5)
      } else {
        color.lerp(color3, mix * 1.5)
      }

      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      sizes[i] = Math.random() * 2.2 + 0.6
      phases[i] = Math.random() * Math.PI * 2

      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const radius = 3.0 + Math.random() * 1.0

      targetPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      targetPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + 0.5
      targetPositions[i3 + 2] = radius * Math.cos(phi)
    }

    return { positions, colors, sizes, phases, targetPositions }
  }, [])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uScrollSpeed: { value: 0 },
        uHoverProgress: { value: 0 }
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uScrollSpeed;
        uniform float uHoverProgress;

        attribute float size;
        attribute float phase;
        attribute vec3 targetPosition;

        varying vec3 vColor;
        varying float vGlow;

        void main() {
          vColor = color;
          vec3 pos = position;

          // Stronger fluid swirl
          pos.x += sin(uTime * 0.4 + phase) * 1.2;
          pos.y += cos(uTime * 0.3 + phase) * 1.2;
          pos.z += sin(uTime * 0.5 + phase) * 1.2;

          pos.y += uScrollSpeed * 15.0 * (0.8 + sin(phase));

          if (uHoverProgress > 0.0) {
            pos = mix(pos, targetPosition, uHoverProgress);
          }

          vec3 mouse3D = vec3(uMouse.x * 15.0, uMouse.y * 10.0, 0.0);
          float distToMouse = distance(pos, mouse3D);
          if (distToMouse < 6.0) {
            vec3 pushDir = normalize(pos - mouse3D);
            pos += pushDir * (6.0 - distToMouse) * 2.5 * (1.0 - uHoverProgress);
          }

          if (pos.y < -22.0) pos.y = 22.0;
          if (pos.y > 22.0) pos.y = -22.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;

          vGlow = uHoverProgress * 0.6;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vGlow;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = (0.5 - dist) * 2.0;
          vec3 finalColor = vColor + vec3(vGlow); 
          gl_FragColor = vec4(finalColor, alpha * 0.75);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.NormalBlending // Normal blending so they look like dark warm dust on light background
    })
  }, [])

  const hoverTargetVal = useRef(0)

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03

      const targetHover = (hoverActiveRef.current ?? false) ? 1.0 : 0.0
      hoverTargetVal.current = THREE.MathUtils.lerp(hoverTargetVal.current, targetHover, delta * 3.0)

      material.uniforms.uTime.value = state.clock.elapsedTime
      material.uniforms.uScrollSpeed.value = scrollSpeedRef.current ?? 0
      material.uniforms.uHoverProgress.value = hoverTargetVal.current
      material.uniforms.uMouse.value.lerp(state.pointer, 0.1)
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-phase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-targetPosition" args={[targetPositions, 3]} />
      </bufferGeometry>
      <primitive object={material} attach="material" />
    </points>
  )
}

/* ---------- God Rays (Volumetric Lighting) ---------- */
function GodRays() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.02
      group.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.1) * 0.015
    }
  })

  return (
    <group ref={group} position={[0, 15, -10]}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          position={[(Math.random() - 0.5) * 16, 0, (Math.random() - 0.5) * 8]}
          rotation={[Math.PI, 0, (Math.random() - 0.5) * 0.35]}
        >
          <cylinderGeometry args={[0.04, 6 + Math.random() * 4, 30, 16, 1, true]} />
          <meshBasicMaterial
            color="#fed7aa" // Warm peach light rays
            transparent
            opacity={0.03 + Math.random() * 0.02} // slightly more visible
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ---------- Scroll-Linked Camera Rig ---------- */
interface CameraRigProps {
  scrollProgressRef: React.RefObject<number>
  scrollSpeedRef: React.RefObject<number>
  pointerParallaxRef: React.RefObject<THREE.Vector2>
}

function CameraRig({ scrollProgressRef, scrollSpeedRef, pointerParallaxRef }: CameraRigProps) {
  const { camera } = useThree()
  const targetPos = useMemo(() => new THREE.Vector3(), [])
  const targetLook = useMemo(() => new THREE.Vector3(), [])
  const currentLook = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((_, delta) => {
    // Decay scroll speed ref
    if (scrollSpeedRef.current !== undefined) {
      scrollSpeedRef.current = THREE.MathUtils.lerp(scrollSpeedRef.current, 0, delta * 3.0)
    }

    const progress = scrollProgressRef.current ?? 0
    const { pos, lookAt } = getInterpolatedState(progress)

    targetPos.copy(pos)
    if (pointerParallaxRef.current) {
      targetPos.x += pointerParallaxRef.current.x * 0.8
      targetPos.y += pointerParallaxRef.current.y * 0.6
    }

    camera.position.lerp(targetPos, delta * 2.5)

    targetLook.copy(lookAt)
    currentLook.current.lerp(targetLook, delta * 3.0)
    camera.lookAt(currentLook.current)
  })

  return null
}

/* ---------- Main CosmicScene Wrapper ---------- */
export default function CosmicScene() {
  const scrollProgressRef = useRef(0)
  const scrollSpeedRef = useRef(0)
  const hoverActiveRef = useRef(false)
  const pointerParallaxRef = useRef(new THREE.Vector2(0, 0))
  const prevScrollYRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll > 0) {
        scrollProgressRef.current = scrollY / maxScroll
      }

      const deltaScroll = Math.abs(scrollY - prevScrollYRef.current)
      scrollSpeedRef.current = Math.min(2.5, scrollSpeedRef.current + deltaScroll * 0.008)
      prevScrollYRef.current = scrollY
    }

    const handleMouseMove = (e: MouseEvent) => {
      pointerParallaxRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerParallaxRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1

      const distFromCenter = Math.sqrt(
        pointerParallaxRef.current.x * pointerParallaxRef.current.x +
        pointerParallaxRef.current.y * pointerParallaxRef.current.y
      )
      hoverActiveRef.current = distFromCenter < 0.3
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 2.0, 9.0], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }}
    >
      <color attach="background" args={['#fff7ed']} />
      <fog attach="fog" args={['#fff7ed', 10, 32]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff7ed" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#fed7aa" />

      <DustParticles scrollSpeedRef={scrollSpeedRef} hoverActiveRef={hoverActiveRef} />
      <GodRays />
      <Suspense fallback={null}>
        <GlassProjectCards />
      </Suspense>
      <HeroCrystal />

      <CameraRig
        scrollProgressRef={scrollProgressRef}
        scrollSpeedRef={scrollSpeedRef}
        pointerParallaxRef={pointerParallaxRef}
      />
    </Canvas>
  )
}
