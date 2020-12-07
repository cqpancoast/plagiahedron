import { render } from '@testing-library/react';
import React from 'react';
import IPHSimilarity from './model/IPHSimilarity';
import Plagiahedron from './model/Plagiahedron';
import Program from './Program';
import './ProgramsNav.css';

class ProgramsNav extends React.Component<{ph: Plagiahedron, activeSim: IPHSimilarity<any>}, {programArray: any}>{

    constructor(props: any) {
        super(props);
        this.state = {
            programArray: [],
        }
    }

    /**
     * Sets the programArray state value to all of the Program components that need to be rendered 
     */

    makeProgramArray() {
        const programNames = this.props.activeSim.getProgramNames()
        const tempArray = []
        for(var index = 0; index < this.props.activeSim.getProgramNames().length; index++) {
            tempArray.push(<Program name={programNames[index]} />)
        }

        this.setState({
            programArray: tempArray
        })
    }
    
    render() {
        return (
            <div className="ProgramsNav">
                <div className="ProgramsNav-title">
                {this.state.programArray.length === 1 ? 
                        <div>
                            {this.state.programArray.length} Program
                        </div> :
                        <div>
                            {this.state.programArray.length} Programs
                        </div>

                        }
                </div>
                <div className="ProgramsNav-fileBox">
                    {this.state.programArray};
                </div>
            </div>
          );

    }
}

export default ProgramsNav;