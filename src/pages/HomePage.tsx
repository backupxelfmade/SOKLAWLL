import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Team from '../components/Team';
import TrackRecord from '../components/TrackRecord';
import News from '../components/News';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div id="main-content">
      <Hero />
      <About />
      <Services />
      <Team />
      <TrackRecord />
      <News />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;