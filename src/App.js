import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
  current: null,
  items: {
    BodyBase: "#ffffff",
    AV_ML_EyeBase: "#ffffff",
    AV_ML_EyePupil: "#000000",
    AV_ML_FingerNails: "#ffffff",
    AV_ML_Hair: "#ffffff",
    AV_ML_PantsBase: "#ffffff",
    AV_ML_PantsTrim: "#ffffff",
    AV_ML_ShoeBase: "#ffffff",
    AV_ML_ShoeEdge: "#ffffff",
    AV_ML_ShoeSole: "#ffffff",
    AV_ML_TshirtBase: "#666666",
    AV_ML_TshirtTrim: "#ffffff",
  },
})

function BaseAvatarMale() {
  const ref = useRef()
  const snap = useSnapshot(state)
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { nodes, materials } = useGLTF("BaseAvatarMale_08.glb")

  // Animate model
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    //ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    //ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  // Cursor showing current color
  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
      return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
    }
  }, [hovered])

  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onClick={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
      <mesh receiveShadow castShadow geometry={nodes.BaseAvatarMale.geometry} material={materials.AV_ML_BodyBase} material-color={snap.items.AV_ML_BodyBase} />
      <mesh receiveShadow castShadow geometry={nodes.BaseAvatarMale_1.geometry} material={materials.AV_ML_EyeBase} material-color={snap.items.AV_ML_EyeBase} />
      <mesh receiveShadow castShadow geometry={nodes.BaseAvatarMale_2.geometry} material={materials.AV_ML_EyePupil} material-color={snap.items.AV_ML_EyePupil} />
      <mesh receiveShadow castShadow geometry={nodes.BaseAvatarMale_3.geometry} material={materials.AV_ML_FingerNails} material-color={snap.items.AV_ML_FingerNails} />
      <mesh receiveShadow castShadow geometry={nodes.BaseAvatarMale_4.geometry} material={materials.AV_ML_Hair} material-color={snap.items.AV_ML_Hair} />
      <mesh receiveShadow castShadow geometry={nodes.BaseAvatarMale_5.geometry} material={materials.AV_ML_PantsBase} material-color={snap.items.AV_ML_PantsBase} />
      <mesh receiveShadow castShadow geometry={nodes.BaseAvatarMale_6.geometry} material={materials.AV_ML_PantsTrim} material-color={snap.items.AV_ML_PantsTrim} />
      <mesh receiveShadow castShadow geometry={nodes.BaseAvatarMale_7.geometry} material={materials.AV_ML_ShoeBase} material-color={snap.items.AV_ML_ShoeBase} />
      <mesh receiveShadow castShadow geometry={nodes.BaseAvatarMale_8.geometry} material={materials.AV_ML_ShoeSole} material-color={snap.items.AV_ML_ShoeSole} />
      <mesh receiveShadow castShadow geometry={nodes.BaseAvatarMale_9.geometry} material={materials.AV_ML_TshirtBase} material-color={snap.items.AV_ML_TshirtBase} />
      <mesh receiveShadow castShadow geometry={nodes.BaseAvatarMale_10.geometry} material={materials.AV_ML_TshirtTrim} material-color={snap.items.AV_ML_TshirtTrim} />
    </group>
  )
}

function Picker() {
  const snap = useSnapshot(state)
  return (
    <div style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1>{snap.current}</h1>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 1], fov: 80 }}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Suspense fallback={null}>
          <BaseAvatarMale />
          <Environment preset="city" />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={0.8} />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
      </Canvas>
      <Picker />
    </>
  )
}
