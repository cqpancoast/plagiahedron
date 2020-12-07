import { render } from '@testing-library/react';
import React from 'react';
import FileCloseup from './FileCloseup';
import IPHSimilarity from './model/IPHSimilarity';
import Plagiahedron from './model/Plagiahedron';
import './SimilarityCloseup.css';


class SimilarityCloseup extends React.Component<{ph: Plagiahedron, activeSim: IPHSimilarity<any>}>{
    
    render() {
        return (
            <div className="SimilarityCloseup">
                <div className="SimilarityCloseup-title">
                    Group {this.props.ph.getAllSimilarities().indexOf(this.props.activeSim)}
                </div>
                <div className="fileBox">
                    <FileCloseup />
                    <FileCloseup />
                    <FileCloseup />
                    <FileCloseup />
                    <FileCloseup />
                </div>
            </div>
          );

    }
}

export default SimilarityCloseup;