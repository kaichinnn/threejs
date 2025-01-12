import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Terminal, Code } from 'lucide-react';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -5, 5, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute -bottom-3/4 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 via-purple-500/10 to-indigo-500/10 blur-3xl"
                />
            </div>
            <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[100vh]"
            style={{
                content: "''",
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                background: 'rgba(255, 255, 255, 0.001)',
                WebkitMask: 'radial-gradient(ellipse 100% 200% at center, white, rgba(255, 255, 255, 0.7) 10%, rgba(255, 255, 255, 0.2) 15%, transparent 20%)',
                mask: 'radial-gradient(ellipse 100% 200% at center, white, rgba(255, 255, 255, 0.7) 10%, rgba(255, 255, 255, 0.2) 15%, transparent 20%)'
            }}
            ></div>

            {/* Floating icons */}
            <motion.div
                animate={{
                    y: [-10, 10],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
                className="absolute top-1/4 left-1/4 text-indigo-500/20"
            >
                <Terminal size={48} />
            </motion.div>
            <motion.div
                animate={{
                    y: [10, -10],
                    rotate: [0, -5, 5, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
                className="absolute bottom-1/4 right-1/4 text-purple-500/20"
            >
                <Code size={48} />
            </motion.div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div
                        variants={itemVariants}
                        className="mb-6 relative"
                    >
                        <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-4">Welcome to my portfolio</h2>
                        <h1 className="text-6xl md:text-7xl font-bold mb-2 relative">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                Hi, I'm Keean Ho
                            </span>
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-6" />
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl mb-12 text-gray-300"
                    >
                        Full-stack developer crafting exceptional digital experiences
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center space-x-6 mb-16"
                    >
                        <SocialLink href="https://github.com/kaichinnn" icon={<Github />} label="GitHub Profile" />
                        <SocialLink href="https://linkedin.com/in/keeanho" icon={<Linkedin />} label="LinkedIn Profile" />
                        <SocialLink href="mailto:dexter.ho@example.com" icon={<Mail />} label="Email Me" />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: 5 }}
                        className="inline-block"
                    >
                        <ChevronDown className="w-8 h-8 mx-auto text-gray-400 animate-bounce" aria-hidden="true" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const SocialLink = ({ href, icon, label }) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="p-4 rounded-xl transition-all duration-300 
                bg-slate-800/80 text-gray-300 hover:text-white
                border border-indigo-500/20 hover:border-indigo-500/40
                relative group overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
                {icon}
            </div>
        </motion.a>
    );
};

export default Hero;