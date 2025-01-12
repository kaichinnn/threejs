import { useGLTF, useAnimations } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import cloudStationScene from '../assets/3d/cloud_station.glb';

const CloudStation = ({ scale, position }) => {
    const cloudStationRef = useRef();
    const { scene, animations } = useGLTF(cloudStationScene);
    const { actions } = useAnimations(animations, cloudStationRef);
    
    useEffect(() => {
        // Play all animations if they exist
        Object.values(actions).forEach(action => {
            if (action) {
                action.play();
            }
        });
    }, [actions]);

    // Add subtle floating animation
    useFrame((state) => {
        if (cloudStationRef.current) {
            const t = state.clock.getElapsedTime();
            cloudStationRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.1;
            cloudStationRef.current.position.x = position[0] + Math.sin(t * 0.3) * 0.05;
        }
    });

    return (
        <mesh
            ref={cloudStationRef}
            position={position}
            scale={scale}
            rotation={[0, 6.1, 0]}
        >
            <primitive object={scene} />
        </mesh>
    );
};

const CloudStationCanvas = () => {
    const [position, setPosition] = useState([0, 0, 0]);
    const [scale, setScale] = useState([1, 1, 1]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            
            // Calculate vertical position based on scroll
            const startY = 6.7;
            const endY = -2.7;
            const newY = startY + (endY - startY) * scrollProgress;
            
            setPosition([1.5, newY, 0]);

             // Calculate x position based on screen size
             let x;
             if (window.innerWidth < 1026 && window.innerWidth >= 768) {
                 // iPad Pro range - position slightly to the left
                 x = 0.5;
             } else if (window.innerWidth < 768) {
                 // Mobile - keep centered
                 x = 1.5;
             } else {
                 // Larger screens - right side
                 x = 1.5;
             }
             
             setPosition([x, newY, 0]);
        };

        const handleResize = () => {
            if (window.innerWidth < 768) {
                setScale([0.08, 0.08, 0.08]);
            } else if (window.innerWidth < 1024) {
                setScale([0.10, 0.10, 0.10]);
            } else if (window.innerWidth < 1280) {
                setScale([0.12, 0.12, 0.12]);
            } else if (window.innerWidth < 1536) {
                setScale([0.13, 0.13, 0.13]);
            } else {
                setScale([0.15, 0.15, 0.15]);
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
                {/* Space-themed lighting */}
                <ambientLight intensity={0.2} /> {/* Dimmer ambient light */}
                <directionalLight position={[5, 5, 5]} intensity={0.5} color="#4c71ff" /> {/* Blue-tinted main light */}
                <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ff4c4c" /> {/* Red accent light */}
                <pointLight position={[0, 0, 2]} intensity={0.2} color="#ffffff" /> {/* Subtle front light */}

                {/* Add fog for depth */}
                <fog attach="fog" args={['#000000', 5, 30]} />

                <CloudStation 
                    scale={scale} 
                    position={position} 
                />
            </Suspense>
        </Canvas>
    );
};

export default CloudStationCanvas;