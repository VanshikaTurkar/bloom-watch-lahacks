'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import './page.css';

const Insight = () => {
  return (
    <div className="insight-page">
      <Navbar />

      <section className="mission-section">
        <h1 className="mission-heading">Our Mission</h1>

        <p className="mission-text">
          Recent wildfires in Los Angeles and surrounding areas have led to a surge in harmful algae blooms (HABs) across rivers, lakes, and coastal waters. After fires burn through forests and hillsides, rainstorms wash nutrient-rich ash — full of nitrogen and phosphorus — into nearby waterways, fertilizing them. This runoff fuels explosive growth of toxic algae species like cyanobacteria and red tide organisms. These blooms cause health risks such as rashes, nausea, respiratory issues, and liver damage; wildlife impacts like poisoning of pets and animals, fish die-offs, and ecosystem collapse; environmental damage through oxygen depletion and loss of aquatic life; and community disruption including beach closures, contaminated drinking water, and public health advisories. The devastating chain reaction between wildfires, runoff, and coastal ecosystem health highlights the urgent need for action.
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
