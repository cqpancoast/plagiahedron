import React from 'react';
import BigButton from './BigButton';
import TitleLine from './line.svg';
import './Homepage.css';

function Homepage() {
  return (
    <div className="Homepage">
      <div className="Homepage-title">
        <h1>
          Plagiahedron
        </h1>
      </div>

      <div className="Homepage-line">
          <img src={TitleLine}/>
        </div>

      <div className="Homepage-links">
        <BigButton linkContent="Upload Files"/>
      </div>
    </div>
  );
}

export default Homepage;
