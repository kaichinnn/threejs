import React from 'react';
import Background from './components/Background';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Contact from './components/Contact';

function App() {
    return (
        <div className="relative">
            <Background />
            <main className="relative z-10 overflow-hidden">
                <Hero />
                <Projects />
                <About />
                <Contact />
                <Footer />
            </main>
        </div>
    );
}

export default App;