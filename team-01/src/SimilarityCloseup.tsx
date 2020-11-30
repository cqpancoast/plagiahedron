import { render } from '@testing-library/react';
import React from 'react';
import FileCloseup from './FileCloseup';
import './SimilarityCloseup.css';

class SimilarityCloseup extends React.Component{
    
    render() {
        return (
            <div className="SimilarityCloseup">
                <div className="SimilarityCloseup-title">
                    Testing
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