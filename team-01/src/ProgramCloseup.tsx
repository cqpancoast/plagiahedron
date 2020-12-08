import { render } from '@testing-library/react';
import React from 'react';
import Plagiahedron from './model/Plagiahedron';
import './ProgramCloseup.css';
import CodeSet from './model/CodeSet';

class ProgramCloseup extends React.Component<{ph: Plagiahedron, 
                                            codeSet: CodeSet, 
                                            activeSimIndex: number, 
                                            programName: string, 
                                            fileName: string, 
                                            similarityString: string
                                            programIndex: number}>{

    
    render() {
        return (
            <div className="ProgramCloseup">
                <div className="ProgramCloseup-content">
                    <div className="ProgramCloseup-title">
                    <div className="ProgramCloseup-number">
                            {this.props.programIndex + 1}
                        </div>
                        <div className="ProgramCloseup-name">
                            {this.props.programName}, {this.props.fileName}
                        </div>
                    </div>
                    <div className="ProgramCloseup-box">
                        {this.props.similarityString.split('\n').map((item) => {
                            return (<span>{item}<br/></span>)
                        })}
                    </div>
                </div>
            </div>
          );

    }
}

export default ProgramCloseup;