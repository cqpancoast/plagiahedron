import { render } from '@testing-library/react';
import React from 'react';
import Program from './Program';
import './ProgramsNav.css';

class ProgramsNav extends React.Component{
    
    render() {
        return (
            <div className="ProgramsNav">
                <div className="ProgramsNav-title">
                    # Programs
                </div>
                <div className="ProgramsNav-fileBox">
                    <Program />
                    <Program />
                    <Program />
                </div>
            </div>
          );

    }
}

export default ProgramsNav;