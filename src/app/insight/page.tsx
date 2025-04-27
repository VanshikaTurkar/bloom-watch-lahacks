import React from 'react';
import './page.css';
import Navbar from '../components/Navbar';

const Insight = () => {
  return (
    <div className="insight-page">
      <Navbar></Navbar>
      <section className="mission-section">
        <h1 className="mission-heading">Our Mission</h1>

        <p className="mission-text">
          Recent <strong>wildfires</strong> in Los Angeles and surrounding areas have led to a surge in
          <strong> harmful algae blooms (HABs)</strong> across rivers, lakes, and coastal waters.
        </p>

        <p className="mission-text">
          After fires burn through forests and hillsides, <strong> rainstorms</strong> wash
          <strong> nutrient-rich ash</strong> — full of <strong> nitrogen</strong> and <strong> phosphorus</strong> —
          into nearby waterways, fertilizing them. This runoff fuels explosive growth of
          <strong> toxic algae species</strong> like <strong> cyanobacteria</strong> and
          <strong> red tide organisms</strong>.
        </p>

        <p className="mission-text">
          <strong>These blooms cause:</strong>
        </p>

        <ul className="mission-list">
          <li><strong> Health risks:</strong> rashes, nausea, respiratory issues, liver damage</li>
          <li><strong> Wildlife impacts:</strong> pets and animals suffer poisoning, fish die-offs, ecosystem collapse</li>
          <li><strong> Environmental damage:</strong> oxygen depletion, loss of aquatic life</li>
          <li><strong> Community disruption:</strong> beach closures, contaminated drinking water, public health advisories</li>
        </ul>

        <p className="mission-text">
          The devastating chain reaction between <strong> wildfires</strong>, <strong> runoff</strong>,
          and <strong> coastal ecosystem health</strong> highlights the urgent need for action.
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
