import { render } from '@testing-library/react';
import React from 'react';
import ProgramCloseup from './ProgramCloseup';
import IPHSimilarity from './model/IPHSimilarity';
import Plagiahedron from './model/Plagiahedron';
import CodeSet from './model/CodeSet';
import './SimilarityCloseup.css';


class SimilarityCloseup extends React.Component<{ph: Plagiahedron, codeSet: CodeSet, activeSimIndex: number}, {fileArray: any}>{

    constructor(props: any) {
        super(props) 
        this.state = {
            fileArray: []
        }
    }


    getFileArray(): JSX.Element[] {
        let fileArray: JSX.Element[] = []
        let activeSim = this.props.ph.getAllSimilarities()[this.props.activeSimIndex]
        for(var index = 0; index < activeSim.getFileSubstrings().length; index++) {
            let substring = activeSim.getFileSubstrings()[index]
            const fileProps = { ph: this.props.ph, 
                                codeSet: this.props.codeSet, 
                                activeSimIndex: this.props.activeSimIndex, 
                                programName: substring.getProgramName(), 
                                fileName: substring.getFileNameAndExtension(), 
                                similarityString: substring.getRawString(),
                                programIndex: index };
            fileArray.push(<ProgramCloseup {...fileProps} />)
        }

        return fileArray
    }

    
    render() {
        return (
            <div className="SimilarityCloseup">
                <div className="SimilarityCloseup-title">
                    Group {this.props.activeSimIndex + 1}
                </div>
                <div className="fileBox">
                    {this.getFileArray()}
                </div>
            </div>
          );

    }
}

export default SimilarityCloseup;