import React from 'react';
import { Github, Linkedin, Mail, Heart, Code2, Globe, Sparkles } from 'lucide-react';
import CharcoalCanvas from './Charcoal';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 bg-slate-900 relative overflow-hidden">
      {/* Mobile 3D Model - Only visible on mobile */}
      <div className="md:hidden absolute -bottom-5 -right-1 w-auto h-30">
        <CharcoalCanvas />
      </div>
      {/* Desktop 3D Model - Only visible on md and up */}
      <div className="hidden md:block absolute -bottom-1 right-7 w-auto h-30">
        <CharcoalCanvas />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Quick Links Column */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">
                Navigation
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <nav className="space-y-2">
                  <FooterLink href="#home" label="Home" />
                  <FooterLink href="#projects" label="Projects" />
                  <FooterLink href="#about" label="About" />
                  <FooterLink href="#contact" label="Contact" />
                </nav>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">
                Services
              </h3>
              <div className="space-y-2">
                <ServiceTag icon={<Code2 className="w-4 h-4" />} label="Web Development" />
                <ServiceTag icon={<Globe className="w-4 h-4" />} label="SEO" />
                <ServiceTag icon={<Sparkles className="w-4 h-4" />} label="UI/UX" />
              </div>
            </div>

            {/* Connect Column */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">
                Let's Build Something Together
              </h3>
              <p className="text-sm mb-6 text-gray-300">
                Have a project in mind? Let's create something amazing. Connect with me through any of these platforms:
              </p>
              <div className="flex space-x-4">
                <SocialLink
                  href="https://github.com"
                  icon={<Github className="w-5 h-5" />}
                  label="GitHub"
                />
                <SocialLink
                  href="https://linkedin.com"
                  icon={<Linkedin className="w-5 h-5" />}
                  label="LinkedIn"
                />
                <SocialLink
                  href="mailto:contact@example.com"
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 md:pt-14 md:mb-4 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © {year} Keean Ho. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 mt-4 md:mt-0 md:mr-24 lg:mr-0">
                <span className="text-sm text-gray-400">Crafted with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-400">by Keean Ho</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ServiceTag = ({ icon, label }) => (
  <div className="flex items-center py-1 text-sm text-gray-300">
    {icon}
    <span className="ml-2">{label}</span>
  </div>
);

const FooterLink = ({ href, label }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="block text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
    >
      {label}
    </a>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
  >
    {icon}
  </a>
);

export default Footer;