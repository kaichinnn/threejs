import { useAnimations, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState, useLayoutEffect } from 'react';
import charcoalScene from '../assets/3d/charcoal.glb';

const Charcoal = ({ scale, position }) => {
    const charcoalRef = useRef();
    const { scene, animations } = useGLTF(charcoalScene);
    const { actions } = useAnimations(animations, charcoalRef);
    
    useEffect(() => {
        // Play all animations if they exist
        Object.values(actions).forEach(action => {
            if (action) {
                action.play();
            }
        });
    }, [actions]);

    return (
        <mesh
            ref={charcoalRef}
            position={position}
            scale={scale}
            rotation={[0, 3.5, 0]} // 45-degree rotation around Y axis
        >
            <primitive object={scene} />
        </mesh>
    );
};

const CharcoalCanvas = () => {
    const [scale, setScale] = useState([0.12, 0.12, 0.12]);

    // Update scale based on window width for responsiveness
    useLayoutEffect(() => {
        const updateScale = () => {
            if (window.innerWidth <= 768) {
                setScale([0.08, 0.08, 0.08]);  // Smaller scale for mobile
            } else {
                setScale([0.12, 0.12, 0.12]);  // Default scale for larger screens
            }
        };

        window.addEventListener('resize', updateScale);
        updateScale();  // Initial scale adjustment on mount

        return () => window.removeEventListener('resize', updateScale);  // Cleanup on unmount
    }, []);

    return (
        <div className="w-auto h-30 -ml-16 -mr-24 -mt-16">
            <Canvas
                className="w-full h-full"
                camera={{ position: [0, 0, 2.8], near: 0.1, far: 1000 }}
            >
                <Suspense fallback={null}>
                    {/* Basic lighting setup */}
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={0.8} />

                    <Charcoal 
                        scale={scale}
                        position={[0, -1, 0]}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default CharcoalCanvas;
