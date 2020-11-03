import React from 'react';
import './Homepage.css';
import BigButton from './BigButton';

class Homepage extends React.Component{

  render() {
    return (
      <div className="Homepage">
        <header className="Homepage-header">Plagiahedron</header>
        <div className="Homepage-buttons"><BigButton /> </div>
      </div>
    );
  }
}

export default Homepage;
