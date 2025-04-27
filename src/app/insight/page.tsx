import React from 'react';
import './page.css';
import Navbar from '../components/Navbar';

const Insight = () => {
  return (
    <div className="insight-page">
      <Navbar></Navbar>
      <section className="mission-section">
        <h2 className="mission-heading">Our Mission</h2>
        <p className="mission-text">
          Recent wildfires in Los Angeles and surrounding areas have led to a surge in harmful algae blooms (HABs) across rivers, lakes, and coastal waters. After fires burn through forests and hillsides, rainstorms wash nutrient-rich ash — full of nitrogen and phosphorus — into nearby waterways, effectively fertilizing them. This runoff fuels explosive algae growth, particularly of toxic species like cyanobacteria and red tide organisms. These blooms harm both people and wildlife: they release toxins that can cause rashes, nausea, respiratory issues, and even liver damage in humans, while pets and wildlife suffer severe poisoning, fish die-offs, and ecosystem collapse due to oxygen depletion. Recent blooms have closed recreational beaches, contaminated drinking water sources, and triggered health advisories across the region, highlighting the devastating chain reaction between wildfire, runoff, and coastal ecosystem health.
        </p>
      </section>

      <section className="team-section">
        <img src="/lian.jpeg" alt="Lian" className="team-member" />
        <img src="/vanshika.png" alt="Vanshika" className="team-member" />
        <img src="/himani.jpeg" alt="Himani" className="team-member" />
        <img src="/camilla.jpg" alt="Camilla" className="team-member" />
      </section>
    </div>
  );
};

export default Insight;
