import { render } from '@testing-library/react';
import React from 'react';
import './FilterButton.css';

class FilterButton extends React.Component{
    
    render() {
        return (
            <div className="FilterButton">
                <div className="FilterButton-text">
                    Filter
                </div>
            </div>
          );

    }
}

export default FilterButton;