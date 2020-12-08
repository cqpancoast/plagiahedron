import { render } from '@testing-library/react';
import React from 'react';
import IPHSimilarity from './model/IPHSimilarity';
import Plagiahedron from './model/Plagiahedron';
import Program from './Program';
import './ProgramsNav.css';

class ProgramsNav extends React.Component<{ph: Plagiahedron, activeSimIndex: number}>{

    // constructor(props: any) {
    //     super(props);
    //     this.state = {
    //         programArray: [],
    //     }
    // }

    /**
     * Returns an array of Program components that need to be rendered 
     */

    getProgramArray(): JSX.Element[] {
        const activeSim = this.props.ph.getAllSimilarities()[this.props.activeSimIndex]
        const programNames = activeSim.getProgramNames()
        let programArray: JSX.Element[] = []
        for(var index = 0; index < programNames.length; index++) {
            programArray.push(<Program name={programNames[index]} />)
        }
        return programArray
    }
    
    render() {
        let programArrayLength = this.props.ph.getAllSimilarities()[this.props.activeSimIndex].getProgramNames().length
        return (
            <div className="ProgramsNav">
                <div className="ProgramsNav-title">
                {programArrayLength === 1 ? 
                        <div>
                            {programArrayLength} Program
                        </div> :
                        <div>
                            {programArrayLength} Programs
                        </div>

                        }
                </div>
                <div className="ProgramsNav-fileBox">
                    {this.getProgramArray()};
                </div>
            </div>
          );

    }
}

export default ProgramsNav;