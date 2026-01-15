import { Canvas } from '@react-three/fiber'
import { Sparkles, Float } from '@react-three/drei'
import upSideDownImg from '../assets/upSideDown.jpg'

function Scene() {
    return (
        <>
            <ambientLight intensity={0.3} />

            <mesh position={[0, -6, -5]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[30, 20]} />
                <meshBasicMaterial color="#1a1a2e" transparent={true} opacity={0.4} />
            </mesh>

            <Float
                speed={1}
                rotationIntensity={0.2}
                floatIntensity={0.3}
            >
                <Sparkles
                    count={300}
                    scale={[20, 20, 10]}
                    size={8}
                    speed={0.3}
                    opacity={0.5}
                    color="#8b9dc3"
                    noise={1}
                />
            </Float>

            <Sparkles
                count={200}
                scale={[50, 50, 20]}
                size={8}
                speed={1}
                opacity={0.4}
                color="#a0a0a0"
                noise={2}
            />

            <Sparkles
                count={100}
                scale={[50, 50, 30]}
                size={8}
                speed={1}
                opacity={0.3}
                color="#6b8cae"
                noise={3}
            />

            <Sparkles
                count={50}
                scale={[50, 50, 20]}
                size={8}
                speed={1}
                opacity={0.6}
                color="#ffffff"
                noise={1.5}
            />
        </>
    )
}

export default function UpsideDownScene() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${upSideDownImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.4,
                }}
            />

            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ background: 'transparent', position: 'relative', zIndex: 1 }}
                gl={{ alpha: true, antialias: true }}
            >
                <Scene />
            </Canvas>
        </div>
    )
}