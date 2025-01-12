import { useAnimations, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState, useMemo } from 'react';
import spacemanScene from '../assets/3d/spaceman.glb';
import * as THREE from 'three';

const Spaceman = ({ scale, position, rotation }) => {
    const spacemanRef = useRef();
    const { scene, animations } = useGLTF(spacemanScene);
    const { actions } = useAnimations(animations, spacemanRef);
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        spacemanRef.current.position.y = position[1] + Math.sin(t) * 0.1;
        spacemanRef.current.rotation.x = rotation[0] + Math.sin(t * 0.5) * 0.1;
        spacemanRef.current.rotation.z = rotation[2] + Math.cos(t * 0.5) * 0.05;
    });

    useEffect(() => {
        if (actions['Idle']) {
            actions['Idle'].play();
        }
        scene.traverse((child) => {
            if (child.isMesh) {
                child.material.metalness = 0.8;
                child.material.roughness = 0.2;
            }
        });
    }, [actions, scene]);

    return (
        <mesh
            ref={spacemanRef}
            position={position}
            scale={scale}
            rotation={rotation}
        >
            <primitive object={scene} />
        </mesh>
    );
};

const Stars = () => {
    const starsRef = useRef();
    
    // Create star positions once and memoize them
    const starPositions = useMemo(() => {
        const positions = new Float32Array(6000 * 3);
        for (let i = 0; i < 6000; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 50;
            positions[i3 + 1] = (Math.random() - 0.5) * 50;
            positions[i3 + 2] = (Math.random() - 0.5) * 50;
        }
        return positions;
    }, []);

    // Create geometry and material once
    const [geometry, material] = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.015,
            color: '#ffffff',
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
        });
        
        return [geometry, material];
    }, [starPositions]);

    useFrame((state) => {
        if (starsRef.current) {
            starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
            starsRef.current.rotation.z = state.clock.getElapsedTime() * 0.01;
        }
    });

    return <points ref={starsRef} geometry={geometry} material={material} />;
};

const SpacemanCanvas = () => {
    const [position, setPosition] = useState([2, 4, 0]);
    const [rotation, setRotation] = useState([0.5, 2.5, 0]);
    const [scale, setScale] = useState([1, 1, 1]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            
            const startY = 2;
            const endY = -3;
            const newY = startY + (endY - startY) * scrollProgress;
            
            let x;
            if (window.innerWidth < 1025 && window.innerWidth >= 900) {
                // iPad Pro range - position slightly to the left
                x = -4 + Math.sin(scrollProgress * Math.PI) * 0.6;
            } else if (window.innerWidth < 900) {
                // Mobile - center position with slight movement
                x = Math.sin(scrollProgress * Math.PI) * 0.5;
            } else {
                // Larger screens - far left position
                x = -10 + Math.sin(scrollProgress * Math.PI) * 0.5;
            }
            
            const rotationX = 0.9 + Math.sin(scrollProgress * Math.PI) * 0.2;
            const rotationY = 3.2 + scrollProgress * -1;
            const rotationZ = Math.sin(scrollProgress * Math.PI * 2) * 0.1;
            
            setPosition([x, newY, Math.sin(scrollProgress * Math.PI) * 0.5]);
            setRotation([rotationX, rotationY, rotationZ]);
        };

        const handleResize = () => {
            if (window.innerWidth < 768) {
                setScale([1, 1, 1]);
            } else if (window.innerWidth < 1024) {
                setScale([1, 1, 1]);
            } else if (window.innerWidth < 1280) {
                setScale([1, 1, 1]);
            } else if (window.innerWidth < 1536) {
                setScale([1.3, 1.3, 1.3]);
            } else {
                setScale([1.5, 1.5, 1.5]);
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
            className="w-full h-screen bg-black" 
            camera={{ position: [0, 0, 10], near: 0.1, far: 1000 }}
        >
            <Suspense fallback={null}>
                {/* Space lighting */}
                <directionalLight position={[5, 5, 5]} intensity={0.5} color="#4c71ff" />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff4c4c" />
                <ambientLight intensity={0.2} />
                
                <Stars />

                <Spaceman 
                    rotation={rotation} 
                    scale={scale} 
                    position={position} 
                />

                <fog attach="fog" args={['#000000', 5, 30]} />
            </Suspense>
        </Canvas>
    );
};

export default SpacemanCanvas;