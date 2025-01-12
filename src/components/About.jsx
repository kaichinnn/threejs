import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Gamepad2, Lightbulb, Cpu } from 'lucide-react';
import CloudStationCanvas from './CloudStation';

const About = () => {
  const ContentWrapper = ({ children }) => (
    <>
      <div className="xl:hidden w-full">
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 backdrop-blur-sm bg-slate-900/50" />
          </div>
          <div className="absolute inset-0 border border-indigo-500/20 rounded-xl pointer-events-none 
            before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r 
            before:from-indigo-500/10 before:via-purple-500/10 before:to-pink-500/10" />
          <div className="relative p-6">
            {children}
          </div>
        </div>
      </div>
      <div className="hidden xl:block">{children}</div>
    </>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-10 relative">
    <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
      <CloudStationCanvas />
    </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <ContentWrapper>
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 text-gray-200">
                About Me
              </h2>
              <p className="text-xl text-gray-300">
                Passionate about creating exceptional web experiences
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div 
                variants={itemVariants}
                className="relative group"
              >
                <div className="relative aspect-[841/1051] w-full overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src="images/profile_photo.jpg"
                    alt="Profile"
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 border border-indigo-500/20 rounded-xl" />
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="text-gray-300 space-y-4"
              >
                <p>
                  Hello! I'm a tech-enthusiast turned full-stack developer who discovered web development through social media exploration. For the past 3 years, I've been immersed in creating impactful digital experiences, turning what started as curiosity into professional expertise.
                </p>
                <p>
                  My journey has led me to master not just coding, but the entire ecosystem of web presence - from crafting eye-catching UI/UX designs to implementing SEO strategies that help businesses stand out. I've realized that a great website is more than just code; it's about creating a compelling digital presence that helps businesses thrive.
                </p>
                <p>
                  When I'm not developing websites, you'll find me exploring emerging technologies, brainstorming new business ideas, or keeping up with the latest tech trends across AI, fintech, and hardware. I bring this broad technical perspective to every project, ensuring each solution is both cutting-edge and practical.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Technical Skills
                </h3>
                <div className="space-y-6">
                  <SkillCategory
                    title="Frontend"
                    skills={['React', 'TypeScript', 'Next.js', 'TailwindCSS']}
                  />
                  <SkillCategory
                    title="Backend"
                    skills={['Node.js', 'PHP', 'PostgreSQL', 'MongoDB']}
                  />
                  <SkillCategory
                    title="Tools"
                    skills={['Git', 'Docker', 'AWS', 'Figma']}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Interests & Hobbies
                </h3>
                <div className="space-y-4">
                  <HobbyItem
                    icon={<Gamepad2 className="text-indigo-400" size={20} />}
                    title="Gaming"
                    description="Passionate gamer enjoying various genres and gaming experiences"
                  />
                  <HobbyItem
                    icon={<Code2 className="text-purple-400" size={20} />}
                    title="Tech Enthusiast"
                    description="Following latest developments in AI, mobile, web3, fintech, and hardware"
                  />
                  <HobbyItem
                    icon={<Lightbulb className="text-pink-400" size={20} />}
                    title="Business Innovation"
                    description="Developing and exploring new business concepts and opportunities"
                  />
                  <HobbyItem
                    icon={<Cpu className="text-indigo-400" size={20} />}
                    title="Hardware & Gadgets"
                    description="Keeping up with cutting-edge TVs, monitors, computers, and tech gear"
                  />
                </div>
              </motion.div>
            </div>
          </ContentWrapper>
        </motion.div>
      </div>
    </section>
  );
};

const SkillCategory = ({ title, skills }) => (
  <div>
    <h4 className="font-semibold mb-3 text-gray-300">
      {title}
    </h4>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <motion.span
          key={skill}
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 rounded-full text-sm bg-slate-800/80 text-gray-300 border border-indigo-500/20
            hover:border-indigo-500/40 hover:bg-slate-800 transition-colors duration-300
            relative before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
            before:from-indigo-500/10 before:to-purple-500/10 before:opacity-0 hover:before:opacity-100
            before:transition-opacity"
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </div>
);

const HobbyItem = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex items-start space-x-4 group"
  >
    <div className="p-3 rounded-xl bg-slate-800/80 border border-indigo-500/20 
      group-hover:border-indigo-500/40 transition-colors duration-300
      relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r 
      before:from-indigo-500/10 before:to-purple-500/10 before:opacity-0 group-hover:before:opacity-100
      before:transition-opacity">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
        {title}
      </h4>
      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
        {description}
      </p>
    </div>
  </motion.div>
);

export default About;