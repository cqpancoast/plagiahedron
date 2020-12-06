import { render } from '@testing-library/react';
import React from 'react';
import './ProgramUpload.css';

class ProgramUpload extends React.Component {

    render() {
        return (
            <div className="ProgramUp">
                <div className="ProgramUp-number">
                    01
                    </div>
                <div className="ProgramUp-name">
                    ProfessionalGramProfessionalGramProfessionalGram.js
                </div>
            </div>
        );

    }
}

export default ProgramUpload;