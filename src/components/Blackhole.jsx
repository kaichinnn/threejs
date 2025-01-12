import { useGLTF, useAnimations } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import blackholeScene from '../assets/3d/blackhole.glb';

const Blackhole = ({ scale, position }) => {
    const blackholeRef = useRef();
    const { scene, animations } = useGLTF(blackholeScene);
    const { actions } = useAnimations(animations, blackholeRef);
    
    useEffect(() => {
        // Play all animations if they exist
        Object.values(actions).forEach(action => {
            if (action) {
                action.play();
            }
        });
    }, [actions]);

    // Add subtle rotating and pulsing animation
    useFrame((state) => {
        if (blackholeRef.current) {
            const t = state.clock.getElapsedTime();
            
            // Subtle vertical float
            blackholeRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.05;
            
            // Rotation effect
            blackholeRef.current.rotation.y = t * 0.2;
            
            // Optional scale pulsing effect
            const pulseScale = 1 + Math.sin(t * 0.5) * 0.05;
            blackholeRef.current.scale.set(
                scale[0] * pulseScale, 
                scale[1] * pulseScale, 
                scale[2] * pulseScale
            );
        }
    });

    return (
        <mesh
            ref={blackholeRef}
            position={position}
            scale={scale}
            rotation={[0, 0, 0.2]}
        >
            <primitive object={scene} />
        </mesh>
    );
};

const BlackholeCanvas = () => {
    const [position, setPosition] = useState([0, 0, 0]);
    const [scale, setScale] = useState([1, 1, 1]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            
            // Calculate vertical position based on scroll
            const startY = -1;
            const endY = 9;
            const newY = startY + (endY - startY) * scrollProgress;
            
            // Calculate x position based on screen size
            let x;
            if (window.innerWidth < 1026 && window.innerWidth >= 768) {
                // iPad Pro range - position slightly to the left
                x = 2;
            } else if (window.innerWidth < 768) {
                // Mobile - keep centered
                x = 1.5;
            } else {
                // Larger screens - right side
                x = 5;
            }
            
            setPosition([x, newY, 0]);
        };

        const handleResize = () => {
            if (window.innerWidth < 768) {
                setScale([0.2, 0.2, 0.2]);
            } else if (window.innerWidth < 1024) {
                setScale([0.3, 0.3, 0.3]);
            } else if (window.innerWidth < 1280) {
                setScale([0.4, 0.4, 0.4]);
            } else if (window.innerWidth < 1536) {
                setScale([0.45, 0.45, 0.45]);
            } else {
                setScale([0.3, 0.3, 0.3]);
            }
        };

        handleResize();
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Canvas 
            className="w-full h-screen" 
            camera={{ position: [0, 0, 5], near: 0.1, far: 1000 }}
        >
            <Suspense fallback={null}>
                {/* Space-themed lighting with more dramatic setup for a blackhole */}
                <ambientLight intensity={0.1} /> {/* Very dim ambient light */}
                <directionalLight position={[5, 5, 5]} intensity={0.3} color="#1c1c2c" /> {/* Dark blue-tinted main light */}
                <pointLight position={[-5, -5, -5]} intensity={0.2} color="#4a0000" /> {/* Deep red accent light */}
                <pointLight position={[0, 0, 2]} intensity={0.1} color="#000080" /> {/* Subtle dark blue front light */}

                {/* Add dense fog for mysterious depth */}
                <fog attach="fog" args={['#000000', 3, 25]} />

                <Blackhole 
                    scale={scale} 
                    position={position} 
                />
            </Suspense>
        </Canvas>
    );
};

export default BlackholeCanvas;