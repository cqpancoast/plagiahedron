import { render } from '@testing-library/react';
import React from 'react';
import './ProgramUpload.css';



class ProgramUpload extends React.Component<{count: number, name: string}> {

    render() {
        return (
            <div id="ProgramUp">
                <div id="ProgramUp-number">
                    {this.props.count}
                    </div>
                <div id="ProgramUp-name">
                    {this.props.name}
                </div>
            </div>
        );

    }
}

export default ProgramUpload;