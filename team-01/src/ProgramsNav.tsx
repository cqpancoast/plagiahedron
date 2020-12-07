import { render } from '@testing-library/react';
import React from 'react';
import IPHSimilarity from './model/IPHSimilarity';
import Plagiahedron from './model/Plagiahedron';
import Program from './Program';
import './ProgramsNav.css';

class ProgramsNav extends React.Component<{ph: Plagiahedron, activeSim: IPHSimilarity<any>}>{
    
    render() {
        return (
            <div className="ProgramsNav">
                <div className="ProgramsNav-title">
                    # Programs
                </div>
                <div className="ProgramsNav-fileBox">
                    {
                        this.props.activeSim.getProgramNames().forEach(prog => {
                            <Program name={prog} />
                        })
                    };
                </div>
            </div>
          );

    }
}

export default ProgramsNav;