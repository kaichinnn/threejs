import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code2, Sparkles } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
    technologies: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    challenges: [
      "Implementing real-time inventory sync",
      "Optimizing database queries for scale",
      "Building a secure payment system"
    ],
    solutions: [
      "Used WebSocket for real-time updates",
      "Implemented database indexing and caching",
      "Integrated Stripe with custom security measures"
    ],
    outcomes: [
      "50% faster page load times",
      "99.9% uptime",
      "30% increase in sales conversion"
    ]
  },
  {
    id: 2,
    title: "AI Content Generator",
    description: "An AI-powered platform for generating marketing content",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    technologies: ["Next.js", "OpenAI API", "TailwindCSS", "TypeScript"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    challenges: [
      "Managing API rate limits",
      "Ensuring content quality",
      "Implementing user feedback system"
    ],
    solutions: [
      "Built queue system for API calls",
      "Created content validation pipeline",
      "Developed ML model for content scoring"
    ],
    outcomes: [
      "Generated 1M+ pieces of content",
      "95% user satisfaction rate",
      "Reduced content creation time by 80%"
    ]
  }
];

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1]
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <div className="relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-out transform-gpu hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10">
        {/* Backdrop blur layer */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 backdrop-blur-sm bg-slate-800/30" />
          <div className="absolute inset-0 border border-gray-700/50 rounded-xl sm:rounded-2xl" />
        </div>
        
        {/* Hover gradient effect */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 relative overflow-hidden">
            <motion.img
            src={project.image}
            alt={project.title}
            className="h-96 w-full object-cover"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }}
          />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            </div>

            <div className="w-full md:w-1/2 p-6 sm:p-8">
              <motion.div
                animate={{ x: isHovered ? 10 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <motion.span
                      key={tech}
                      initial={false}
                      animate={{ 
                        backgroundColor: isHovered ? 'rgba(30, 58, 138, 0.3)' : 'rgba(30, 58, 138, 0.1)'
                      }}
                      transition={{ 
                        duration: 0.3,
                        delay: idx * 0.05
                      }}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm border border-indigo-500/20 text-gray-300 hover:border-indigo-500/40 transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
                  <ProjectLink
                    href={project.githubUrl}
                    icon={<Github className="w-4 h-4 sm:w-5 sm:h-5" />}
                    text="Code"
                    variant="secondary"
                  />
                  <ProjectLink
                    href={project.liveUrl}
                    icon={<ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />}
                    text="Live Demo"
                    variant="primary"
                  />
                </div> */}
              </motion.div>
            </div>
          </div>

          <div className="p-6 sm:p-8 border-t border-gray-700/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <DetailSection
                title="Challenges"
                items={project.challenges}
                isHovered={isHovered}
                delay={0}
              />
              <DetailSection
                title="Solutions"
                items={project.solutions}
                isHovered={isHovered}
                delay={0.1}
              />
              <DetailSection
                title="Outcomes"
                items={project.outcomes}
                isHovered={isHovered}
                delay={0.2}
                className="sm:col-span-2 md:col-span-1"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ProjectLink and DetailSection components remain the same
const ProjectLink = ({ href, icon, text, variant }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`
      flex items-center justify-center sm:justify-start space-x-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg 
      transition-all duration-300 text-sm sm:text-base w-full sm:w-auto
      ${variant === 'primary' 
        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white' 
        : 'bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 border border-gray-700/50 hover:border-indigo-500/50'}
    `}
  >
    {icon}
    <span>{text}</span>
  </motion.a>
);

const DetailSection = ({ title, items, isHovered, delay, className = '' }) => (
  <motion.div
    animate={{ 
      y: isHovered ? 0 : 10,
      opacity: isHovered ? 1 : 0.9
    }}
    transition={{
      duration: 0.5,
      delay: delay
    }}
    className={className}
  >
    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
      <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
        isHovered ? 'text-indigo-400' : 'text-gray-500'
      }`} />
      <h4 className={`font-semibold text-sm sm:text-base transition-colors duration-300 ${
        isHovered ? 'text-indigo-400' : 'text-gray-300'
      }`}>
        {title}
      </h4>
    </div>
    <ul className="space-y-2 sm:space-y-3">
      {items.map((item, index) => (
        <motion.li
          key={index}
          className="flex items-start space-x-3 text-gray-400"
          animate={{ 
            x: isHovered ? 10 : 0,
            opacity: isHovered ? 1 : 0.8
          }}
          transition={{
            duration: 0.4,
            delay: delay + index * 0.1
          }}
        >
          <Code2 className={`w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0 transition-colors duration-300 ${
            isHovered ? 'text-indigo-400' : 'text-gray-500'
          }`} />
          <span className="text-sm sm:text-base leading-relaxed">{item}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

const Projects = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative text-center mb-10 sm:mb-16">
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[100vh] lg:hidden" 
              style={{
                content: "''",
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                background: 'rgba(255, 255, 255, 0.001)',
                WebkitMask: 'radial-gradient(ellipse 150% 80% at center, white, white 5%, transparent 20%)',
                mask: 'radial-gradient(ellipse 150% 80% at center, white, white 5%, transparent 20%)'
              }}
            ></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative inline-block px-4"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-300">
                Featured Projects
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4" />
              <p className="text-gray-400 text-base sm:text-lg mt-4">Showcasing my latest work and experiments</p>
            </motion.div>
          </div>

          <div className="space-y-12 sm:space-y-16 md:space-y-24">
            <AnimatePresence mode="sync">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;