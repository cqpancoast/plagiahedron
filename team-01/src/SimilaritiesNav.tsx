import { render } from '@testing-library/react';
import React from 'react';
import './SimilaritiesNav.css';
import Similarity from './Similarity';
import FilterButton from './FilterButton';

class SimilaritiesNav extends React.Component{
    
    render() {
        return (
            <div className="SimilaritiesNav">
                <div className="Similarities-header">
                    <div className="SimilaritiesNav-title">
                        # Similarities
                    </div>
                    <div className="SimilaritiesNav-button">
                        <FilterButton />
                    </div>
                </div>
                <div className="SimilaritiesNav-fileBox">
                    <Similarity />
                </div>
            </div>
          );

    }
}

export default SimilaritiesNav;